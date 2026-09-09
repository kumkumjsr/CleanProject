import os
import torch
import torch.nn as nn
from torchvision import models


# ============================================================
# PATHS
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "smart_recycling_model1.pth"
)

ONNX_PATH = os.path.join(
    BASE_DIR,
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
# CPU SETTINGS
# ============================================================

torch.set_num_threads(1)
torch.set_num_interop_threads(1)


# ============================================================
# CHECK MODEL FILE
# ============================================================

if not os.path.exists(MODEL_PATH):

    raise FileNotFoundError(
        f"\nModel file not found:\n{MODEL_PATH}\n"
    )


print("=" * 60)
print("EcoSmart AI - PyTorch to ONNX Converter")
print("=" * 60)

print(f"\nPyTorch model:")
print(MODEL_PATH)

print(f"\nOutput ONNX model:")
print(ONNX_PATH)

print("\nLoading ResNet50 architecture...")


# ============================================================
# CREATE RESNET50
# ============================================================

model = models.resnet50(weights=None)

model.fc = nn.Linear(
    model.fc.in_features,
    len(CLASSES)
)


# ============================================================
# LOAD CHECKPOINT
# ============================================================

print("Loading .pth checkpoint...")

checkpoint = torch.load(
    MODEL_PATH,
    map_location="cpu",
    weights_only=True
)


# ============================================================
# HANDLE DIFFERENT CHECKPOINT FORMATS
# ============================================================

if isinstance(checkpoint, dict):

    if "state_dict" in checkpoint:

        print("Found 'state_dict' checkpoint.")

        checkpoint = checkpoint["state_dict"]

    elif "model_state_dict" in checkpoint:

        print("Found 'model_state_dict' checkpoint.")

        checkpoint = checkpoint["model_state_dict"]


# ============================================================
# REMOVE module. PREFIX
# ============================================================

if isinstance(checkpoint, dict):

    checkpoint = {
        key.replace("module.", "", 1): value
        for key, value in checkpoint.items()
    }


# ============================================================
# LOAD WEIGHTS
# ============================================================

print("Loading model weights...")

model.load_state_dict(
    checkpoint,
    strict=True
)


# ============================================================
# EVALUATION MODE
# ============================================================

model.eval()


# ============================================================
# DISABLE GRADIENTS
# ============================================================

for parameter in model.parameters():

    parameter.requires_grad = False


print("Model loaded successfully.")


# ============================================================
# CREATE DUMMY INPUT
# ============================================================

dummy_input = torch.randn(
    1,
    3,
    224,
    224,
    dtype=torch.float32
)


# ============================================================
# EXPORT TO ONNX
# ============================================================

print("\nConverting PyTorch model to ONNX...")

torch.onnx.export(
    model,
    dummy_input,
    ONNX_PATH,

    input_names=[
        "input"
    ],

    output_names=[
        "output"
    ],

    dynamic_axes={
        "input": {
            0: "batch_size"
        },
        "output": {
            0: "batch_size"
        }
    },

    opset_version=17,

    do_constant_folding=True
)


# ============================================================
# CHECK OUTPUT
# ============================================================

if not os.path.exists(ONNX_PATH):

    raise RuntimeError(
        "ONNX conversion failed. Output file was not created."
    )


file_size = os.path.getsize(ONNX_PATH)


# ============================================================
# SUCCESS
# ============================================================

print("\n" + "=" * 60)
print("SUCCESS!")
print("=" * 60)

print("\nONNX model created successfully:")

print(ONNX_PATH)

print(
    f"\nONNX model size: "
    f"{file_size / (1024 * 1024):.2f} MB"
)

print("\nClasses:")

for index, class_name in enumerate(CLASSES):

    print(
        f"{index}: {class_name}"
    )

print("\nNext step:")
print("Use smart_recycling_model1.onnx with ONNX Runtime.")

print("=" * 60)