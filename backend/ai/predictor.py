import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os


# Model path
MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "models",
    "smart_recycling_model1.pth"
)


# Model classes (6 classes)
CLASSES = [
    "Plastic",
    "Paper",
    "Glass",
    "Metal",
    "Organic",
    "Other"
]


# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])


# Load trained model
def load_model():

    # Your model is ResNet50
    model = models.resnet50(weights=None)

    # Last layer according to 6 classes
    model.fc = nn.Linear(
        model.fc.in_features,
        len(CLASSES)
    )

    checkpoint = torch.load(
        MODEL_PATH,
        map_location=torch.device("cpu")
    )

    model.load_state_dict(checkpoint)

    model.eval()

    return model


# Load model once
model = load_model()


# Prediction function
def predict_waste(image):

    try:

        # Open image
        if isinstance(image, str):
            image = Image.open(image)
        else:
            image = Image.open(image)

        image = image.convert("RGB")


        # Transform image
        image_tensor = transform(image)
        image_tensor = image_tensor.unsqueeze(0)


        # Prediction
        with torch.no_grad():

            output = model(image_tensor)

            probabilities = torch.softmax(
                output,
                dim=1
            )

            confidence, predicted = torch.max(
                probabilities,
                1
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


    except Exception as e:

        return {
            "error": str(e)
        }



def get_recommendation(waste_type):

    data = {

        "Plastic":
            "Recycle this plastic waste properly.",

        "Paper":
            "Send paper waste for recycling.",

        "Glass":
            "Reuse or recycle glass items.",

        "Metal":
            "Collect metal waste for recycling.",

        "Organic":
            "Use organic waste for composting.",

        "Other":
            "Dispose this waste properly."
    }


    return data.get(
        waste_type,
        "Dispose waste properly."
    )