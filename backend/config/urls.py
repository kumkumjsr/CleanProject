from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from accounts.views import LoginView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [

    path("admin/", admin.site.urls),

    path("api/accounts/", include("accounts.urls")),

    path("api/waste/", include("waste.urls")),

    path(
        "api/dashboard/",
        include("dashboard.urls")
    ),


    path(
        "api/token/",
        LoginView.as_view(),
        name="token_obtain_pair"
    ),

    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

    path(
    "api/dustbins/",
    include("dustbins.urls")
),

path(

"api/dustbin-report/",

include(

"dustbin_reports.urls"

)

),

path(
    "api/tasks/",
    include("tasks.urls")
),

path(
    "api/notifications/",
    include("notifications.urls")
),
path(
    "api/employees/",
    include("employees.urls")
),
path(
    "api/complaints/",
    include("complaints.urls")
),
]


if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )