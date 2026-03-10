# Uncertainty Estimation in CNN-based Image Classification

This project explores uncertainty estimation in deep learning image classification using **Monte Carlo Dropout**.

The system predicts traffic sign classes from the **GTSRB dataset** and estimates prediction confidence using **predictive entropy**.

---

## Features

- CNN-based image classification
- Uncertainty estimation using Monte Carlo Dropout
- Predictive entropy calculation
- FastAPI backend for model inference
- React frontend for image upload and prediction visualization

---

## Tech Stack

Frontend:
- React.js

Backend:
- FastAPI
- PyTorch

Libraries:
- Torchvision
- NumPy
- Matplotlib

Dataset:
- GTSRB (German Traffic Sign Recognition Benchmark)

---

## Project Architecture

User Upload Image → React Frontend → FastAPI Backend → CNN Model → Monte Carlo Dropout Predictions → Predictive Entropy → Result Display

---

## Results

The system outputs:

- Predicted traffic sign class
- Prediction confidence
- Predictive entropy score

Higher entropy indicates higher model uncertainty.

---
