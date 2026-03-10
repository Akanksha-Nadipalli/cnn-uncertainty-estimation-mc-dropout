import torch
import numpy as np

def mc_predict(model, image, passes=50):

    predictions = []

    #model.train()

    model.eval()

    for m in model.modules():
        if isinstance(m, torch.nn.Dropout):
            m.train()

    with torch.no_grad():
        for _ in range(passes):

            output = model(image)

            prob = torch.softmax(output, dim=1)

            predictions.append(prob.cpu().numpy()[0])

    predictions = np.array(predictions)

    mean = predictions.mean(axis=0)

    pred_class = mean.argmax()

    confidence = mean[pred_class]

    # Predictive entropy
    entropy = -np.sum(mean * np.log(mean + 1e-10))

    uncertainty = entropy

    return pred_class, confidence, uncertainty, predictions