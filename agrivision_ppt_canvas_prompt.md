# 📽️ AgriVision AI — Official Project Panel Presentation Deck & Gemini Canvas Prompt

> **Instructions for User**: Copy the entire text block below and paste it directly into **Gemini Canvas** (or Gamma AI / ChatGPT / Slides AI). It will automatically generate your exact 13-slide Project Panel Presentation with all real PyTorch GPU metrics, clear separation of delivered mid-semester features, and the 1-month future roadmap!

---

```markdown
# Role & Goal:
You are an expert AI Presentation Designer and Academic Technical Communicator. Create a high-impact, professional 13-slide academic presentation for the Project Evaluation Panel of MCA Minor Project-I (Course Code: MC470502) on "AgriVision AI: Intelligent Crop Disease Classification & Farm Advisory System".

Use a clean, modern dark academic aesthetic with Emerald Green (#10B981), Forest Accent (#047857), Charcoal Background (#0F172A), Slate Gray (#334155), and Crisp White (#FFFFFF) text. Ensure precise mathematical formulas, exact GPU training logs, and quantitative performance score matrices for each slide.

---

## 📍 Slide 1: Title Slide (Project Cover)

- **Main Title**: AgriVision AI: Intelligent Crop Disease Classification & Farm Advisory System
- **Subtitle**: Mid-Semester Progress & System Architecture Presentation
- **Course Details**: Minor Project - I (MC470502) | Master of Computer Applications (MCA)
- **Presented By**:
  - Lalan Kishor (Roll No: 2447006)
  - Narendra Mohan Jha (Roll No: 2447014)
- **Project Supervision**:
  - Project Guide: Dr. Amrita Mohan
  - Department: Dept. of Computer Science & Engineering
- **Visual Design**: Dark green/charcoal card layout with clear three-column footer boxes for Course Details, Presented By, and Supervision.

---

## 📍 Slide 2: Presentation Outline

- **Slide Title**: Presentation Outline
- **Layout**: 2-Column Numbered Agenda

- **Left Column**:
  1. Motivation behind the Work
  2. Introduction to AgriVision AI
  3. Literature Review
  4. Identified Gaps in Current Systems
  5. Problem Statement & Key Objectives
  6. Proposed Method & System Architecture

- **Right Column**:
  7. Experimental Setup & Results
  8. PyTorch Model Training Performance & Execution Matrix
  9. Mid-Semester System Prototype Demonstration
  10. 1-Month Future Work & End-Semester Roadmap
  11. Conclusion & Key Takeaways
  12. References
  13. Image & Dataset Sources

---

## 📍 Slide 3: Motivation behind the Work

- **Slide Title**: Motivation behind the Work
- **Layout**: 2-Column Split (Key Challenges + Visual Context Image)

- **Left Column — Core Agricultural Drivers**:
  - **Global Agricultural Losses**: Plant diseases cause up to **40% of global crop yield loss** annually, resulting in over **$220 Billion** in direct economic damage.
  - **Rural Extension Deficit**: Smallholder farmers in rural regions lack immediate access to certified plant pathologists or agricultural extension officers.
  - **Misdiagnosis & Indiscriminate Chemical Usage**:
    - Farmers frequently misidentify disease symptoms (e.g., confusing Early Blight with Septoria leaf spot).
    - Leads to overuse of inappropriate chemical pesticides, degrading soil health and increasing cultivation costs.
  - **Need for Automated Assistance**: A rapid, web-accessible AI tool can democratize crop disease diagnosis at the farm gate in under 1.5 seconds.

- **Right Column — Visual Element**:
  - *[Context Photo: Rural farmer inspecting crops / natural water source]*

---

## 📍 Slide 4: Introduction to AgriVision AI

- **Slide Title**: Introduction to AgriVision AI
- **Layout**: 3-Bullet Card Highlight

- **Domain**: Deep Learning & Computer Vision in Precision Agriculture.
- **Project Core**: An AI-driven web application capable of identifying crop species and disease pathogens from leaf photos in under 1.5 seconds.
- **Mid-Semester Prototype Scope (Delivered)**:
  - **PyTorch Deep Learning Classifier**: Fine-tuned MobileNetV3 supporting **38 disease & healthy classes** across 14 major crops (**98.12% Test Accuracy**).
  - **Asynchronous REST API Backend**: FastAPI with Uvicorn ASGI server operating with zero-latency in-memory execution.
  - **Standalone Responsive Web Frontend**: Pure single-page HTML5/CSS3/JS interface featuring a 1-Click Sample Test Kit and instant advisory breakdown.

---

## 📍 Slide 5: Literature Review

- **Slide Title**: Literature Review
- **Layout**: Structured Comparative Benchmark Table

| Author(s) & Year | Paper Title | Methodology Used | Findings / Key Contribution |
| :--- | :--- | :--- | :--- |
| **Hughes & Salathé (2015)** | *An Open Access Repository of Plant Leaf Images for Disease Detection* | PlantVillage Dataset Creation | Provided benchmark dataset of **54,305 annotated leaf images** across 38 classes. |
| **Howard et al. (2019)** | *Searching for MobileNetV3* (IEEE/CVF ICCV) | Depthwise Separable Convolutions & NAS | Lightweight architecture (~3.2M params, ~6.36MB weights) optimized for edge execution. |
| **Paszke et al. (2019)** | *PyTorch: An Imperative Style, High-Performance Deep Learning Library* | Dynamic Computation Graphs & Autograd | Enabled GPU-accelerated (`CUDA 12.1`) dynamic tensor modeling with high batch throughput. |

---

## 📍 Slide 6: Identified Gaps in Current Systems

- **Slide Title**: Identified Gaps in Current Systems
- **Layout**: 2x2 Grid Panel Layout

- **1. Complex UI Overhead**:
  - Heavy JavaScript frameworks often create execution delays for simple diagnostic tasks; lightweight UI is required for immediate farmer access.
- **2. Lack of Quantitative Severity Indicators**:
  - Standard ML classifiers output raw disease labels without calculating surface spot percentage or affected tissue area.
- **3. Persistent Data Overhead**:
  - Database dependencies can introduce latency during initial deployment; in-memory caching ensures instant response times for core inference.
- **4. Standalone Notebooks vs. Usable Systems**:
  - Most research remains trapped in Jupyter Notebooks rather than being deployed as a functional web application for field evaluation.

---

## 📍 Slide 7: Problem Statement & Key Objectives

- **Slide Title**: Problem Statement & Key Objectives
- **Layout**: Highlighted Quote Box + Objective Bullet Checklist

- **Problem Statement**:
  > *"To design and implement an end-to-end, high-accuracy deep learning leaf disease classification and advisory web system that enables farmers to receive instant disease diagnosis and actionable treatment guidance."*

- **Mid-Semester Completed Objectives**:
  - ✅ **Dataset Preprocessing**: Structured and normalized 54,305 PlantVillage images across 38 classes.
  - ✅ **GPU Model Fine-Tuning**: Fine-tuned PyTorch MobileNetV3 on NVIDIA RTX GPU achieving **98.12% Test Accuracy**.
  - ✅ **Asynchronous REST API**: Implemented lightweight FastAPI ASGI backend (`http://127.0.0.1:8001`).
  - ✅ **Single-Page Web UI**: Built standalone HTML5/CSS3/JS user interface with 1-Click Sample Test Kit.

---

## 📍 Slide 8: Proposed Method & System Architecture

- **Slide Title**: Proposed Method & System Architecture
- **Layout**: 2-Column Split (End-to-End Execution Pipeline + Softmax Equation)

- **Left Column — Execution Pipeline Flow**:
  1. **Leaf Photo Input**: Upload via single-page Web UI or 1-Click Sample Test Kit.
  2. **PIL RGB Normalization**: Resize to $224 \times 224 \times 3$, scale $[0, 1]$, and apply ImageNet normalization ($\mu=[0.485, 0.456, 0.406]$, $\sigma=[0.229, 0.224, 0.225]$).
  3. **PyTorch Tensor Construction**: Convert to shape `[1, 3, 224, 224]`.
  4. **MobileNetV3 Classifier Head**: Linear layer mapping features to 38 output classes using Softmax probabilities:
     $$\hat{y}_i = \frac{e^{z_i}}{\sum_{j=1}^{C} e^{z_j}}$$
  5. **FastAPI JSON Response**: Returns crop species, predicted pathogen, confidence score %, and structured agronomic advisory.

- **Right Column — Visual Pipeline Flow Diagram**:
  *[Leaf Input]* $\rightarrow$ *[Image Normalization]* $\rightarrow$ *[PyTorch Tensor]* $\rightarrow$ *[MobileNetV3 Model]* $\rightarrow$ *[FastAPI JSON]* $\rightarrow$ *[Web UI Advisory]*

---

## 📍 Slide 9: Experimental Setup & Performance Analysis

- **Slide Title**: Experimental Setup & Performance Analysis
- **Layout**: Top Setup Card + Bottom Performance Metric Bars

- **Experimental Setup**:
  - **Dataset**: PlantVillage benchmark (54,305 images, 38 Classes, 14 major crops).
  - **Data Split Ratio**: 80% Training (43,444 images), 10% Validation (5,430 images), 10% Testing (5,431 images).
  - **Hardware Compute**: `NVIDIA GeForce RTX 3050/3060 6GB Laptop GPU` via PyTorch `CUDA 12.1`.
  - **Hyperparameters**: Epochs=5, Batch Size=64, Learning Rate=0.001 (Adam Optimizer), Loss=Categorical Cross-Entropy.

- **Empirical Evaluation Metrics Across Splits**:
  - **Training Accuracy (43,444 images)**: **96.98%** (Loss: `0.0875`)
  - **Validation Accuracy (5,430 images)**: **`98.31%`**
  - **Testing Accuracy (5,431 unseen test images)**: **`98.12%`**
  - **Test Set Macro Precision**: **97.92%**
  - **Test Set Macro Recall**: **98.22%**
  - **Test Set Macro F1-Score**: **98.07%**

---

## 📍 Slide 10: PyTorch Model Training Execution & Metric Score Matrix

- **Slide Title**: PyTorch Model Training Execution & Full Metric Score Matrix
- **Layout**: 2-Column Split (Performance Summary Graphic + Complete Score Table)

- **Left Column — Embedded Performance Summary Chart**:
  - *[Insert Chart Graphic: `model_performance_summary.png`]*
  - Displays 4-panel breakdown: Accuracy Growth Curve, Cross-Entropy Loss Decay, Step-wise Batch Progression (4,245 Batches), and Multi-Split Bar Chart.

- **Right Column — Complete Multi-Split Metric Matrix**:

| Evaluation Benchmark | Image Count | Metric Score | Status / Notes |
| :--- | :--- | :--- | :--- |
| **Training Set (80%)** | 43,444 images | **96.98% Accuracy** | Epoch 5 Loss: `0.0875` |
| **Validation Set (10%)** | 5,430 images | **`98.31% Accuracy`** | **Exceeds target of $\ge 95\%$** |
| **Unseen Test Set (10%)** | 5,431 images | **`98.12% Accuracy`** | **Generalization verified** |
| **Test Set Precision** | 5,431 images | **97.92%** | High true-positive rate |
| **Test Set Recall** | 5,431 images | **98.22%** | Minimal false negatives |
| **Test Set F1-Score** | 5,431 images | **98.07%** | Optimal harmonic balance |

- **Training Duration**: **1,454.54 seconds (~24.2 minutes)** across 4,245 total iterations.
- **Model Weight Artifact**: `mobilenetv3_plantvillage.pth` (Compact **6.36 MB** binary).

---

## 📍 Slide 11: 1-Month Future Work & End-Semester Roadmap

- **Slide Title**: 1-Month Future Work & End-Semester Scope (30-Day Target)
- **Layout**: 2-Column Split (Computer Vision & Database + Full-Stack & Farmer Utility)

- **Column 1 — CV & Database Enhancements**:
  - 🚀 **Computer Vision HSV Lesion Segmentation**: OpenCV HSV color-space thresholding to calculate surface infection ratio % and exclude leaf vein artifacts.
  - 🚀 **Database ORM Integration**: PostgreSQL / SQLite ORM (SQLAlchemy) for persistent diagnostic history, multi-farm location tagging, and audit logs.

- **Column 2 — Full-Stack & Farmer Utility**:
  - 🚀 **Production React 18 + Vite Frontend**: Component-driven dashboard with interactive analytics charts and dark/light theme toggle.
  - 🚀 **Offline Progressive Web App (PWA)**: TorchScript mobile edge model execution for offline scanning in low-connectivity rural areas.
  - 🚀 **Multilingual Advisory & PDF Export**: Regional language support (Hindi/Bengali) with 1-click downloadable diagnostic PDF reports.

---

## 📍 Slide 12: References

- **Slide Title**: References
- **Layout**: Clean Academic Citation List

1. **Hughes, D., & Salathé, M. (2015)**. *An open access repository of plant leaf images for disease detection*. arXiv preprint arXiv:1511.08060.
2. **Howard, A., Sandler, M., Chu, G., Chen, L. C., Chen, B., Tan, M., ... & Le, Q. (2019)**. *Searching for MobileNetV3*. In Proceedings of the IEEE/CVF International Conference on Computer Vision (pp. 1314-1324).
3. **Paszke, A., Gross, S., Massa, F., Lerer, A., Bradbury, J., Chanan, G., ... & Chintala, S. (2019)**. *PyTorch: An imperative style, high-performance deep learning library*. Advances in Neural Information Processing Systems, 32.
4. **FastAPI Documentation (2024)**. *Asynchronous Server Gateway Interface (ASGI) Web Framework*. Retrieved from `https://fastapi.tiangolo.com/`

---

## 📍 Slide 13: Image & Dataset Sources

- **Slide Title**: Image & Dataset Sources
- **Layout**: Source Attribution List

- **PlantVillage Dataset Benchmark**:
  - URL: `https://github.com/spMohanty/PlantVillage-Dataset`
  - Attribution: HuggingFace / spMohanty Open Access Repository (54,305 annotated images).

- **Rural Agricultural Context Media**:
  - Source: `vikalpsangam.org` / `dribbble.com`
  - Usage: Non-commercial academic research illustration.
```
