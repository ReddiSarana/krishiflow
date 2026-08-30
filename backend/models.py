from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum

class CropType(str, Enum):
    TOMATO = "Tomato"
    ONION = "Onion"
    POTATO = "Potato"
    WHEAT = "Wheat"
    PADDY = "Paddy / Rice"
    SOYBEAN = "Soybean"
    COTTON = "Cotton"
    MANGO = "Mango"
    BANANA = "Banana"
    CHILLI = "Green Chilli"

class VehicleType(str, Enum):
    TRACTOR_TROLLEY = "Tractor Trolley"  # Capacity ~3-6 MT
    SMALL_TRUCK = "Small Truck (LCV)"    # Capacity ~7-10 MT
    LARGE_TRUCK = "Large Truck (HCV)"    # Capacity ~15-25 MT
    BULLOCK_CART = "Small Carrier/Cart"  # Capacity ~1-2 MT

class QueueStage(str, Enum):
    SCHEDULED = "SCHEDULED"           # Waiting at farm / in transit
    GATE_ARRIVED = "GATE_ARRIVED"     # In queue at entry gate
    WEIGHBRIDGE_IN = "WEIGHBRIDGE_IN" # Gross weighing
    ASSAYING = "ASSAYING"             # Quality & moisture inspection
    UNLOADING_DOCK = "UNLOADING_DOCK" # Unloading at assigned bay
    WEIGHBRIDGE_OUT = "WEIGHBRIDGE_OUT" # Tare weighing
    PAYMENT_COMPLETED = "COMPLETED"   # DBT Payment receipt issued
    CANCELLED = "CANCELLED"
    DELAYED = "DELAYED"

class CropProfile(BaseModel):
    name: CropType
    shelf_life_hours: float
    decay_weight_factor: float  # Higher = higher perishability urgency in OR-Tools (1.0 to 10.0)
    unloading_rate_tons_per_hour: float
    moisture_max_limit_pct: float
    base_price_per_quintal: float
    unit: str = "Quintals"

class DockBay(BaseModel):
    bay_id: str
    bay_name: str
    supported_crops: List[CropType]
    is_active: bool = True
    current_token_id: Optional[str] = None
    efficiency_multiplier: float = 1.0

class ProcurementHub(BaseModel):
    hub_id: str
    name: str
    location: str
    latitude: float
    longitude: float
    daily_capacity_tons: float
    operating_start_hour: int = 6   # 06:00 AM
    operating_end_hour: int = 20    # 08:00 PM
    weighbridges_count: int = 2
    assaying_labs_count: int = 3
    dock_bays: List[DockBay]

class Farmer(BaseModel):
    farmer_id: str
    name: str
    phone: str
    village: str
    preferred_language: str = "hi"  # en, hi, te, mr, pa
    distance_km: float
    travel_time_minutes: int

class SlotRequest(BaseModel):
    farmer_id: Optional[str] = None
    farmer_name: str
    phone: str
    village: str
    crop: CropType
    quantity_quintals: float
    vehicle_type: VehicleType
    distance_km: float
    preferred_date: str = "today"
    preferred_hour_window: Optional[int] = None  # e.g., 9 for 09:00-10:00
    preferred_language: str = "en"

class DigitalPass(BaseModel):
    token_id: str
    pass_code: str  # e.g. "KRISHI-9042"
    farmer_name: str
    phone: str
    crop: CropType
    quantity_quintals: float
    vehicle_type: VehicleType
    hub_name: str
    assigned_bay_id: str
    assigned_bay_name: str
    scheduled_slot_start: str  # HH:MM
    scheduled_slot_end: str    # HH:MM
    suggested_departure_time: str # HH:MM
    estimated_wait_minutes: int
    stage: QueueStage
    spoilage_risk_index: float  # 0 to 100%
    moisture_pct: Optional[float] = None
    quality_grade: Optional[str] = None
    gross_weight_kg: Optional[float] = None
    net_weight_kg: Optional[float] = None
    estimated_payout_inr: float
    qr_payload: str
    created_at: str

class DisruptionEvent(BaseModel):
    event_type: str # "DOCK_BREAKDOWN", "HEAVY_RAIN", "POWER_OUTAGE", "SURGE_TRAFFIC"
    affected_bay_ids: List[str] = []
    delay_minutes: int = 60
    severity: str = "MEDIUM" # "LOW", "MEDIUM", "HIGH"
    description: str

class SimulationConfig(BaseModel):
    num_farmers: int = 60
    perishable_crop_ratio: float = 0.4 # 40% fruits/veg, 60% grains
    surge_arrival_spike: bool = True
    num_dock_bays: int = 6
    weighbridge_count: int = 2
    operating_hours: int = 14

class MetricSummary(BaseModel):
    avg_wait_time_minutes: float
    max_wait_time_minutes: float
    spoilage_loss_tons: float
    spoilage_loss_cost_inr: float
    warehouse_throughput_tons: float
    dock_utilization_pct: float
    farmer_idling_fuel_cost_inr: float
    co2_emissions_kg: float

class SimulationResult(BaseModel):
    fcfs_metrics: MetricSummary
    ortools_metrics: MetricSummary
    improvement_percentage: Dict[str, float]
    time_series_queue_fcfs: List[Dict[str, Any]]
    time_series_queue_ortools: List[Dict[str, Any]]
    slots_scheduled: List[Dict[str, Any]]
