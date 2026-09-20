import os

class Settings:
    PROJECT_NAME: str = "AgriVision AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "agrivision-secure-secret-key-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    UPLOAD_DIR: str = os.path.join(BASE_DIR, "static", "uploads")
    SAMPLE_DIR: str = os.path.join(BASE_DIR, "sample_images")
    DATA_DIR: str = os.path.join(BASE_DIR, "app", "data")
    
    DATABASE_URL: str = f"sqlite:///{os.path.join(BASE_DIR, 'agrivision.db')}"

settings = Settings()

os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.SAMPLE_DIR, exist_ok=True)
