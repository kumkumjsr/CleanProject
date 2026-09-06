from rest_framework import serializers
from .models import DustbinReport


class DustbinReportSerializer(serializers.ModelSerializer):

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    staff_name = serializers.CharField(
        source="assigned_staff.username",
        read_only=True
    )

    dustbin_location = serializers.CharField(
        source="dustbin.location",
        read_only=True
    )

    class Meta:
        model = DustbinReport
        fields = "__all__"