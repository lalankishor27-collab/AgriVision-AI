from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.models.db_models import PredictionHistory

router = APIRouter(prefix="/history", tags=["Scan History"])

@router.get("")
def get_prediction_history(
    user_id: Optional[int] = Query(None),
    crop: Optional[str] = Query(None),
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db)
):
    query = db.query(PredictionHistory)
    if user_id:
        query = query.filter(PredictionHistory.user_id == user_id)
    if crop and crop.lower() != "all":
        query = query.filter(PredictionHistory.crop.ilike(f"%{crop}%"))

    history = query.order_by(PredictionHistory.created_at.desc()).limit(limit).all()
    
    return [
        {
            "id": item.id,
            "crop": item.crop,
            "disease_class": item.disease_class,
            "display_name": item.display_name,
            "confidence": item.confidence,
            "original_image_path": item.original_image_path,
            "location": item.location,
            "created_at": item.created_at.isoformat() if item.created_at else None
        }
        for item in history
    ]

@router.delete("/{record_id}")
def delete_history_record(record_id: int, db: Session = Depends(get_db)):
    record = db.query(PredictionHistory).filter(PredictionHistory.id == record_id).first()
    if not record:
        return {"success": False, "detail": "Record not found"}
    db.delete(record)
    db.commit()
    return {"success": True}
