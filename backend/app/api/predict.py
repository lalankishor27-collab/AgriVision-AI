import os
import shutil
import datetime
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.core.config import settings
from app.models.ml_engine import ml_engine

router = APIRouter(prefix="", tags=["Disease Classification"])

IN_MEMORY_HISTORY = []

@router.post("/predict")
async def predict_leaf(
    file: Optional[UploadFile] = File(None),
    sample_key: Optional[str] = Form(None),
    user_id: Optional[int] = Form(None),
    location: Optional[str] = Form("Main Farm Field")
):
    if file and file.filename:
        filename = f"leaf_{os.urandom(6).hex()}_{file.filename}"
        file_path = os.path.join(settings.UPLOAD_DIR, filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        image_url = f"/static/uploads/{filename}"
    elif sample_key:
        sample_file = os.path.join(settings.SAMPLE_DIR, f"{sample_key}.jpg")
        if not os.path.exists(sample_file):
            _create_demo_sample(sample_key, sample_file)
        filename = f"sample_{sample_key}.jpg"
        file_path = os.path.join(settings.UPLOAD_DIR, filename)
        shutil.copy(sample_file, file_path)
        image_url = f"/static/uploads/{filename}"
    else:
        raise HTTPException(status_code=400, detail="Please upload a leaf image or select a sample image.")

    analysis = ml_engine.analyze_leaf_image(file_path)

    record_id = len(IN_MEMORY_HISTORY) + 1
    created_at = datetime.datetime.now(datetime.timezone.utc).isoformat()

    res = {
        "id": record_id,
        "image_url": image_url,
        "predicted_class": analysis["predicted_class"],
        "display_name": analysis["display_name"],
        "crop": analysis["crop"],
        "confidence": analysis["confidence"],
        "advisory": analysis["advisory"],
        "location": location or "Main Farm Field",
        "created_at": created_at
    }

    IN_MEMORY_HISTORY.append(res)
    return res

@router.get("/samples")
def get_sample_images():
    samples = [
        {
            "key": "tomato_early_blight",
            "title": "Tomato Septoria Spot",
            "crop": "Tomato",
            "description": "Unhealthy tomato leaf with Septoria spot lesions",
            "image_url": "/static/samples/tomato_early_blight.jpg"
        },
        {
            "key": "apple_scab",
            "title": "Apple Scab / Rust",
            "crop": "Apple",
            "description": "Unhealthy apple leaf with scab and rust spots",
            "image_url": "/static/samples/apple_scab.jpg"
        },
        {
            "key": "grape_black_rot",
            "title": "Grape Black Rot",
            "crop": "Grape",
            "description": "Unhealthy grape leaf showing black rot lesions",
            "image_url": "/static/samples/grape_black_rot.jpg"
        },
        {
            "key": "apple_healthy",
            "title": "Healthy Apple Leaf",
            "crop": "Apple",
            "description": "Clean green healthy apple foliage",
            "image_url": "/static/samples/apple_healthy.jpg"
        },
        {
            "key": "tomato_healthy_leaf",
            "title": "Healthy Tomato Leaf",
            "crop": "Tomato",
            "description": "Vibrant green healthy tomato foliage",
            "image_url": "/static/samples/tomato_healthy_leaf.jpg"
        }
    ]
    return samples

def _create_demo_sample(sample_key: str, dest_path: str):
    img = Image.new("RGB", (400, 400), (34, 139, 34))
    draw = ImageDraw.Draw(img)
    draw.ellipse([40, 100, 360, 300], fill=(20, 90, 20), outline=(10, 60, 10), width=3)
    img.save(dest_path)
