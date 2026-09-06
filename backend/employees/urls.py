from django.urls import path
from .views import AvailableWorkersView



urlpatterns = [

    path(
        "available/",
        AvailableWorkersView.as_view(),
        name="available-workers"
    ),

]