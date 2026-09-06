# from django.urls import path

# from .views import (
#     DustbinListView,
#     CreateDustbinView,
#     ReportDustbinView,
#     ReportedDustbinListView,
#     DustbinLocationMapView
# )


# urlpatterns = [

#     # ==========================================
#     # LIST ACTIVE DUSTBINS
#     # ==========================================

#     path(
#         "",
#         DustbinListView.as_view(),
#         name="dustbin-list"
#     ),


#     # ==========================================
#     # ADMIN CREATE DUSTBIN
#     # ==========================================

#     path(
#         "create/",
#         CreateDustbinView.as_view(),
#         name="create-dustbin"
#     ),


#     # ==========================================
#     # REPORT DUSTBIN FULL
#     # ==========================================

#     path(
#         "<int:id>/report/",
#         ReportDustbinView.as_view(),
#         name="report-dustbin"
#     ),


#     # ==========================================
#     # ADMIN REPORTED DUSTBINS
#     # ==========================================

#     path(
#         "reported/",
#         ReportedDustbinListView.as_view(),
#         name="reported-dustbins"
#     ),




#     path(
#     "locations/",
#     DustbinLocationMapView.as_view(),
#     name="dustbin-locations"
# ),

# ]



from django.urls import path

from .views import (
    DustbinListView,
    CreateDustbinView,
    ReportDustbinView,
    ReportedDustbinListView,
    DustbinLocationMapView,
    DustbinDetailByBinIdView,
    GenerateDustbinQRView,
)

urlpatterns = [
    path(
        "",
        DustbinListView.as_view(),
        name="dustbin-list"
    ),

    path(
        "create/",
        CreateDustbinView.as_view(),
        name="create-dustbin"
    ),

    path(
        "<int:id>/report/",
        ReportDustbinView.as_view(),
        name="report-dustbin"
    ),

    path(
        "reported/",
        ReportedDustbinListView.as_view(),
        name="reported-dustbins"
    ),
   
    path(
        "locations/",
        DustbinLocationMapView.as_view(),
        name="dustbin-locations"
    ),

    path(
        "qr/<str:bin_id>/",
        DustbinDetailByBinIdView.as_view(),
        name="dustbin-by-bin-id"
    ),

    path(
        "<int:id>/generate-qr/",
        GenerateDustbinQRView.as_view(),
        name="generate-dustbin-qr"
    ),
]