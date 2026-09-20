import os
import sys
import zipfile
import requests

DATASET_DIR = os.path.join(os.path.dirname(__file__), "dataset")
ZIP_PATH = os.path.join(DATASET_DIR, "plantvillage_master.zip")
EXTRACT_DIR = os.path.join(DATASET_DIR, "PlantVillage")

# Direct Official PlantVillage Dataset Repository Zip URL
DATASET_URL = "https://github.com/spMohanty/PlantVillage-Dataset/archive/refs/heads/master.zip"

def download_and_extract_plantvillage():
    print("=" * 70)
    print("AgriVision AI - PlantVillage Dataset Automatic Downloader")
    print("=" * 70)
    
    os.makedirs(DATASET_DIR, exist_ok=True)
    
    target_color_dir = os.path.join(EXTRACT_DIR, "PlantVillage-Dataset-master", "raw", "color")
    if os.path.exists(target_color_dir) and len(os.listdir(target_color_dir)) >= 38:
        print(f"PlantVillage Dataset is already downloaded and ready at:\n   {target_color_dir}")
        return target_color_dir

    print(f"Downloading PlantVillage dataset via high-speed stream...")
    print(f"   URL: {DATASET_URL}")

    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    
    try:
        response = requests.get(DATASET_URL, headers=headers, stream=True)
        response.raise_for_status()

        total_size = int(response.headers.get('content-length', 0))
        downloaded = 0
        chunk_size = 1024 * 1024  # 1 MB chunk

        with open(ZIP_PATH, 'wb') as f:
            for chunk in response.iter_content(chunk_size=chunk_size):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total_size > 0:
                        pct = (downloaded / total_size) * 100.0
                        mb_dn = downloaded / (1024 * 1024)
                        mb_tot = total_size / (1024 * 1024)
                        sys.stdout.write(f"\r   Progress: [{pct:5.1f}%] {mb_dn:.1f} MB / {mb_tot:.1f} MB")
                    else:
                        mb_dn = downloaded / (1024 * 1024)
                        sys.stdout.write(f"\r   Downloaded: {mb_dn:.1f} MB")
                    sys.stdout.flush()

        print("\n\nDownload complete! Extracting PlantVillage archive...")
        
        with zipfile.ZipFile(ZIP_PATH, 'r') as zip_ref:
            zip_ref.extractall(EXTRACT_DIR)

        print(f"Extracted dataset to: {EXTRACT_DIR}")
        
        if os.path.exists(ZIP_PATH):
            os.remove(ZIP_PATH)

        if os.path.exists(target_color_dir):
            return target_color_dir
        return EXTRACT_DIR

    except Exception as e:
        print(f"\nDownload failed: {e}")
        print("Alternative: You can manually place the 38 PlantVillage folders inside backend/dataset/PlantVillage/")
        return None

if __name__ == "__main__":
    download_and_extract_plantvillage()
