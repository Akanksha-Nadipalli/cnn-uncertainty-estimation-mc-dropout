from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import torch
import torch.nn.functional as F

from PIL import Image
import io

from model_loader import load_model
from preprocess import preprocess
from mc_dropout import mc_predict


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


model = load_model()


@app.get("/")
def home():
    return {"message": "Uncertainty Estimation API Running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    contents = await file.read()

    image = Image.open(io.BytesIO(contents)).convert("RGB")

    image_tensor = preprocess(image)
    

    # -------- Standard CNN --------
    model.eval()

    with torch.no_grad():
        output = model(image_tensor)
        probs = F.softmax(output, dim=1)

    standard_pred = probs.argmax().item()
    standard_conf = probs.max().item()


    # -------- Monte Carlo Dropout --------
    mc_pred, mc_conf, unc, dist = mc_predict(model, image_tensor)


    return {
        "prediction": int(standard_pred),
        "confidence": float(standard_conf),

        "mc_prediction": int(mc_pred),
        "mc_confidence": float(mc_conf),

        "uncertainty": float(unc),

        "distribution": dist.tolist()
    }
    