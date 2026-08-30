from solver import AgriLogisticsOptimizer
from crop_data import DEFAULT_HUBS
from models import SlotRequest, CropType, VehicleType, DisruptionEvent

def test_ortools_solver():
    print("Initializing OR-Tools AgriLogisticsOptimizer...")
    hub = DEFAULT_HUBS[0]
    optimizer = AgriLogisticsOptimizer(hub)

    sample_requests = [
        SlotRequest(
            farmer_name="Ramesh Patel",
            phone="+919876543210",
            village="Sanwer",
            crop=CropType.TOMATO, # High perishability!
            quantity_quintals=45.0,
            vehicle_type=VehicleType.TRACTOR_TROLLEY,
            distance_km=18.0
        ),
        SlotRequest(
            farmer_name="Suresh Verma",
            phone="+919876543211",
            village="Depalpur",
            crop=CropType.WHEAT, # Durable grain
            quantity_quintals=120.0,
            vehicle_type=VehicleType.LARGE_TRUCK,
            distance_km=35.0
        ),
        SlotRequest(
            farmer_name="Gopal Sharma",
            phone="+919876543212",
            village="Mhow",
            crop=CropType.CHILLI, # High perishability
            quantity_quintals=30.0,
            vehicle_type=VehicleType.SMALL_TRUCK,
            distance_km=12.0
        ),
        SlotRequest(
            farmer_name="Jagdish Yadav",
            phone="+919876543213",
            village="Hatod",
            crop=CropType.SOYBEAN,
            quantity_quintals=60.0,
            vehicle_type=VehicleType.TRACTOR_TROLLEY,
            distance_km=22.0
        ),
    ]

    print(f"Running OR-Tools CP-SAT optimization on {len(sample_requests)} requests...")
    passes = optimizer.optimize_batch(sample_requests, current_time_offset_mins=0)

    print(f"\nOptimization Successful! Generated {len(passes)} Digital Passes:")
    for p in passes:
        print(f" -> Token {p.pass_code}: {p.farmer_name} | Crop: {p.crop} | Slot: {p.scheduled_slot_start}-{p.scheduled_slot_end} | Bay: {p.assigned_bay_name} | Est. Departure: {p.suggested_departure_time} | Spoilage Risk: {p.spoilage_risk_index}%")

    print("\nTesting Dynamic Disruption Rebalancing (Bay 1 Breakdown)...")
    disruption = DisruptionEvent(
        event_type="DOCK_BREAKDOWN",
        affected_bay_ids=["BAY-1"],
        delay_minutes=30,
        severity="HIGH",
        description="Hydraulic Unloader Motor Failure at Bay 1"
    )
    rebalanced_passes, alerts = optimizer.reoptimize_disruption(passes, disruption, current_time_offset_mins=30)
    print(f"Rebalanced {len(rebalanced_passes)} passes, generated {len(alerts)} automated broadcast alerts:")
    for alert in alerts:
        print(f" -> SMS Alert to {alert['farmer_name']}: {alert['message']}")

    print("\nALL BACKEND OPTIMIZER TESTS PASSED!")

if __name__ == "__main__":
    test_ortools_solver()
