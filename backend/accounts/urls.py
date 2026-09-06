from django.urls import path

from .views import ProfileUpdateView

from .search_views import GlobalSearchView
from .views import ProfileUpdateView


from .views import (
    RegisterView,
    LoginView,
    ProfileView,
    DashboardStatsView,
    UserListView,
    StaffListView,
    CreateStaffView,
    DeleteStaffView,
    DeleteUserView,
    UpdateStaffView,
    UpdateUserView,
    RewardView,
    SettingsView,
      AdminSettingsView,
        ChangePasswordView,
        SalaryListCreateView,
SalaryDetailView,
StaffSalaryView
)





urlpatterns = [


    # ======================
    # AUTHENTICATION
    # ======================


    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),


    path(
        "login/",
        LoginView.as_view(),
        name="login"
    ),





    # ======================
    # PROFILE
    # ======================


    path(
        "profile/",
        ProfileView.as_view(),
        name="profile"
    ),





    # ======================
    # DASHBOARD
    # ======================


    path(
        "dashboard/stats/",
        DashboardStatsView.as_view(),
        name="dashboard-stats"
    ),






    # ======================
    # USER MANAGEMENT
    # ======================


    path(
        "users/",
        UserListView.as_view(),
        name="user-list"
    ),



    path(
        "users/<int:id>/update/",
        UpdateUserView.as_view(),
        name="update-user"
    ),



    path(
        "users/<int:id>/delete/",
        DeleteUserView.as_view(),
        name="delete-user"
    ),






    # ======================
    # STAFF MANAGEMENT
    # ======================


    path(
        "create-staff/",
        CreateStaffView.as_view(),
        name="create-staff"
    ),



    path(
        "staff/",
        StaffListView.as_view(),
        name="staff-list"
    ),



    path(
        "staff/<int:id>/update/",
        UpdateStaffView.as_view(),
        name="update-staff"
    ),



    path(
        "staff/<int:id>/delete/",
        DeleteStaffView.as_view(),
        name="delete-staff"
    ),






    # ======================
    # REWARDS
    # ======================


    path(
        "rewards/",
        RewardView.as_view(),
        name="rewards"
    ),






    # ======================
    # GLOBAL SEARCH
    # ======================


    path(
        "search/",
        GlobalSearchView.as_view(),
        name="global-search"
    ),

    path(
    "settings/",
    AdminSettingsView.as_view(),
    name="admin-settings"
),
path(
    "change-password/",
    ChangePasswordView.as_view(),
    name="change-password"
),
path(
    "settings/",
    SettingsView.as_view(),
    name="settings"
),
# ==========================================
# STAFF SALARY
# ==========================================

path(
    "salary/",
    SalaryListCreateView.as_view(),
    name="salary-list-create"
),

path(
    "salary/<int:pk>/",
    SalaryDetailView.as_view(),
    name="salary-detail"
),
path(
    "profile/update/",
    ProfileUpdateView.as_view(),
    name="profile-update"
),
path(
    "staff/salary/",
    StaffSalaryView.as_view()
),
]