from fastapi import APIRouter, Query
from typing import Optional
from app.api.predict import IN_MEMORY_HISTORY

router = APIRouter(prefix="/history", tags=["Scan History"])

@router.get("")
def get_prediction_history(
    crop: Optional[str] = Query(None),
    limit: int = Query(50, le=200)
):
    results = list(reversed(IN_MEMORY_HISTORY))
    if crop and crop.lower() != "all":
        results = [r for r in results if crop.lower() in r.get("crop", "").lower()]
    return results[:limit]

@router.delete("/{record_id}")
def delete_history_record(record_id: int):
    global IN_MEMORY_HISTORY
    IN_MEMORY_HISTORY = [r for r in IN_MEMORY_HISTORY if r.get("id") != record_id]
    return {"success": True}
