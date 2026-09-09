from rest_framework import generics, permissions

from .models import WasteScan
from .serializers import WasteScanSerializer

from ai.predictor import predict_waste

from accounts.models import EcoProfile


# =========================================================
# AI WASTE ANALYSIS
# =========================================================

def analyze_waste(image):

    result = predict_waste(image)

    return result


# =========================================================
# CO2 IMPACT CALCULATION
# =========================================================

def calculate_environmental_impact(
    waste_type
):

    co2_map = {

        "Plastic": 3.0,

        "Paper": 1.5,

        "Glass": 1.0,

        "Metal": 2.5,

        "Organic": 0.8,

        "E-Waste": 5.0,

        "Other": 0.5,

        "Unknown": 0.5
    }

    co2_emission = co2_map.get(
        waste_type,
        0.5
    )

    # =====================================================
    # DANGER LEVEL
    # =====================================================

    if co2_emission <= 2:

        danger_level = "LOW"

    elif co2_emission <= 5:

        danger_level = "MODERATE"

    elif co2_emission <= 10:

        danger_level = "HIGH"

    else:

        danger_level = "CRITICAL"

    return (
        co2_emission,
        danger_level
    )


# =========================================================
# CREATE WASTE SCAN
# =========================================================

class WasteScanCreateView(
    generics.CreateAPIView
):

    serializer_class = WasteScanSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def perform_create(
        self,
        serializer
    ):

        # =================================================
        # GET IMAGE
        # =================================================

        image = serializer.validated_data.get(
            "image"
        )

        if not image:

            raise ValueError(
                "Waste image is required."
            )

        # =================================================
        # AI PREDICTION
        # =================================================

        result = analyze_waste(
            image
        )

        # =================================================
        # CHECK AI ERROR
        # =================================================

        if "error" in result:

            raise ValueError(
                f"AI prediction failed: "
                f"{result['error']}"
            )

        # =================================================
        # GET AI RESULT
        # =================================================

        waste_type = result.get(
            "waste_type",
            "Other"
        )

        confidence_score = result.get(
            "confidence_score",
            0
        )

        recommendation = result.get(
            "recommendation",
            "Dispose waste properly."
        )

        # =================================================
        # CO2 + DANGER LEVEL
        # =================================================

        (
            co2_emission,
            danger_level
        ) = calculate_environmental_impact(
            waste_type
        )

        # =================================================
        # SAVE WASTE SCAN
        # =================================================

        serializer.save(

            user=self.request.user,

            waste_type=waste_type,

            confidence_score=
                confidence_score,

            recommendation=
                recommendation,

            co2_emission=
                co2_emission,

            danger_level=
                danger_level
        )

        # =================================================
        # ECO PROFILE
        # =================================================

        profile, created = (
            EcoProfile.objects.get_or_create(

                user=self.request.user
            )
        )

        # =================================================
        # ECO POINTS
        # =================================================

        points_map = {

            "Organic": 15,

            "Plastic": 10,

            "Metal": 20,

            "Paper": 10,

            "Glass": 10,

            "E-Waste": 25,

            "Other": 5,

            "Unknown": 5
        }

        earned_points = points_map.get(
            waste_type,
            5
        )

        # =================================================
        # UPDATE PROFILE
        # =================================================

        profile.eco_points += (
            earned_points
        )

        profile.total_scans += 1

        profile.update_badge()

        profile.save()


# =========================================================
# USER WASTE SCAN LIST
# =========================================================

class WasteScanListView(
    generics.ListAPIView
):

    serializer_class = WasteScanSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(
        self
    ):

        return WasteScan.objects.filter(

            user=self.request.user

        ).order_by(
            "-created_at"
        )
