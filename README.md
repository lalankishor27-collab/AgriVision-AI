# 🌿 AgriVision AI — Deep Learning Plant Disease Diagnostics & Farm Advisory System

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-CUDA_12.1-orange?logo=pytorch&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?logo=fastapi&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Single_Page_SPA-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-High_Contrast_UI-1572B6?logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

> **AgriVision AI** is a precision agriculture decision-support web application for the Mid-Semester Project Evaluation (MCA Minor Project-I, Course: MC470502). Powered by **PyTorch MobileNetV3 Transfer Learning** fine-tuned on 54,305 PlantVillage images (**98.12% Test Accuracy**), AgriVision AI classifies crop pathogens across 38 categories and delivers automated agronomic treatment protocols in under 1.5 seconds.

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

## 🚀 Delivered Mid-Semester System Features

- **🧠 PyTorch MobileNetV3 Transfer Learning**: Pre-trained ImageNet backbone with customized 38-class linear classification output head. Depthwise separable convolutions reduce parameter overhead by ~80% (~3.2M parameters).
- **⚡ Asynchronous FastAPI REST API**: Asynchronous ASGI backend (`app/main.py`) serving endpoints under both `/api` and `/api/v1` with zero-latency in-memory execution.
- **🎨 Responsive Single-Page HTML5/CSS3/JS UI**: Custom high-contrast Dark Navy & Emerald presentation theme with 100% WCAG AAA typography legibility.
- **🧪 1-Click Sample Test Kit**: Integrated 5 verified PlantVillage dataset sample leaf images (Healthy Tomato, Tomato Septoria, Apple Scab, Grape Black Rot, Healthy Apple) achieving 100.0% PyTorch model confidence.
- **📋 Actionable Agronomic Advisory**: Instant symptoms breakdown, organic treatments, chemical controls, and preventive measures.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **AI Framework** | **PyTorch 2.5.1 + CUDA 12.1** | MobileNetV3 transfer learning, Softmax probability inference |
| **Backend API** | **FastAPI** | Asynchronous Python web API, OpenAPI documentation |
| **ASGI Server** | **Uvicorn** | Asynchronous HTTP server event loop |
| **Frontend UI** | **HTML5 & Vanilla JavaScript** | Single Page Application (SPA), zero build-tool overhead |
| **Styling** | **Custom CSS3 & Bootstrap 5** | High-contrast presentation theme, responsive layout |
| **Icons** | **FontAwesome 6** | Visual indicators for diagnostic status |

---

## 📂 Clean Project Structure

```
AgriVision-AI/
├── backend/
│   ├── app/
│   │   ├── api/             # FastAPI Endpoint Routers (auth, predict, history)
│   │   ├── core/            # App Configuration & CORS Middleware
│   │   ├── models/          # PyTorch Model Engine (ml_engine.py) & .pth Checkpoint
│   │   └── main.py          # FastAPI Application Entrypoint
│   ├── static/              # Static Frontend Assets
│   │   ├── css/             # Custom High-Contrast Theme (styles.css)
│   │   ├── js/              # Application Logic (script.js)
│   │   ├── samples/         # Verified PlantVillage Dataset Sample Images
│   │   └── index.html       # Single-Page Web Entrypoint
│   ├── download_dataset.py  # High-speed chunk-streaming downloader script
│   ├── train.py             # PyTorch MobileNetV3 GPU trainer script
│   ├── evaluate.py          # Validation & Test split evaluation script
│   ├── test_api.py          # Backend automated endpoint test suite
│   └── requirements.txt     # Python Dependencies
├── charts/                  # Generated Matplotlib Performance Chart Images
├── agrivision_ppt_canvas_prompt.md  # 13-Slide Gemini Canvas Presentation Prompt Deck
└── README.md                # Project Documentation
```

---

## ⚡ How to Run the App

In Command Prompt (CMD), run:
```cmd
cd /d "E:\minor project\agrivision_github_ready\backend"
.\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```
Open your browser to: **`http://127.0.0.1:8001/`**

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
