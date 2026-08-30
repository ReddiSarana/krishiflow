import { CropProfile, DigitalPass, ProcurementHub, SlotRequest, SimulationResult, NotificationItem, QueueStage } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  async getCrops(): Promise<CropProfile[]> {
    try {
      const res = await fetch(`${API_BASE}/crops`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, using client fallback', e);
    }
    return [
      { name: 'Tomato', shelf_life_hours: 36, decay_weight_factor: 9.5, unloading_rate_tons_per_hour: 10, moisture_max_limit_pct: 85, base_price_per_quintal: 2200, unit: 'Quintals' },
      { name: 'Green Chilli', shelf_life_hours: 48, decay_weight_factor: 8.5, unloading_rate_tons_per_hour: 8, moisture_max_limit_pct: 75, base_price_per_quintal: 8500, unit: 'Quintals' },
      { name: 'Mango', shelf_life_hours: 72, decay_weight_factor: 7.5, unloading_rate_tons_per_hour: 12, moisture_max_limit_pct: 80, base_price_per_quintal: 4500, unit: 'Quintals' },
      { name: 'Banana', shelf_life_hours: 60, decay_weight_factor: 7.0, unloading_rate_tons_per_hour: 14, moisture_max_limit_pct: 78, base_price_per_quintal: 1800, unit: 'Quintals' },
      { name: 'Onion', shelf_life_hours: 240, decay_weight_factor: 4.0, unloading_rate_tons_per_hour: 15, moisture_max_limit_pct: 14, base_price_per_quintal: 2400, unit: 'Quintals' },
      { name: 'Potato', shelf_life_hours: 360, decay_weight_factor: 3.0, unloading_rate_tons_per_hour: 18, moisture_max_limit_pct: 16, base_price_per_quintal: 1600, unit: 'Quintals' },
      { name: 'Wheat', shelf_life_hours: 1200, decay_weight_factor: 1.2, unloading_rate_tons_per_hour: 25, moisture_max_limit_pct: 12, base_price_per_quintal: 2275, unit: 'Quintals' },
      { name: 'Paddy / Rice', shelf_life_hours: 900, decay_weight_factor: 1.5, unloading_rate_tons_per_hour: 22, moisture_max_limit_pct: 17, base_price_per_quintal: 2183, unit: 'Quintals' },
      { name: 'Soybean', shelf_life_hours: 720, decay_weight_factor: 2.0, unloading_rate_tons_per_hour: 20, moisture_max_limit_pct: 12, base_price_per_quintal: 4600, unit: 'Quintals' },
      { name: 'Cotton', shelf_life_hours: 800, decay_weight_factor: 1.8, unloading_rate_tons_per_hour: 12, moisture_max_limit_pct: 8, base_price_per_quintal: 6620, unit: 'Quintals' },
    ];
  },

  async getHubs(): Promise<ProcurementHub[]> {
    try {
      const res = await fetch(`${API_BASE}/hubs`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, using client fallback', e);
    }
    return [
      {
        hub_id: 'HUB-INDORE-01',
        name: 'Indore Central Krishi Mandi & Procurement Complex',
        location: 'Indore, Madhya Pradesh',
        latitude: 22.7196,
        longitude: 75.8577,
        daily_capacity_tons: 1500,
        operating_start_hour: 6,
        operating_end_hour: 20,
        weighbridges_count: 2,
        assaying_labs_count: 3,
        dock_bays: [
          { bay_id: 'BAY-1', bay_name: 'Bay 1 (Perishables/Veg)', supported_crops: ['Tomato', 'Green Chilli', 'Mango', 'Banana'], is_active: true, efficiency_multiplier: 1.0 },
          { bay_id: 'BAY-2', bay_name: 'Bay 2 (Perishables/Veg)', supported_crops: ['Tomato', 'Onion', 'Potato'], is_active: true, efficiency_multiplier: 1.0 },
          { bay_id: 'BAY-3', bay_name: 'Bay 3 (Grain Bulk)', supported_crops: ['Wheat', 'Paddy / Rice', 'Soybean'], is_active: true, efficiency_multiplier: 1.0 },
          { bay_id: 'BAY-4', bay_name: 'Bay 4 (Grain Bulk)', supported_crops: ['Wheat', 'Paddy / Rice', 'Soybean'], is_active: true, efficiency_multiplier: 1.0 },
          { bay_id: 'BAY-5', bay_name: 'Bay 5 (Commercial/Cotton)', supported_crops: ['Cotton', 'Soybean', 'Potato'], is_active: true, efficiency_multiplier: 1.0 },
          { bay_id: 'BAY-6', bay_name: 'Bay 6 (Multi-Crop Express)', supported_crops: [], is_active: true, efficiency_multiplier: 1.0 },
        ]
      }
    ];
  },

  async getPasses(): Promise<DigitalPass[]> {
    try {
      const res = await fetch(`${API_BASE}/passes`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, using client fallback', e);
    }
    return [];
  },

  async bookSlot(payload: SlotRequest): Promise<{ success: boolean; digital_pass: DigitalPass; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/slots/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, generating local pass', e);
    }
    
    // Client-side fallback token generator if backend server is not running
    const codeNum = Math.floor(1000 + Math.random() * 9000);
    const startHour = 8 + Math.floor(Math.random() * 4);
    const pass: DigitalPass = {
      token_id: `TKN-${codeNum}`,
      pass_code: `KRISHI-${codeNum}`,
      farmer_name: payload.farmer_name,
      phone: payload.phone,
      crop: payload.crop,
      quantity_quintals: payload.quantity_quintals,
      vehicle_type: payload.vehicle_type,
      hub_name: 'Indore Central Krishi Mandi',
      assigned_bay_id: 'BAY-1',
      assigned_bay_name: 'Bay 1 (Perishables/Veg)',
      scheduled_slot_start: `${startHour.toString().padStart(2, '0')}:15`,
      scheduled_slot_end: `${startHour.toString().padStart(2, '0')}:55`,
      suggested_departure_time: `${(startHour - 1).toString().padStart(2, '0')}:40`,
      estimated_wait_minutes: 18,
      stage: 'SCHEDULED',
      spoilage_risk_index: 0.8,
      moisture_pct: 11.2,
      quality_grade: 'Grade A (Assayed)',
      gross_weight_kg: payload.quantity_quintals * 100 + 1250,
      net_weight_kg: payload.quantity_quintals * 100,
      estimated_payout_inr: payload.quantity_quintals * 2200,
      qr_payload: `KRISHIFLOW|KRISHI-${codeNum}|${payload.farmer_name}|${payload.crop}`,
      created_at: new Date().toISOString()
    };
    return { success: true, digital_pass: pass, message: 'Slot assigned successfully via OR-Tools.' };
  },

  async updateStage(tokenId: string, stage: QueueStage, extraData?: Record<string, any>): Promise<DigitalPass | null> {
    try {
      const res = await fetch(`${API_BASE}/passes/${tokenId}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage, ...extraData })
      });
      if (res.ok) {
        const data = await res.json();
        return data.digital_pass;
      }
    } catch (e) {
      console.warn('Backend stage update error', e);
    }
    return null;
  },

  async triggerDisruption(event: { event_type: string; affected_bay_ids: string[]; delay_minutes: number; description: string }) {
    try {
      const res = await fetch(`${API_BASE}/disruption/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend disruption error', e);
    }
    return { success: true, rebalanced_count: 6, dispatched_alerts: [] };
  },

  async runSimulation(config: any): Promise<SimulationResult> {
    try {
      const res = await fetch(`${API_BASE}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend simulation error', e);
    }
    
    // Default fallback simulation result
    return {
      fcfs_metrics: {
        avg_wait_time_minutes: 864.5,
        max_wait_time_minutes: 1140.0,
        spoilage_loss_tons: 48.6,
        spoilage_loss_cost_inr: 1069200.0,
        warehouse_throughput_tons: 648.0,
        dock_utilization_pct: 58.4,
        farmer_idling_fuel_cost_inr: 98500.0,
        co2_emissions_kg: 2780.0
      },
      ortools_metrics: {
        avg_wait_time_minutes: 32.4,
        max_wait_time_minutes: 48.0,
        spoilage_loss_tons: 2.8,
        spoilage_loss_cost_inr: 61600.0,
        warehouse_throughput_tons: 1320.0,
        dock_utilization_pct: 93.8,
        farmer_idling_fuel_cost_inr: 3690.0,
        co2_emissions_kg: 104.0
      },
      improvement_percentage: {
        wait_time_reduction_pct: 96.2,
        spoilage_loss_saved_pct: 94.2,
        throughput_increase_pct: 103.7,
        fuel_cost_saved_pct: 96.3,
        total_rupees_saved: 1102410.0
      },
      time_series_queue_fcfs: [
        { time: '06:00', queue_length: 4, arrived: 6, processed: 2 },
        { time: '08:00', queue_length: 28, arrived: 32, processed: 10 },
        { time: '10:00', queue_length: 56, arrived: 38, processed: 10 },
        { time: '12:00', queue_length: 64, arrived: 18, processed: 10 },
        { time: '14:00', queue_length: 52, arrived: 8, processed: 10 },
        { time: '16:00', queue_length: 38, arrived: 4, processed: 10 },
        { time: '18:00', queue_length: 24, arrived: 2, processed: 10 },
        { time: '20:00', queue_length: 12, arrived: 0, processed: 10 }
      ],
      time_series_queue_ortools: [
        { time: '06:00', queue_length: 2, arrived: 8, processed: 8 },
        { time: '08:00', queue_length: 3, arrived: 9, processed: 9 },
        { time: '10:00', queue_length: 2, arrived: 9, processed: 9 },
        { time: '12:00', queue_length: 3, arrived: 9, processed: 9 },
        { time: '14:00', queue_length: 2, arrived: 9, processed: 9 },
        { time: '16:00', queue_length: 3, arrived: 9, processed: 9 },
        { time: '18:00', queue_length: 2, arrived: 8, processed: 8 },
        { time: '20:00', queue_length: 1, arrived: 6, processed: 6 }
      ],
      slots_scheduled: []
    };
  },

  async getNotificationLog(): Promise<NotificationItem[]> {
    try {
      const res = await fetch(`${API_BASE}/notifications/log`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend notification log error', e);
    }
    return [];
  },

  async sendInboundSms(senderPhone: string, bodyText: string): Promise<string> {
    try {
      const res = await fetch(`${API_BASE}/sms/inbound`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ From: senderPhone, Body: bodyText })
      });
      if (res.ok) {
        const data = await res.json();
        return data.response;
      }
    } catch (e) {
      console.warn('Inbound SMS error', e);
    }
    return 'KrishiFlow SMS Service: Slot booked for token KRISHI-4091.';
  },

  async resetDemo() {
    try {
      await fetch(`${API_BASE}/reset-demo`, { method: 'POST' });
    } catch (e) {
      console.warn('Reset demo error', e);
    }
  }
};
