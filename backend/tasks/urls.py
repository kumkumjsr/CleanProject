from django.urls import path


from .views import (

    StaffTaskListView,

    UpdateTaskStatusView,

    CompleteTaskView,

    CreateTaskView,

    StaffDashboardStatsView,

    AdminTaskListView,

    AdminTaskStatsView,

    AdminTaskDetailView,

    AdminTaskUpdateView,

    AdminTaskDeleteView,

    AdminReportView,

    StaffPerformanceReport,

    WasteCategoryReport,

    AreaWiseReport,

    StartTaskView

)



urlpatterns = [


    # STAFF TASKS

    path(
        "staff/",
        StaffTaskListView.as_view()
    ),



    path(
        "staff/stats/",
        StaffDashboardStatsView.as_view()
    ),



    path(
        "<int:id>/status/",
        UpdateTaskStatusView.as_view()
    ),



    # START CLEANING

    path(
        "start/<int:id>/",
        StartTaskView.as_view()
    ),



    # COMPLETE TASK

    path(
        "<int:id>/complete/",
        CompleteTaskView.as_view()
    ),





    # ADMIN CREATE TASK

    path(
        "create/",
        CreateTaskView.as_view()
    ),




    # ADMIN TASKS

    path(
        "admin/",
        AdminTaskListView.as_view()
    ),



    path(
        "admin/stats/",
        AdminTaskStatsView.as_view()
    ),



    path(
        "admin/<int:id>/",
        AdminTaskDetailView.as_view()
    ),



    path(
        "admin/<int:id>/update/",
        AdminTaskUpdateView.as_view()
    ),



    path(
        "admin/<int:id>/delete/",
        AdminTaskDeleteView.as_view()
    ),





    # REPORTS

    path(
        "reports/",
        AdminReportView.as_view()
    ),


    path(
        "reports/staff/",
        StaffPerformanceReport.as_view()
    ),


    path(
        "reports/waste/",
        WasteCategoryReport.as_view()
    ),


    path(
        "reports/area/",
        AreaWiseReport.as_view()
    ),


]