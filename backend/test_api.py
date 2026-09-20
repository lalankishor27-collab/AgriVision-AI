import urllib.request
import json

def test_backend_api():
    print("Testing AgriVision AI Backend Services...\n")
    base = "http://127.0.0.1:8001/api"

    # 1. Root Health Check
    r = urllib.request.urlopen("http://127.0.0.1:8001/").read().decode()
    res = json.loads(r)
    print(f"[OK] System Health: {res['system']} ({res['status']})")

    # 2. Get Samples
    r = urllib.request.urlopen(f"{base}/samples").read().decode()
    samples = json.loads(r)
    print(f"[OK] Demo Samples Loaded ({len(samples)} items):", [s['title'] for s in samples])

    # 3. Prediction API Test
    req = urllib.request.Request(
        f"{base}/predict",
        data="sample_key=tomato_early_blight".encode("utf-8"),
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    r = urllib.request.urlopen(req).read().decode()
    pred = json.loads(r)
    print(f"[OK] Prediction Engine: {pred['display_name']} ({pred['crop']} Crop) - Confidence: {pred['confidence']}%")

    # 4. History API Test
    r = urllib.request.urlopen(f"{base}/history").read().decode()
    history = json.loads(r)
    print(f"[OK] Scan History Feed ({len(history)} entries)")

    print("\n[SUCCESS] All API Endpoints Operating Cleanly!")

if __name__ == "__main__":
    test_backend_api()
