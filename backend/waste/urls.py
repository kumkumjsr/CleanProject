from django.urls import path
from .views import WasteScanCreateView, WasteScanListView

urlpatterns = [
    path("scan/", WasteScanCreateView.as_view(), name="waste-scan"),
    path("history/", WasteScanListView.as_view(), name="waste-history"),
]