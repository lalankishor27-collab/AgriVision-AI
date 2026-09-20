from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, default="farmer")
    phone = Column(String, nullable=True)
    village = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    predictions = relationship("PredictionHistory", back_populates="user")

class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    crop = Column(String, nullable=False)
    disease_class = Column(String, nullable=False)
    display_name = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    original_image_path = Column(String, nullable=False)
    location = Column(String, default="Main Farm Field")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="predictions")
