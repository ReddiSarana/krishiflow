from typing import Dict, List
from models import CropType, CropProfile, ProcurementHub, DockBay

CROP_DATABASE: Dict[CropType, CropProfile] = {
    CropType.TOMATO: CropProfile(
        name=CropType.TOMATO,
        shelf_life_hours=36.0,
        decay_weight_factor=9.5, # Highly perishable
        unloading_rate_tons_per_hour=10.0,
        moisture_max_limit_pct=85.0,
        base_price_per_quintal=2200.0,
        unit="Quintals"
    ),
    CropType.CHILLI: CropProfile(
        name=CropType.CHILLI,
        shelf_life_hours=48.0,
        decay_weight_factor=8.5,
        unloading_rate_tons_per_hour=8.0,
        moisture_max_limit_pct=75.0,
        base_price_per_quintal=8500.0,
        unit="Quintals"
    ),
    CropType.MANGO: CropProfile(
        name=CropType.MANGO,
        shelf_life_hours=72.0,
        decay_weight_factor=7.5,
        unloading_rate_tons_per_hour=12.0,
        moisture_max_limit_pct=80.0,
        base_price_per_quintal=4500.0,
        unit="Quintals"
    ),
    CropType.BANANA: CropProfile(
        name=CropType.BANANA,
        shelf_life_hours=60.0,
        decay_weight_factor=7.0,
        unloading_rate_tons_per_hour=14.0,
        moisture_max_limit_pct=78.0,
        base_price_per_quintal=1800.0,
        unit="Quintals"
    ),
    CropType.ONION: CropProfile(
        name=CropType.ONION,
        shelf_life_hours=240.0, # ~10 days
        decay_weight_factor=4.0,
        unloading_rate_tons_per_hour=15.0,
        moisture_max_limit_pct=14.0,
        base_price_per_quintal=2400.0,
        unit="Quintals"
    ),
    CropType.POTATO: CropProfile(
        name=CropType.POTATO,
        shelf_life_hours=360.0, # ~15 days
        decay_weight_factor=3.0,
        unloading_rate_tons_per_hour=18.0,
        moisture_max_limit_pct=16.0,
        base_price_per_quintal=1600.0,
        unit="Quintals"
    ),
    CropType.WHEAT: CropProfile(
        name=CropType.WHEAT,
        shelf_life_hours=1200.0, # durable
        decay_weight_factor=1.2,
        unloading_rate_tons_per_hour=25.0,
        moisture_max_limit_pct=12.0,
        base_price_per_quintal=2275.0, # MSP standard
        unit="Quintals"
    ),
    CropType.PADDY: CropProfile(
        name=CropType.PADDY,
        shelf_life_hours=900.0,
        decay_weight_factor=1.5,
        unloading_rate_tons_per_hour=22.0,
        moisture_max_limit_pct=17.0,
        base_price_per_quintal=2183.0,
        unit="Quintals"
    ),
    CropType.SOYBEAN: CropProfile(
        name=CropType.SOYBEAN,
        shelf_life_hours=720.0,
        decay_weight_factor=2.0,
        unloading_rate_tons_per_hour=20.0,
        moisture_max_limit_pct=12.0,
        base_price_per_quintal=4600.0,
        unit="Quintals"
    ),
    CropType.COTTON: CropProfile(
        name=CropType.COTTON,
        shelf_life_hours=800.0,
        decay_weight_factor=1.8,
        unloading_rate_tons_per_hour=12.0,
        moisture_max_limit_pct=8.0,
        base_price_per_quintal=6620.0,
        unit="Quintals"
    ),
}

DEFAULT_HUBS: List[ProcurementHub] = [
    ProcurementHub(
        hub_id="HUB-INDORE-01",
        name="Indore Central Krishi Mandi & Procurement Complex",
        location="Indore, Madhya Pradesh",
        latitude=22.7196,
        longitude=75.8577,
        daily_capacity_tons=1500.0,
        operating_start_hour=6,
        operating_end_hour=20,
        weighbridges_count=2,
        assaying_labs_count=3,
        dock_bays=[
            DockBay(bay_id="BAY-1", bay_name="Bay 1 (Perishables/Veg)", supported_crops=[CropType.TOMATO, CropType.CHILLI, CropType.MANGO, CropType.BANANA]),
            DockBay(bay_id="BAY-2", bay_name="Bay 2 (Perishables/Veg)", supported_crops=[CropType.TOMATO, CropType.ONION, CropType.POTATO]),
            DockBay(bay_id="BAY-3", bay_name="Bay 3 (Grain Bulk)", supported_crops=[CropType.WHEAT, CropType.PADDY, CropType.SOYBEAN]),
            DockBay(bay_id="BAY-4", bay_name="Bay 4 (Grain Bulk)", supported_crops=[CropType.WHEAT, CropType.PADDY, CropType.SOYBEAN]),
            DockBay(bay_id="BAY-5", bay_name="Bay 5 (Commercial/Cotton)", supported_crops=[CropType.COTTON, CropType.SOYBEAN, CropType.POTATO]),
            DockBay(bay_id="BAY-6", bay_name="Bay 6 (Multi-Crop Express)", supported_crops=list(CropType)),
        ]
    ),
    ProcurementHub(
        hub_id="HUB-NASHIK-02",
        name="Nashik Agro-Logistics & Export Assaying Terminal",
        location="Nashik, Maharashtra",
        latitude=19.9975,
        longitude=73.7898,
        daily_capacity_tons=1200.0,
        operating_start_hour=6,
        operating_end_hour=21,
        weighbridges_count=2,
        assaying_labs_count=2,
        dock_bays=[
            DockBay(bay_id="BAY-N1", bay_name="Bay 1 (Onion/Tomato Express)", supported_crops=[CropType.ONION, CropType.TOMATO, CropType.CHILLI]),
            DockBay(bay_id="BAY-N2", bay_name="Bay 2 (Fruits Cold Assaying)", supported_crops=[CropType.MANGO, CropType.BANANA, CropType.TOMATO]),
            DockBay(bay_id="BAY-N3", bay_name="Bay 3 (Grains & Pulses)", supported_crops=[CropType.WHEAT, CropType.SOYBEAN, CropType.PADDY]),
            DockBay(bay_id="BAY-N4", bay_name="Bay 4 (Universal Rapid Unload)", supported_crops=list(CropType)),
        ]
    )
]
