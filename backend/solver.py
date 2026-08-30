import math
from typing import List, Dict, Any, Optional, Tuple
from ortools.sat.python import cp_model
from models import SlotRequest, DigitalPass, QueueStage, CropType, VehicleType, ProcurementHub, DockBay, DisruptionEvent
from crop_data import CROP_DATABASE

class AgriLogisticsOptimizer:
    """
    Google OR-Tools CP-SAT Optimization Solver for Agricultural Procurement Hub Queue Management.
    Solves multi-dock, time-windowed scheduling with crop perishability & travel constraints.
    """
    def __init__(self, hub: ProcurementHub):
        self.hub = hub
        self.start_hour = hub.operating_start_hour
        self.end_hour = hub.operating_end_hour
        self.total_operating_minutes = (self.end_hour - self.start_hour) * 60

    def _estimate_service_duration_minutes(self, crop: CropType, quantity_quintals: float, vehicle: VehicleType) -> int:
        """
        Calculates unloading + weighbridge + quality assaying time in minutes.
        1 Quintal = 0.1 Metric Ton.
        """
        tons = quantity_quintals * 0.1
        profile = CROP_DATABASE.get(crop, CROP_DATABASE[CropType.WHEAT])
        
        # Base unloading time
        rate_tons_per_hr = max(5.0, profile.unloading_rate_tons_per_hour)
        unloading_minutes = (tons / rate_tons_per_hr) * 60.0
        
        # Fixed overhead: Gross Weighbridge (5 min) + Assaying (10 min) + Tare Weighbridge & DBT (5 min)
        fixed_overhead = 20.0
        if vehicle == VehicleType.LARGE_TRUCK:
            fixed_overhead += 10.0
        elif vehicle == VehicleType.BULLOCK_CART:
            fixed_overhead -= 5.0
            
        total_minutes = int(math.ceil(unloading_minutes + fixed_overhead))
        # Clamp between 15 mins and 90 mins
        return max(15, min(90, total_minutes))

    def _format_minute_to_time(self, minute_offset: int) -> str:
        """Converts offset minutes from operating start hour to HH:MM format."""
        total_mins = self.start_hour * 60 + minute_offset
        hours = int(total_mins // 60)
        mins = int(total_mins % 60)
        return f"{hours:02d}:{mins:02d}"

    def _calculate_travel_departure(self, slot_start_min: int, travel_time_mins: int) -> str:
        """Calculates recommended departure time from farm."""
        departure_min = max(0, slot_start_min - travel_time_mins)
        return self._format_minute_to_time(departure_min)

    def optimize_batch(self, requests: List[SlotRequest], current_time_offset_mins: int = 0) -> List[DigitalPass]:
        """
        Runs Google OR-Tools CP-SAT solver over a batch of farmer slot requests.
        """
        if not requests:
            return []

        model = cp_model.CpModel()
        active_bays = [bay for bay in self.hub.dock_bays if bay.is_active]
        if not active_bays:
            # Fallback if no active bays
            active_bays = self.hub.dock_bays

        num_requests = len(requests)
        num_bays = len(active_bays)

        # Variables:
        # For each request i and bay b:
        # presence_var: is request i assigned to bay b?
        # start_var, duration, end_var: interval for request on bay b
        all_intervals_per_bay = {b_idx: [] for b_idx in range(num_bays)}
        req_start_vars = []
        req_end_vars = []
        req_bay_assigned = []
        req_durations = []

        cost_terms = []

        horizon = self.total_operating_minutes

        for i, req in enumerate(requests):
            crop_profile = CROP_DATABASE.get(req.crop, CROP_DATABASE[CropType.WHEAT])
            duration = self._estimate_service_duration_minutes(req.crop, req.quantity_quintals, req.vehicle_type)
            req_durations.append(duration)

            # Earliest possible arrival based on farmer distance (travel time: ~1.5 min per km)
            travel_time_mins = max(10, int(req.distance_km * 1.5))
            earliest_arrival = max(current_time_offset_mins, travel_time_mins)

            # Global start variable for request i
            start_i = model.NewIntVar(earliest_arrival, horizon - duration, f"start_{i}")
            end_i = model.NewIntVar(earliest_arrival + duration, horizon, f"end_{i}")
            req_start_vars.append(start_i)
            req_end_vars.append(end_i)

            # Preferred arrival offset if specified
            preferred_target = earliest_arrival
            if req.preferred_hour_window is not None:
                pref_offset = (req.preferred_hour_window - self.start_hour) * 60
                preferred_target = max(earliest_arrival, min(horizon - duration, pref_offset))

            # Bay selection boolean variables
            bay_literals = []
            for b_idx, bay in enumerate(active_bays):
                # Check crop compatibility
                is_compatible = (req.crop in bay.supported_crops) or (len(bay.supported_crops) == 0)
                lit = model.NewBoolVar(f"assign_{i}_bay_{b_idx}")
                bay_literals.append(lit)

                if not is_compatible:
                    # Force 0 if crop incompatible with bay
                    model.Add(lit == 0)
                    continue

                # Optional interval variable on bay
                opt_interval = model.NewOptionalIntervalVar(
                    start_i, duration, end_i, lit, f"interval_{i}_bay_{b_idx}"
                )
                all_intervals_per_bay[b_idx].append(opt_interval)

            # Exactly one bay assigned to request i
            model.AddExactlyOne(bay_literals)
            req_bay_assigned.append(bay_literals)

            # Perishability Decay Weight Factor (Higher for tomato/fruits -> heavy penalty for delay)
            decay_multiplier = int(crop_profile.decay_weight_factor * 10)

            # Cost 1: Wait / Delay Penalty = (start - earliest_arrival) * decay_weight
            delay_var = model.NewIntVar(0, horizon, f"delay_{i}")
            model.Add(delay_var >= start_i - earliest_arrival)
            cost_terms.append(delay_var * decay_multiplier)

            # Cost 2: Preferred window mismatch penalty
            pref_diff_var = model.NewIntVar(0, horizon, f"pref_diff_{i}")
            model.Add(pref_diff_var >= start_i - preferred_target)
            model.Add(pref_diff_var >= preferred_target - start_i)
            cost_terms.append(pref_diff_var * 2)

        # Non-overlapping constraint per bay (Crucial dock constraint)
        for b_idx in range(num_bays):
            if all_intervals_per_bay[b_idx]:
                model.AddNoOverlap(all_intervals_per_bay[b_idx])

        # Minimize combined objective
        model.Minimize(sum(cost_terms))

        # Solve CP-SAT
        solver = cp_model.CpSolver()
        solver.parameters.max_time_in_seconds = 5.0
        solver.parameters.num_search_workers = 4
        status = solver.Solve(model)

        digital_passes: List[DigitalPass] = []

        if status in [cp_model.OPTIMAL, cp_model.FEASIBLE]:
            for i, req in enumerate(requests):
                crop_profile = CROP_DATABASE.get(req.crop, CROP_DATABASE[CropType.WHEAT])
                start_val = solver.Value(req_start_vars[i])
                duration_val = req_durations[i]
                end_val = start_val + duration_val

                # Find assigned bay
                assigned_bay_idx = 0
                for b_idx, lit in enumerate(req_bay_assigned[i]):
                    if solver.Value(lit) == 1:
                        assigned_bay_idx = b_idx
                        break

                assigned_bay = active_bays[assigned_bay_idx]
                travel_time_mins = max(10, int(req.distance_km * 1.5))
                slot_start_time = self._format_minute_to_time(start_val)
                slot_end_time = self._format_minute_to_time(end_val)
                departure_time = self._calculate_travel_departure(start_val, travel_time_mins)

                wait_minutes = max(0, start_val - max(current_time_offset_mins, travel_time_mins))
                # Spoilage risk index (0% to 100%)
                spoilage_risk = round(min(98.0, (wait_minutes / (crop_profile.shelf_life_hours * 60)) * 100.0 * (crop_profile.decay_weight_factor / 2.0)), 1)
                
                estimated_payout = req.quantity_quintals * crop_profile.base_price_per_quintal

                token_code = f"KRISHI-{1000 + i + 1}"
                token_id = f"TKN-{abs(hash(req.phone + str(i))) % 100000:05d}"

                pass_obj = DigitalPass(
                    token_id=token_id,
                    pass_code=token_code,
                    farmer_name=req.farmer_name,
                    phone=req.phone,
                    crop=req.crop,
                    quantity_quintals=req.quantity_quintals,
                    vehicle_type=req.vehicle_type,
                    hub_name=self.hub.name,
                    assigned_bay_id=assigned_bay.bay_id,
                    assigned_bay_name=assigned_bay.bay_name,
                    scheduled_slot_start=slot_start_time,
                    scheduled_slot_end=slot_end_time,
                    suggested_departure_time=departure_time,
                    estimated_wait_minutes=wait_minutes,
                    stage=QueueStage.SCHEDULED,
                    spoilage_risk_index=spoilage_risk,
                    moisture_pct=round(crop_profile.moisture_max_limit_pct - 1.5, 1),
                    quality_grade="Grade A (Assayed)",
                    gross_weight_kg=round(req.quantity_quintals * 100 + 1200, 1), # Tare + Net
                    net_weight_kg=round(req.quantity_quintals * 100, 1),
                    estimated_payout_inr=estimated_payout,
                    qr_payload=f"KRISHIFLOW|{token_code}|{req.farmer_name}|{req.crop}|{slot_start_time}|{assigned_bay.bay_id}",
                    created_at="2026-08-30 08:00:00"
                )
                digital_passes.append(pass_obj)
        else:
            # Fallback heuristic if solver times out or constraints extremely tight
            digital_passes = self._heuristic_fallback(requests, active_bays, current_time_offset_mins)

        # Sort chronologically
        digital_passes.sort(key=lambda p: p.scheduled_slot_start)
        return digital_passes

    def _heuristic_fallback(self, requests: List[SlotRequest], active_bays: List[DockBay], current_time_offset_mins: int) -> List[DigitalPass]:
        """Greedy priority heuristic sorted by Crop Decay Factor (Perishability First)."""
        sorted_reqs = sorted(
            requests,
            key=lambda r: (
                -CROP_DATABASE.get(r.crop, CROP_DATABASE[CropType.WHEAT]).decay_weight_factor,
                r.distance_km
            )
        )
        bay_available_at = {bay.bay_id: current_time_offset_mins for bay in active_bays}
        passes = []

        for i, req in enumerate(sorted_reqs):
            crop_profile = CROP_DATABASE.get(req.crop, CROP_DATABASE[CropType.WHEAT])
            duration = self._estimate_service_duration_minutes(req.crop, req.quantity_quintals, req.vehicle_type)
            travel_time_mins = max(10, int(req.distance_km * 1.5))
            earliest_arrive = max(current_time_offset_mins, travel_time_mins)

            # Pick best compatible bay with earliest availability
            compat_bays = [b for b in active_bays if (req.crop in b.supported_crops or not b.supported_crops)]
            if not compat_bays:
                compat_bays = active_bays

            chosen_bay = min(compat_bays, key=lambda b: bay_available_at[b.bay_id])
            start_min = max(earliest_arrive, bay_available_at[chosen_bay.bay_id])
            end_min = start_min + duration
            bay_available_at[chosen_bay.bay_id] = end_min + 5 # 5 min cleaning gap

            slot_start = self._format_minute_to_time(start_min)
            slot_end = self._format_minute_to_time(end_min)
            departure = self._calculate_travel_departure(start_min, travel_time_mins)

            token_code = f"KRISHI-{2000 + i + 1}"
            token_id = f"TKN-FALLBACK-{i+1}"
            
            p = DigitalPass(
                token_id=token_id,
                pass_code=token_code,
                farmer_name=req.farmer_name,
                phone=req.phone,
                crop=req.crop,
                quantity_quintals=req.quantity_quintals,
                vehicle_type=req.vehicle_type,
                hub_name=self.hub.name,
                assigned_bay_id=chosen_bay.bay_id,
                assigned_bay_name=chosen_bay.bay_name,
                scheduled_slot_start=slot_start,
                scheduled_slot_end=slot_end,
                suggested_departure_time=departure,
                estimated_wait_minutes=max(0, start_min - earliest_arrive),
                stage=QueueStage.SCHEDULED,
                spoilage_risk_index=4.5,
                moisture_pct=11.5,
                quality_grade="Grade A",
                gross_weight_kg=req.quantity_quintals * 100 + 1000,
                net_weight_kg=req.quantity_quintals * 100,
                estimated_payout_inr=req.quantity_quintals * crop_profile.base_price_per_quintal,
                qr_payload=f"KRISHIFLOW|{token_code}|{req.farmer_name}|{req.crop}",
                created_at="2026-08-30 08:00:00"
            )
            passes.append(p)
        return passes

    def reoptimize_disruption(
        self,
        current_passes: List[DigitalPass],
        disruption: DisruptionEvent,
        current_time_offset_mins: int
    ) -> Tuple[List[DigitalPass], List[Dict[str, Any]]]:
        """
        Dynamically adjusts remaining scheduled passes when a disruption (e.g. Bay Breakdown, Heavy Rain) occurs.
        Returns updated passes and automated broadcast notification log.
        """
        rebalanced_passes: List[DigitalPass] = []
        alerts: List[Dict[str, Any]] = []

        # Mark disabled bays
        for bay in self.hub.dock_bays:
            if bay.bay_id in disruption.affected_bay_ids:
                bay.is_active = False

        pending_requests: List[SlotRequest] = []
        completed_or_in_dock: List[DigitalPass] = []

        for p in current_passes:
            if p.stage in [QueueStage.UNLOADING_DOCK, QueueStage.WEIGHBRIDGE_OUT, QueueStage.PAYMENT_COMPLETED]:
                completed_or_in_dock.append(p)
            else:
                # Need to re-schedule
                req = SlotRequest(
                    farmer_id=p.token_id,
                    farmer_name=p.farmer_name,
                    phone=p.phone,
                    village="Indore Rural",
                    crop=p.crop,
                    quantity_quintals=p.quantity_quintals,
                    vehicle_type=p.vehicle_type,
                    distance_km=15.0,
                    preferred_hour_window=None
                )
                pending_requests.append(req)

        # Re-run optimization on remaining active bays with delay offset
        reoptimized = self.optimize_batch(
            pending_requests,
            current_time_offset_mins=current_time_offset_mins + (disruption.delay_minutes if disruption.event_type == "HEAVY_RAIN" else 15)
        )

        for new_p in reoptimized:
            alert = {
                "farmer_phone": new_p.phone,
                "farmer_name": new_p.farmer_name,
                "old_bay": "Disrupted",
                "new_bay": new_p.assigned_bay_name,
                "new_slot": f"{new_p.scheduled_slot_start} - {new_p.scheduled_slot_end}",
                "reason": disruption.description,
                "message": f"[KrishiFlow Alert] Dear {new_p.farmer_name}, due to {disruption.description}, your arrival slot is adjusted to {new_p.scheduled_slot_start}. Please arrive at {new_p.assigned_bay_name}."
            }
            alerts.append(alert)

        all_updated = completed_or_in_dock + reoptimized
        all_updated.sort(key=lambda p: p.scheduled_slot_start)
        return all_updated, alerts
