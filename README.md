# 🚀 SpectraGuard X — Advanced Multi-Modal Hyperspectral & Open-Set AI Safety System

> **Industrial Food Inspection & Conveyor Safety Platform**

[![SpectraGuard X Architecture](https://img.shields.io/badge/Architecture-AI%2BPhysics%20Safety-cyan?style=for-the-badge)](https://github.com/Aravindh-coder/spectraguard-x)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)
[![Vite](https://img.shields.io/badge/Vite-6.2-indigo?style=for-the-badge)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge)](https://reactjs.org/)

---

## 🌟 Overview

**SpectraGuard X** is a next-generation industrial inspection architecture engineered for high-speed online conveyor sorting. Combining **NIR Hyperspectral Imaging (900-1700nm)**, **UV/Vis Spectrometry**, **4K Spatial RGB**, **UV Fluorescence**, and **ToF 3D Topography**, SpectraGuard X solves the fundamental limitations of single-modal visual AI.

Rather than relying blindly on black-box AI outputs, SpectraGuard X incorporates an **AI + Physics Dual Safety Layer**, an **Open-Set Anomaly Detector**, **Closed-Loop Reject Confirmation**, **Automatic White-Tile Self-Calibration**, and a **Live 2D Conveyor Digital Twin**.

---

## 🏗️ System Architecture

```
                          SPECTRAGUARD X ARCHITECTURE
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
     SENSING                           AI                        RELIABILITY
        │                              │                              │
  • NIR HSI (900-1700nm)       • Multimodal Fusion AI        • Auto Self-Calibration
  • UV/Vis (350-750nm)         • Open-Set Anomaly            • Environmental Drift Comp
  • High-Res RGB               • Uncertainty Metrics         • Window Residue Monitor
  • UV Fluorescence            • Adaptive Band Selection     • Coverage Guarantee (100%)
  • ToF 3D Topography          • Explainable AI (XAI)        • Closed-Loop Reject Confirm
  • Temp/Humidity Telemetry    • Continual Active Learning   • Sensor Health Scorecard
        │                              │                              │
        └──────────────────────────────┼──────────────────────────────┘
                                       │
                         DUAL-PATH SAFETY DECISION ENGINE
                                       │
              ┌────────────────────────┴────────────────────────┐
              │                                                 │
           AI PATH                                         PHYSICS PATH
      • Prediction                                    • Sensor Validity
      • Anomaly Score                                 • Calibration Drift
      • OOD / Uncertainty                             • Ambient Bounds (Temp/Humidity)
      • Model Disagreement                            • Encoder Sync & Illumination
              │                                                 │
              └────────────────────────┬────────────────────────┘
                                       │
                                SAFETY DECISION
                                       │
                        ┌──────────────┴──────────────┐
                        ▼                             ▼
                     [ PASS ]                    [ ISOLATE ]
                        │                             │
                  Conveyor Pass                Rejector Actuator
                        │                             │
                        │                    Confirmation Sensor
                        │                             │
                        └──────────────┬──────────────┘
                                       │
                                  TRACEABILITY
                                       │
                             LIVE DIGITAL TWIN (2D/3D)
```

---

## 🔥 Key 31 Industrial Capabilities

1. 📡 **Multi-Modal Physical Sensing** — NIR HSI + UV/Vis + RGB + UV Fluorescence + ToF 3D + Telemetry + Conveyor Encoder.
2. 🧠 **Spectral-Spatial Fusion AI** — Merges 1D spectral curves with 2D spatial pixel maps.
3. ⚠️ **Open-Set Unknown Detection** — Classifies samples as `NORMAL`, `KNOWN ANOMALY`, `UNKNOWN ANOMALY`, or `UNCERTAIN`. Triggers `⚠️ UNKNOWN ANOMALY — HUMAN/LAB VERIFICATION REQUIRED` on OOD samples.
4. 📐 **Uncertainty-Aware AI Engine** — Computes 7 core confidence, anomaly, SNR, and Mahalanobis metrics.
5. 🛡️ **AI + Physics Safety Layer** — Independent physics validation path overrides AI predictions if illumination or calibration conditions drift.
6. 🔬 **Automatic Self-Calibration** — Internal 99% Spectralon white tile reference checks baseline drift periodically.
7. 🌡️ **Environmental Compensation** — Real-time baseline shift correction based on ambient temp/humidity.
8. 🪟 **Optical Window Residue Monitoring** — Detects lens dust buildup and prompts `⚠️ CLEAN OPTICAL WINDOW`.
9. 💡 **Adaptive Illumination** — Modulates LED intensity to avoid specular saturation.
10. 🎯 **Adaptive Wavelength Selection** — Full 256-band vs. 4-band optimized multispectral mode.
11. ⚙️ **Encoder Conveyor Speed Sync** — Microsecond reject timing recalculation based on line speed.
12. ⏱️ **Predictive Reject Positioning** — $\text{Reject Pos} = \text{Product Pos} + (v_{\text{conveyor}} \times \tau_{\text{total}})$.
13. 🔁 **Closed-Loop Reject Confirmation** — Optical verification sensor detects ejected items; triggers `🚨 REJECT FAILURE` alarm on miss.
14. 🏷️ **Inspection Coverage Guarantee** — 100% item tracking ("No Valid Scan ➔ No Safe Pass").
15. 📦 **Product Identity Tracking** — Unique Product ID (#1042) tracking along conveyor lanes.
16. 🎮 **Interactive Live Digital Twin** — 2D Canvas conveyor visualizer with real-time item click inspector.
17. 🗺️ **Contamination Risk Heatmap** — Spatial risk distribution across Zone A, B, C, D.
18. 📉 **Process Drift Analytics** — Population-level spectral shift tracking for predictive maintenance.
19. 🧬 **Batch Fingerprinting** — Spectral baseline profiles per batch (e.g. Basmati Rice, Wheat, Almonds, Meat).
20. 🔍 **Explainable AI (XAI)** — Wavelength importance curves & spatial pixel attribution.
21. 🧑‍🔬 **Human-in-the-Loop Mode** — Operator review queue for uncertain samples.
22. 🔄 **Continual Active Learning** — Controlled model retraining pipeline.
23. 🧪 **AI Red-Team & Robustness Suite** — Test launcher for 6 environmental stress vectors.
24. 🩺 **7-Subsystem Hardware Health Scorecard** — Live status matrix for all sensors.
25. 🔐 **Cybersecurity & Governance** — SHA-256 model signing & role-based access control.
26. 📱 **Automatic Traceability QR** — Generates digital inspection passport with QR code.
27. 📄 **Compliance Audit Report** — Automated batch audit summary with PDF printing.
28. 🚨 **Fail-Safe Operating States** — State machine: `NORMAL` | `WARNING` | `DEGRADED` | `INVALID INSPECTION` | `EMERGENCY STOP` | `MAINTENANCE`.
29. 🌽 **Modular Food Profiles** — Switchable profiles for Rice, Wheat, Almonds, Fruits, Meat, Snacks, Dairy.
30. ⚡ **Offline-First Edge Simulator** — <8ms local inference execution.
31. 🔌 **Industrial Protocol Integration** — MQTT payload stream, OPC-UA node tags, Modbus registers, PLC digital I/O.

---

## 🔧 Local Development Setup

```bash
# Clone repository
git clone https://github.com/Aravindh-coder/spectraguard-x.git
cd spectraguard-x

# Install dependencies
npm install

# Run dev server
npm run dev

# Build production bundle
npm run build
```

---

## 👨‍💻 Developer

**Aravindh A** — B.Tech CSE (AI), 3rd Year  
[LinkedIn](https://linkedin.com/in/aravindh-a-1290b8326) · [GitHub](https://github.com/Aravindh-coder)

---
*Powered by SpectraGuard X Safety Architecture*
