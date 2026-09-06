from rest_framework import serializers
from .models import WasteScan


class WasteScanSerializer(serializers.ModelSerializer):

    class Meta:

        model = WasteScan

        fields = [

            "id",

            "user",

            "image",

            "waste_type",

            "confidence_score",

            "recommendation",

            "co2_emission",

            "danger_level",

            "created_at",

        ]

        read_only_fields = [

            "id",

            "user",

            "waste_type",

            "confidence_score",

            "recommendation",

            "co2_emission",

            "danger_level",

            "created_at",

        ]