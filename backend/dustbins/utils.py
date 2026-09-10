import io

import qrcode
from django.conf import settings
from django.core.files.base import ContentFile

from .models import Dustbin


def generate_dustbin_qr(dustbin):
    """
    Generate QR code for a dustbin.

    QR contains:
    FRONTEND_URL/dustbin/BIN-XXXXXXXX
    """

    frontend_url = getattr(
    settings,
    "FRONTEND_URL",
    "https://cleanprojest.netlify.app"
).rstrip("/")

    qr_url = f"{frontend_url}/dustbin/{dustbin.bin_id}"

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )

    qr.add_data(qr_url)
    qr.make(fit=True)

    qr_image = qr.make_image()

    buffer = io.BytesIO()
    qr_image.save(buffer, format="PNG")
    buffer.seek(0)

    filename = f"{dustbin.bin_id}.png"

    dustbin.qr_code.save(
        filename,
        ContentFile(buffer.getvalue()),
        save=False
    )

    dustbin.save(update_fields=["qr_code"])

    return qr_url