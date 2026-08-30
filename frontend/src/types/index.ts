export type CropType = 
  | 'Tomato'
  | 'Onion'
  | 'Potato'
  | 'Wheat'
  | 'Paddy / Rice'
  | 'Soybean'
  | 'Cotton'
  | 'Mango'
  | 'Banana'
  | 'Green Chilli';

export type VehicleType = 
  | 'Tractor Trolley'
  | 'Small Truck (LCV)'
  | 'Large Truck (HCV)'
  | 'Small Carrier/Cart';

export type QueueStage = 
  | 'SCHEDULED'
  | 'GATE_ARRIVED'
  | 'WEIGHBRIDGE_IN'
  | 'ASSAYING'
  | 'UNLOADING_DOCK'
  | 'WEIGHBRIDGE_OUT'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DELAYED';

export interface CropProfile {
  name: CropType;
  shelf_life_hours: number;
  decay_weight_factor: number;
  unloading_rate_tons_per_hour: number;
  moisture_max_limit_pct: number;
  base_price_per_quintal: number;
  unit: string;
}

export interface DockBay {
  bay_id: string;
  bay_name: string;
  supported_crops: CropType[];
  is_active: boolean;
  current_token_id?: string | null;
  efficiency_multiplier: number;
}

export interface ProcurementHub {
  hub_id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  daily_capacity_tons: number;
  operating_start_hour: number;
  operating_end_hour: number;
  weighbridges_count: number;
  assaying_labs_count: number;
  dock_bays: DockBay[];
}

export interface SlotRequest {
  farmer_id?: string;
  farmer_name: string;
  phone: string;
  village: string;
  crop: CropType;
  quantity_quintals: number;
  vehicle_type: VehicleType;
  distance_km: number;
  preferred_date?: string;
  preferred_hour_window?: number;
  preferred_language?: string;
}

export interface DigitalPass {
  token_id: string;
  pass_code: string;
  farmer_name: string;
  phone: string;
  crop: CropType;
  quantity_quintals: number;
  vehicle_type: VehicleType;
  hub_name: string;
  assigned_bay_id: string;
  assigned_bay_name: string;
  scheduled_slot_start: string;
  scheduled_slot_end: string;
  suggested_departure_time: string;
  estimated_wait_minutes: number;
  stage: QueueStage;
  spoilage_risk_index: number;
  moisture_pct?: number | null;
  quality_grade?: string | null;
  gross_weight_kg?: number | null;
  net_weight_kg?: number | null;
  estimated_payout_inr: number;
  qr_payload: string;
  created_at: string;
}

export interface MetricSummary {
  avg_wait_time_minutes: number;
  max_wait_time_minutes: number;
  spoilage_loss_tons: number;
  spoilage_loss_cost_inr: number;
  warehouse_throughput_tons: number;
  dock_utilization_pct: number;
  farmer_idling_fuel_cost_inr: number;
  co2_emissions_kg: number;
}

export interface SimulationResult {
  fcfs_metrics: MetricSummary;
  ortools_metrics: MetricSummary;
  improvement_percentage: {
    wait_time_reduction_pct: number;
    spoilage_loss_saved_pct: number;
    throughput_increase_pct: number;
    fuel_cost_saved_pct: number;
    total_rupees_saved: number;
  };
  time_series_queue_fcfs: Array<{
    time: string;
    queue_length: number;
    arrived: number;
    processed: number;
  }>;
  time_series_queue_ortools: Array<{
    time: string;
    queue_length: number;
    arrived: number;
    processed: number;
  }>;
  slots_scheduled: DigitalPass[];
}

export interface NotificationItem {
  id: string;
  channel: string;
  recipient_phone: string;
  recipient_name: string;
  language: string;
  message: string;
  status: string;
  timestamp: string;
  type: string;
}
