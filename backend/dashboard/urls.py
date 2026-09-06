from django.urls import path
from .views import AdminDashboardView
from .views import UserDashboardView

urlpatterns = [
    path("admin/", AdminDashboardView.as_view()),
     path(
        "user/dashboard/",
        UserDashboardView.as_view()
    ),

]