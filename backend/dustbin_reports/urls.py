from django.urls import path
from .views import *

urlpatterns = [

    path(
        "",
        DustbinReportCreateView.as_view()
    ),

    path(
        "history/",
        DustbinReportListView.as_view()
    ),

    path(
        "all/",
        AllReportsView.as_view()
    ),

    path(
        "<int:pk>/assign/",
        AssignStaffView.as_view()
    ),

    path(
        "staff/tasks/",
        StaffAssignedReportsView.as_view()
    ),

    path(
        "<int:pk>/start/",
        StartCleaningView.as_view()
    ),
    path(
    "<int:pk>/before-image/",
    UploadBeforeImageView.as_view()
),

path(
    "<int:pk>/complete/",
    CompleteCleaningView.as_view()
),

]