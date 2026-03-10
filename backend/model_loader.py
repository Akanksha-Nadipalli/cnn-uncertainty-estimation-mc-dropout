import torch
import os
from cnn_model import CNN


def load_model():

    current_dir = os.path.dirname(__file__)
    model_path = os.path.join(current_dir, "..", "model", "model.pth")

    model = CNN(num_classes=43)

    state_dict = torch.load(model_path, map_location=torch.device("cpu"))

    model.load_state_dict(state_dict)

    model.eval()

    return model