from fastapi import FastAPI, HTTPException, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
import uvicorn
import random

from models import (
    SlotRequest, DigitalPass, QueueStage, CropType, VehicleType,
    DisruptionEvent, SimulationConfig, SimulationResult
)
from crop_data import CROP_DATABASE, DEFAULT_HUBS
from solver import AgriLogisticsOptimizer
from database import db_manager
from redis_cache import lock_manager
from notifications import notification_dispatcher
from simulation import simulation_engine

app = FastAPI(
    title="KrishiFlow (AgriSlot) API",
    description="Dynamic, SMS/Web-based Agricultural Supply Chain Scheduling & Queue Management Platform",
    version="1.0.0"
)

# Enable CORS for Web and PWA Clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Optimizer with Default Hub
current_hub = DEFAULT_HUBS[0]
optimizer = AgriLogisticsOptimizer(current_hub)

@app.on_event("startup")
async def startup_seed():
    """Seeds initial demonstration dataset for procurement hub command center."""
    existing = await db_manager.get_all_passes()
    if not existing:
        initial_requests = [
            SlotRequest(farmer_name="Ramesh Patel", phone="+919826011111", village="Sanwer", crop=CropType.TOMATO, quantity_quintals=45.0, vehicle_type=VehicleType.TRACTOR_TROLLEY, distance_km=18.0),
            SlotRequest(farmer_name="Suresh Verma", phone="+919826022222", village="Depalpur", crop=CropType.WHEAT, quantity_quintals=120.0, vehicle_type=VehicleType.LARGE_TRUCK, distance_km=35.0),
            SlotRequest(farmer_name="Gopal Sharma", phone="+919826033333", village="Mhow", crop=CropType.CHILLI, quantity_quintals=30.0, vehicle_type=VehicleType.SMALL_TRUCK, distance_km=12.0),
            SlotRequest(farmer_name="Jagdish Yadav", phone="+919826044444", village="Hatod", crop=CropType.SOYBEAN, quantity_quintals=60.0, vehicle_type=VehicleType.TRACTOR_TROLLEY, distance_km=22.0),
            SlotRequest(farmer_name="Vikram Singh", phone="+919826055555", village="Betma", crop=CropType.ONION, quantity_quintals=90.0, vehicle_type=VehicleType.SMALL_TRUCK, distance_km=28.0),
            SlotRequest(farmer_name="Mukesh Malviya", phone="+919826066666", village="Rau", crop=CropType.MANGO, quantity_quintals=40.0, vehicle_type=VehicleType.TRACTOR_TROLLEY, distance_km=14.0),
            SlotRequest(farmer_name="Devendra Kushwah", phone="+919826077777", village="Manglia", crop=CropType.POTATO, quantity_quintals=110.0, vehicle_type=VehicleType.LARGE_TRUCK, distance_km=20.0),
            SlotRequest(farmer_name="Anand Patidar", phone="+919826088888", village="Gautampura", crop=CropType.COTTON, quantity_quintals=50.0, vehicle_type=VehicleType.TRACTOR_TROLLEY, distance_km=42.0),
        ]
        passes = optimizer.optimize_batch(initial_requests, current_time_offset_mins=0)
        
        # Set realistic stages for active demonstration
        if len(passes) >= 4:
            passes[0].stage = QueueStage.UNLOADING_DOCK
            passes[1].stage = QueueStage.ASSAYING
            passes[2].stage = QueueStage.WEIGHBRIDGE_IN
            passes[3].stage = QueueStage.GATE_ARRIVED

        for p in passes:
            await db_manager.save_pass(p)
            await notification_dispatcher.send_slot_confirmation(p, "en")

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "KrishiFlow Agri-Logistics API",
        "solver": "Google OR-Tools CP-SAT (Active)",
        "database": "Connected",
        "redis_locks": "Active"
    }

@app.get("/api/crops")
async def get_crops():
    """Returns all supported crops with perishability and price specs."""
    return list(CROP_DATABASE.values())

@app.get("/api/hubs")
async def get_hubs():
    """Returns active procurement hubs and dock bay status."""
    return DEFAULT_HUBS

@app.get("/api/passes")
async def get_passes():
    """Returns current live queue passes."""
    passes = await db_manager.get_all_passes()
    # Sort chronologically by slot
    passes.sort(key=lambda p: p.scheduled_slot_start)
    return passes

@app.get("/api/passes/{token_id}")
async def get_single_pass(token_id: str):
    """Retrieves digital pass and QR code verification data."""
    pass_obj = await db_manager.get_pass_by_id(token_id)
    if not pass_obj:
        raise HTTPException(status_code=404, detail="Digital pass token not found")
    return pass_obj

@app.post("/api/slots/book")
async def book_slot(request: SlotRequest, background_tasks: BackgroundTasks):
    """
    Books an optimized drop-off slot for a farmer using Google OR-Tools and Redis distributed locks.
    """
    lock_key = f"farmer_booking_{request.phone}"
    if not lock_manager.acquire_lock(lock_key, ttl_seconds=10):
        raise HTTPException(status_code=429, detail="A booking request for this phone number is already in progress.")

    try:
        # Fetch existing passes
        existing_passes = await db_manager.get_all_passes()
        
        # Optimize new request alongside existing schedule
        new_pass_list = optimizer.optimize_batch([request], current_time_offset_mins=15)
        if not new_pass_list:
            raise HTTPException(status_code=500, detail="Could not find an available dock window today.")

        allocated_pass = new_pass_list[0]
        allocated_pass.pass_code = f"KRISHI-{1000 + len(existing_passes) + 1}"
        allocated_pass.token_id = f"TKN-{abs(hash(request.phone + str(len(existing_passes)))) % 100000:05d}"
        
        # Save to database
        await db_manager.save_pass(allocated_pass)

        # Dispatch automated WhatsApp / Twilio SMS alert in farmer's preferred language
        background_tasks.add_task(
            notification_dispatcher.send_slot_confirmation,
            allocated_pass,
            request.preferred_language or "en"
        )

        return {
            "success": True,
            "message": "Optimal slot allocated successfully via Google OR-Tools.",
            "digital_pass": allocated_pass
        }
    finally:
        lock_manager.release_lock(lock_key)

@app.patch("/api/passes/{token_id}/stage")
async def update_queue_stage(token_id: str, payload: Dict[str, Any], background_tasks: BackgroundTasks):
    """
    Procurement Hub Officer workflow to transition vehicle through stages:
    GATE_ARRIVED -> WEIGHBRIDGE_IN -> ASSAYING -> UNLOADING_DOCK -> WEIGHBRIDGE_OUT -> COMPLETED
    """
    new_stage = QueueStage(payload.get("stage", QueueStage.GATE_ARRIVED))
    updated_pass = await db_manager.update_pass_stage(token_id, new_stage, payload)
    
    if not updated_pass:
        raise HTTPException(status_code=404, detail="Token not found")

    # Send automated SMS/WhatsApp alerts on key milestones
    if new_stage == QueueStage.UNLOADING_DOCK:
        background_tasks.add_task(notification_dispatcher.send_gate_call, updated_pass)
    elif new_stage == QueueStage.PAYMENT_COMPLETED:
        background_tasks.add_task(notification_dispatcher.send_payment_receipt, updated_pass)

    return {"success": True, "digital_pass": updated_pass}

@app.post("/api/disruption/trigger")
async def trigger_disruption(event: DisruptionEvent, background_tasks: BackgroundTasks):
    """
    Triggers dynamic re-optimization of active queue on weather shock or dock breakdown.
    """
    current_passes = await db_manager.get_all_passes()
    rebalanced, alerts = optimizer.reoptimize_disruption(current_passes, event, current_time_offset_mins=45)

    # Save rebalanced schedule
    for p in rebalanced:
        await db_manager.save_pass(p)

    return {
        "success": True,
        "event": event.event_type,
        "rebalanced_count": len(rebalanced),
        "dispatched_alerts": alerts,
        "updated_passes": rebalanced
    }

@app.post("/api/simulate")
async def run_simulation(config: Optional[SimulationConfig] = None):
    """
    Executes full comparative simulation: FCFS Chaos vs KrishiFlow OR-Tools Optimization.
    """
    cfg = config or SimulationConfig()
    result = simulation_engine.run_simulation(cfg)
    return result

@app.post("/api/sms/inbound")
async def handle_inbound_sms(payload: Dict[str, Any]):
    """
    Two-Way SMS webhook (Twilio / WhatsApp Cloud API).
    Parses SMS commands (e.g. 'BOOK TOMATO 40 SANWER') and books slots automatically.
    """
    sender = payload.get("From", "+919826099999")
    body = payload.get("Body", "")
    parsed = notification_dispatcher.parse_inbound_sms(sender, body)

    if parsed.get("action") == "BOOK":
        crop_str = parsed["crop"].title()
        matched_crop = CropType.WHEAT
        for c in CropType:
            if crop_str.upper() in c.value.upper():
                matched_crop = c
                break

        req = SlotRequest(
            farmer_name=f"SMS User ({sender[-4:]})",
            phone=sender,
            village=parsed.get("village", "Nearby Village"),
            crop=matched_crop,
            quantity_quintals=float(parsed.get("quantity", 40.0)),
            vehicle_type=VehicleType.TRACTOR_TROLLEY,
            distance_km=20.0
        )
        allocated = optimizer.optimize_batch([req], current_time_offset_mins=30)[0]
        allocated.pass_code = f"KRISHI-{random.randint(3000, 9999)}"
        await db_manager.save_pass(allocated)
        await notification_dispatcher.send_slot_confirmation(allocated, "en")
        return {
            "response": f"Slot Booked! Token {allocated.pass_code}. Crop: {allocated.crop}. Slot: {allocated.scheduled_slot_start} at {allocated.assigned_bay_name}."
        }
    elif parsed.get("action") == "STATUS":
        token_code = parsed.get("token_code")
        p = await db_manager.get_pass_by_id(token_code)
        if p:
            return {"response": f"Token {p.pass_code} Status: {p.stage}. Assigned: {p.assigned_bay_name} at {p.scheduled_slot_start}."}
        else:
            return {"response": f"Token {token_code} not found in live queue."}
    else:
        return {"response": parsed.get("message", "KrishiFlow SMS Bot: Send 'BOOK <CROP> <QTY> <VILLAGE>'")}

@app.get("/api/notifications/log")
async def get_notification_log():
    """Returns live automated WhatsApp / SMS dispatch history."""
    return notification_dispatcher.dispatch_log

@app.post("/api/reset-demo")
async def reset_demo():
    """Resets database and re-seeds fresh demonstration data."""
    db_manager._passes.clear()
    notification_dispatcher.dispatch_log.clear()
    await startup_seed()
    return {"success": True, "message": "Demo data refreshed."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
