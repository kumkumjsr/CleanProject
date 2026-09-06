from django.contrib import admin
from .models import WasteScan


@admin.register(WasteScan)
class WasteScanAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "waste_type",
        "confidence_score",
        "created_at",
    )

    list_filter = ("waste_type", "created_at")

    search_fields = (
        "user__username",
        "waste_type",
    )