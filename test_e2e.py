import httpx
import json

def verify_all_endpoints():
    client = httpx.Client(base_url="http://127.0.0.1:8000", timeout=10.0)

    print("==================================================")
    print("1. Testing Health Endpoint (/api/health)...")
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.status_code}"
    print(" -> Health check response:", res.json())

    print("\n2. Testing Crops Catalogue (/api/crops)...")
    res = client.get("/api/crops")
    assert res.status_code == 200
    crops = res.json()
    print(f" -> Fetched {len(crops)} crops. Examples: {[c['name'] for c in crops[:4]]}")

    print("\n3. Testing Hubs & Dock Bays (/api/hubs)...")
    res = client.get("/api/hubs")
    assert res.status_code == 200
    hubs = res.json()
    print(f" -> Fetched {len(hubs)} hubs. Hub 1: {hubs[0]['name']} ({len(hubs[0]['dock_bays'])} dock bays)")

    print("\n4. Testing Slot Booking via OR-Tools CP-SAT (/api/slots/book)...")
    booking_payload = {
        "farmer_name": "Ramesh Patel",
        "phone": "+919826044921",
        "village": "Sanwer (Indore)",
        "crop": "Tomato",
        "quantity_quintals": 45.0,
        "vehicle_type": "Tractor Trolley",
        "distance_km": 18.0,
        "preferred_hour_window": 9,
        "preferred_language": "hi"
    }
    res = client.post("/api/slots/book", json=booking_payload)
    assert res.status_code == 200, f"Booking failed: {res.text}"
    pass_data = res.json()["digital_pass"]
    token_id = pass_data["token_id"]
    print(f" -> Allocated Pass Code: {pass_data['pass_code']}")
    print(f" -> Slot: {pass_data['scheduled_slot_start']} - {pass_data['scheduled_slot_end']} at {pass_data['assigned_bay_name']}")
    print(f" -> Suggested Departure: {pass_data['suggested_departure_time']} AM | Spoilage Risk: {pass_data['spoilage_risk_index']}%")

    print("\n5. Testing Live Queue List (/api/passes)...")
    res = client.get("/api/passes")
    assert res.status_code == 200
    passes = res.json()
    print(f" -> Total Live Passes in Queue: {len(passes)}")

    print("\n6. Testing Hub Officer Stage Progression (/api/passes/{token_id}/stage)...")
    # Advance to WEIGHBRIDGE_IN
    res = client.patch(f"/api/passes/{token_id}/stage", json={"stage": "WEIGHBRIDGE_IN"})
    assert res.status_code == 200
    print(f" -> Advanced to WEIGHBRIDGE_IN: {res.json()['digital_pass']['stage']}")

    # Advance to ASSAYING and record moisture
    res = client.patch(f"/api/passes/{token_id}/stage", json={
        "stage": "UNLOADING_DOCK",
        "moisture_pct": 11.4,
        "quality_grade": "Grade A (Export Quality)",
        "gross_weight_kg": 5700.0,
        "net_weight_kg": 4500.0,
        "estimated_payout_inr": 99000.0
    })
    assert res.status_code == 200
    print(f" -> Assayed & Directed to Dock: {res.json()['digital_pass']['quality_grade']} | Payout: Rs {res.json()['digital_pass']['estimated_payout_inr']}")

    print("\n7. Testing Disruption Emergency Rebalancer (/api/disruption/trigger)...")
    disruption_payload = {
        "event_type": "DOCK_BREAKDOWN",
        "affected_bay_ids": ["BAY-1"],
        "delay_minutes": 30,
        "severity": "HIGH",
        "description": "Hydraulic Unloader Motor Failure at Bay 1"
    }
    res = client.post("/api/disruption/trigger", json=disruption_payload)
    assert res.status_code == 200
    print(f" -> Rebalanced {res.json()['rebalanced_count']} passes. Alerts generated: {len(res.json()['dispatched_alerts'])}")

    print("\n8. Testing Two-Way SMS / WhatsApp Inbound Webhook (/api/sms/inbound)...")
    sms_payload = {
        "From": "+919826055555",
        "Body": "BOOK TOMATO 50 SANWER"
    }
    res = client.post("/api/sms/inbound", json=sms_payload)
    assert res.status_code == 200
    print(f" -> Inbound SMS parsed & booked. Bot response: {res.json()['response']}")

    print("\n9. Testing CSBS Judge Benchmark Simulation (/api/simulate)...")
    sim_payload = {
        "num_farmers": 80,
        "perishable_crop_ratio": 0.5,
        "surge_arrival_spike": True,
        "num_dock_bays": 6
    }
    res = client.post("/api/simulate", json=sim_payload)
    assert res.status_code == 200
    sim_res = res.json()
    print(" -> FCFS Avg Wait Time:", sim_res["fcfs_metrics"]["avg_wait_time_minutes"], "mins")
    print(" -> OR-Tools Avg Wait Time:", sim_res["ortools_metrics"]["avg_wait_time_minutes"], "mins")
    print(f" -> Wait Time Reduction: {sim_res['improvement_percentage']['wait_time_reduction_pct']}%")
    print(f" -> Food Spoilage Loss Saved: {sim_res['improvement_percentage']['spoilage_loss_saved_pct']}%")
    print(f" -> Warehouse Daily Throughput Gain: +{sim_res['improvement_percentage']['throughput_increase_pct']}%")
    print(f" -> Total Daily Value Saved: Rs {sim_res['improvement_percentage']['total_rupees_saved']:,.2f}")

    print("\n10. Testing Frontend Dev Server (http://127.0.0.1:3000)...")
    fe_res = httpx.get("http://127.0.0.1:3000", timeout=5.0)
    assert fe_res.status_code == 200
    assert "KrishiFlow" in fe_res.text or "<div id=\"root\">" in fe_res.text
    print(" -> Frontend HTML served successfully on port 3000 (HTTP 200 OK)")

    print("\n==================================================")
    print("ALL 10 VERIFICATION TESTS PASSED SUCCESSFULLY! [OK]")
    print("==================================================")

if __name__ == "__main__":
    verify_all_endpoints()
