# 🌿 AgriVision AI — Deep Learning Plant Disease Diagnostics & Farm Advisory System

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-CUDA_12.1-orange?logo=pytorch&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

> **AgriVision AI** is a hybrid precision agriculture decision-support platform. Combining **PyTorch MobileNetV3 Transfer Learning** with **OpenCV HSV Computer Vision Surface Segmentation**, AgriVision AI classifies crop pathogens across 38 categories, computes surface infection severity ratios (% Affected Area), and delivers automated agronomic treatment protocols.

---

## 👨‍💻 Project Team & Supervision

- **Course**: Minor Project - I (Code: MC470502) | Master of Computer Applications (MCA)
- **Presented By**:
  - **Lalan Kishor** (Roll No: 2447006)
  - **Narendra Mohan Jha** (Roll No: 2447014)
- **Project Guide**: **Dr. Amrita Mohan** (Dept. of Computer Science & Engineering)

---

## 📊 Empirical Model Performance Metrics (54,305 PlantVillage Images)

Model fine-tuning was executed on **CUDA acceleration (`NVIDIA GeForce RTX 3050/3060 6GB Laptop GPU`)** using PyTorch over 5 full epochs (4,245 total batch iterations).

| Evaluation Benchmark | Split Ratio | Image Count | Metric Score | Key Performance Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Training Set** | 80% | **43,444 images** | **96.98% Accuracy** | Final Epoch 5 Cross-Entropy Loss: `0.0875` |
| **Validation Set** | 10% | **5,430 images** | **`98.31% Accuracy`** | Exceeds target benchmark of $\ge 95\%$ |
| **Unseen Test Set** | 10% | **5,431 images** | **`98.12% Accuracy`** | **Generalization verified (No overfitting)** |
| **Test Set Precision** | 10% | **5,431 images** | **97.92% Precision** | Macro-averaged precision score |
| **Test Set Recall** | 10% | **5,431 images** | **98.22% Recall** | Macro-averaged recall score |
| **Test Set F1-Score** | 10% | **5,431 images** | **98.07% F1-Score** | Optimal harmonic mean balance |

- **Training Compute Device**: `NVIDIA GeForce RTX 3050/3060 6GB Laptop GPU` (CUDA 12.1)
- **Total Training Duration**: **1,454.54 seconds (~24.2 minutes)**
- **Model Checkpoint**: [mobilenetv3_plantvillage.pth](backend/app/models/mobilenetv3_plantvillage.pth) (Compact **6.36 MB** weight binary)

---

## 🚀 Core Architectural Highlights

- **🧠 PyTorch MobileNetV3 Transfer Learning**: Pre-trained ImageNet backbone with customized 38-class linear classification output head. Depthwise separable convolutions reduce parameter overhead by ~80% (~3.2M parameters).
- **🔬 OpenCV HSV Surface Lesion Segmentation**:
  - **Background Exclusion Mask**: $B = (S < 30) \land ((V > 180) \lor (V < 25))$ filters studio backdrops and shadows.
  - **Quantitative Infection Ratio**: $\text{Infection \%} = \left( \frac{\text{Spot Pixels}}{\text{Total Leaf Surface Pixels}} \right) \times 100$.
- **⚖️ Hybrid Inference Engine**: Combines raw PyTorch Softmax probabilities with HSV visual foliage profiling for robust field prediction.
- **🧪 Interactive Sample Test Kit**: Integrated 5 pre-loaded sample leaf buttons (Tomato Septoria, Apple Scab, Grape Black Rot, Healthy Apple, Healthy Tomato) for instant 1-click evaluation.
- **📋 Actionable Agronomic Advisory**: Organic treatments, chemical controls, and preventive maintenance guides.
- **📊 Relational History Logging**: SQLite database managed via SQLAlchemy ORM for tracking user scan histories.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **AI Framework** | **PyTorch 2.5.1 + CUDA 12.1** | MobileNetV3 transfer learning, Softmax probability inference |
| **Computer Vision** | **OpenCV / NumPy / Pillow** | HSV color space thresholding, surface area ratio calculation |
| **Backend API** | **FastAPI** | Asynchronous Python web API, OpenAPI documentation |
| **ASGI Server** | **Uvicorn** | Asynchronous HTTP server event loop |
| **Data Validation** | **Pydantic** | Schema validation and input sanitation |
| **ORM / Database** | **SQLAlchemy & SQLite** | Relational mapping and parameterized queries |
| **Frontend UI** | **React 18 & Vite** | Single Page Application (SPA), Virtual DOM |
| **Styling** | **Tailwind CSS** | Responsive layout grid, glassmorphism design |
| **HTTP Client** | **Axios 1.6** | Promise-based API communication & multipart uploads |

---

## 📂 Project Structure

```
AgriVision-AI/
├── backend/
│   ├── app/
│   │   ├── api/             # FastAPI Endpoint Routers (auth, predict, history, samples)
│   │   ├── core/            # App Configuration & CORS Middleware
│   │   ├── db/              # SQLite Database Session Handler
│   │   ├── models/          # SQLAlchemy Database Models & ml_engine.py
│   │   └── main.py          # FastAPI Application Entrypoint
│   ├── dataset/             # Automatic PlantVillage Dataset Downloader
│   ├── download_dataset.py  # High-speed chunk-streaming downloader script
│   ├── train.py             # PyTorch MobileNetV3 GPU trainer script
│   ├── evaluate.py          # Validation & Test split evaluation script
│   ├── test_api.py          # Backend automated endpoint test suite
│   └── requirements.txt     # Python Dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, DiagnosticCard, SampleTestKit, ScanHistory
│   │   ├── services/        # Axios API Client Service
│   │   ├── App.jsx          # React Main Component
│   │   └── main.jsx         # React DOM Entrypoint
│   ├── index.html           # HTML5 Entrypoint
│   └── package.json         # Node.js Dependencies
├── charts/                  # Generated Matplotlib Performance Chart Images
├── agrivision_ppt_canvas_prompt.md  # 13-Slide Gemini Canvas Presentation Prompt Deck
└── README.md                # Technical Documentation
```

---

## ⚡ Execution Commands

### 1. Download PlantVillage Dataset:
```powershell
cd backend
.\venv\Scripts\python.exe download_dataset.py
```

### 2. Fine-Tune PyTorch Model on GPU:
```powershell
cd backend
.\venv\Scripts\python.exe train.py --dataset_path ./dataset/PlantVillage/PlantVillage-Dataset-master/raw/color --epochs 5 --batch_size 64
```

### 3. Evaluate Validation & Test Sets:
```powershell
cd backend
.\venv\Scripts\python.exe evaluate.py
```

### 4. Run Backend Server (Terminal 1):
```powershell
cd backend
.\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```

### 5. Run Frontend Development Server (Terminal 2):
```powershell
cd frontend
npm run dev
```
Open browser at: `http://localhost:5174/diagnose`

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
