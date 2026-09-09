import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os


MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "models",
    "smart_recycling_model1.pth"
)

CLASSES = [
    "Plastic",
    "Paper",
    "Glass",
    "Metal",
    "Organic",
    "Other"
]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])

model = None


def load_model():
    global model

    if model is not None:
        return model

    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            f"Model file not found: {MODEL_PATH}"
        )

    model = models.resnet50(weights=None)

    model.fc = nn.Linear(
        model.fc.in_features,
        len(CLASSES)
    )

    checkpoint = torch.load(
        MODEL_PATH,
        map_location=torch.device("cpu")
    )

    # Handle checkpoints saved in different formats
    if isinstance(checkpoint, dict) and "state_dict" in checkpoint:
        checkpoint = checkpoint["state_dict"]

    # Remove "module." prefix if model was trained using DataParallel
    checkpoint = {
        key.replace("module.", "", 1): value
        for key, value in checkpoint.items()
    }

    model.load_state_dict(checkpoint, strict=True)
    model.eval()

    return model


def predict_waste(image):
    current_model = load_model()

    if isinstance(image, str):
        image = Image.open(image)
    else:
        image = Image.open(image)

    image = image.convert("RGB")

    image_tensor = transform(image)
    image_tensor = image_tensor.unsqueeze(0)

    with torch.no_grad():
        output = current_model(image_tensor)
        probabilities = torch.softmax(output, dim=1)

        confidence, predicted = torch.max(
            probabilities,
            dim=1
        )

    waste_type = CLASSES[predicted.item()]

    confidence_score = round(
        confidence.item() * 100,
        2
    )

    return {
        "waste_type": waste_type,
        "confidence_score": confidence_score,
        "recommendation": get_recommendation(waste_type)
    }


def get_recommendation(waste_type):

    data = {
        "Plastic": "Recycle this plastic waste properly.",
        "Paper": "Send paper waste for recycling.",
        "Glass": "Reuse or recycle glass items.",
        "Metal": "Collect metal waste for recycling.",
        "Organic": "Use organic waste for composting.",
        "Other": "Dispose this waste properly.",
    }

    return data.get(
        waste_type,
        "Dispose waste properly."
    )
