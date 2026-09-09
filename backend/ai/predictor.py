import os
import gc

import numpy as np
import onnxruntime as ort

from PIL import Image


# ============================================================
# MODEL PATH
# ============================================================

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "models",
    "smart_recycling_model1.onnx"
)


# ============================================================
# WASTE CLASSES
# ============================================================

CLASSES = [
    "Plastic",
    "Paper",
    "Glass",
    "Metal",
    "Organic",
    "Other"
]


# ============================================================
# IMAGE SETTINGS
# ============================================================

IMAGE_SIZE = (224, 224)

MEAN = np.array(
    [0.485, 0.456, 0.406],
    dtype=np.float32
)

STD = np.array(
    [0.229, 0.224, 0.225],
    dtype=np.float32
)


# ============================================================
# ONNX SESSION
# ============================================================

session = None


def load_model():
    global session

    if session is not None:
        return session

    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            f"ONNX model not found: {MODEL_PATH}"
        )

    print("Loading EcoSmart ONNX AI model...")

    session = ort.InferenceSession(
        MODEL_PATH,
        providers=["CPUExecutionProvider"]
    )

    print("EcoSmart ONNX AI model loaded successfully.")

    return session


# ============================================================
# IMAGE PREPROCESSING
# ============================================================

def preprocess_image(image):

    if isinstance(image, str):
        image = Image.open(image)
    else:
        image = Image.open(image)

    image = image.convert("RGB")

    image = image.resize(
        IMAGE_SIZE,
        Image.Resampling.BILINEAR
    )

    image = np.asarray(
        image,
        dtype=np.float32
    )

    # Convert 0-255 to 0-1
    image = image / 255.0

    # Normalize using ImageNet values
    image = (
        image - MEAN
    ) / STD

    # HWC -> CHW
    image = np.transpose(
        image,
        (2, 0, 1)
    )

    # Add batch dimension
    image = np.expand_dims(
        image,
        axis=0
    )

    return image.astype(np.float32)


# ============================================================
# SOFTMAX
# ============================================================

def softmax(values):

    values = values - np.max(
        values,
        axis=1,
        keepdims=True
    )

    exp_values = np.exp(values)

    return exp_values / np.sum(
        exp_values,
        axis=1,
        keepdims=True
    )


# ============================================================
# WASTE PREDICTION
# ============================================================

def predict_waste(image):

    try:

        current_session = load_model()

        image_tensor = preprocess_image(
            image
        )

        input_name = current_session.get_inputs()[0].name

        output_name = current_session.get_outputs()[0].name

        outputs = current_session.run(
            [output_name],
            {
                input_name: image_tensor
            }
        )

        output = outputs[0]

        probabilities = softmax(
            output
        )

        predicted_index = int(
            np.argmax(
                probabilities,
                axis=1
            )[0]
        )

        confidence = float(
            probabilities[0][predicted_index]
        )

        waste_type = CLASSES[
            predicted_index
        ]

        confidence_score = round(
            confidence * 100,
            2
        )

        result = {
            "waste_type": waste_type,
            "confidence_score": confidence_score,
            "recommendation": get_recommendation(
                waste_type
            )
        }

        # Cleanup
        del image_tensor
        del outputs
        del output
        del probabilities

        gc.collect()

        return result

    except Exception as e:

        print(
            f"EcoSmart AI prediction error: {e}"
        )

        gc.collect()

        return {
            "error": str(e)
        }


# ============================================================
# RECOMMENDATIONS
# ============================================================

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
            "Dispose this waste properly.",
    }

    return data.get(
        waste_type,
        "Dispose waste properly."
    )
