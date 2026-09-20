import os
from PIL import Image, ImageFilter, ImageDraw
from sqlalchemy.orm import Session
from app.core.database import engine, Base, SessionLocal
from app.core.config import settings
from app.models.db_models import User, PredictionHistory
from app.api.auth import get_password_hash

def seed_database():
    print("Seeding AgriVision database with distinct leaf photo samples...")
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    demo_user = db.query(User).filter(User.email == "demo@agrivision.ai").first()
    if not demo_user:
        demo_user = User(
            email="demo@agrivision.ai",
            hashed_password=get_password_hash("password123"),
            full_name="Lalan Kishor",
            role="farmer",
            phone="+91 98765 43210",
            village="Main Field Sector"
        )
        db.add(demo_user)

    db.commit()

    sample_dir = settings.SAMPLE_DIR
    static_sample_dir = os.path.join(settings.BASE_DIR, "static", "samples")
    os.makedirs(sample_dir, exist_ok=True)
    os.makedirs(static_sample_dir, exist_ok=True)

    # 1. Map downloaded real photos
    mapping = {
        'tomato_early_blight.jpg': 'C:/Users/lalan/Downloads/fudhsc.jpg',
        'apple_scab.jpg': 'C:/Users/lalan/Downloads/OIP (1).jpg',
        'grape_black_rot.jpg': 'C:/Users/lalan/Downloads/11.jpg',
        'apple_healthy.jpg': 'C:/Users/lalan/Downloads/OIP.jpg'
    }

    for target, src_path in mapping.items():
        p1 = os.path.join(sample_dir, target)
        p2 = os.path.join(static_sample_dir, target)
        if os.path.exists(src_path):
            img = Image.open(src_path).convert('RGB')
            img.save(p1)
            img.save(p2)

    # 2. Distinct Healthy Tomato Leaf sample
    t1 = os.path.join(sample_dir, 'tomato_healthy.jpg')
    t2 = os.path.join(static_sample_dir, 'tomato_healthy.jpg')
    
    img = Image.new('RGB', (450, 450), (248, 248, 248))
    draw = ImageDraw.Draw(img)
    draw.polygon([(225, 50), (120, 180), (70, 280), (160, 260), (225, 400), (290, 260), (380, 280), (330, 180)], fill=(34, 139, 34), outline=(20, 100, 20))
    draw.polygon([(225, 80), (140, 190), (180, 250), (225, 370), (270, 250), (310, 190)], fill=(46, 160, 46))
    draw.line([(225, 50), (225, 400)], fill=(120, 200, 80), width=4)
    draw.line([(225, 180), (140, 140)], fill=(120, 200, 80), width=3)
    draw.line([(225, 180), (310, 140)], fill=(120, 200, 80), width=3)
    draw.line([(225, 250), (120, 230)], fill=(120, 200, 80), width=3)
    draw.line([(225, 250), (330, 230)], fill=(120, 200, 80), width=3)
    img = img.filter(ImageFilter.GaussianBlur(1))
    img.save(t1)
    img.save(t2)

    if db.query(PredictionHistory).count() == 0:
        h1 = PredictionHistory(
            user_id=demo_user.id,
            crop="Tomato",
            disease_class="Tomato___Septoria_leaf_spot",
            display_name="Tomato Septoria Spot",
            confidence=98.2,
            original_image_path="/static/samples/tomato_early_blight.jpg",
            location="Main Farm Field"
        )
        db.add(h1)

    db.commit()
    db.close()
    print("Database seeding with distinct leaf photos completed.")

if __name__ == "__main__":
    seed_database()
