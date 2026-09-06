# from django.urls import path

# from .views import (
#     CreateComplaintView,
#     MyComplaintView,
#     AdminComplaintListView,
#     UpdateComplaintStatusView
# )



# urlpatterns = [

#     # =========================
#     # USER COMPLAINT
#     # =========================

#     path(
#         "create/",
#         CreateComplaintView.as_view(),
#         name="create-complaint"
#     ),


#     path(
#         "my/",
#         MyComplaintView.as_view(),
#         name="my-complaints"
#     ),



#     # =========================
#     # ADMIN COMPLAINT
#     # =========================

#     path(
#         "admin/",
#         AdminComplaintListView.as_view(),
#         name="admin-complaints"
#     ),


#     path(
#         "admin/<int:id>/status/",
#         UpdateComplaintStatusView.as_view(),
#         name="update-complaint-status"
#     ),

# ]




from django.urls import path

from .views import (
    CreateComplaintView,
    MyComplaintView,
    AdminComplaintListView,
    UpdateComplaintStatusView
)


urlpatterns = [

    # USER COMPLAINT

    path(
        "create/",
        CreateComplaintView.as_view(),
        name="create-complaint"
    ),

    path(
        "my/",
        MyComplaintView.as_view(),
        name="my-complaints"
    ),

    # ADMIN COMPLAINT

    path(
        "admin/",
        AdminComplaintListView.as_view(),
        name="admin-complaints"
    ),

    path(
        "admin/<int:id>/status/",
        UpdateComplaintStatusView.as_view(),
        name="update-complaint-status"
    ),
]