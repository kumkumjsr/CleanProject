from django.urls import path


from .views import (

    NotificationListView,

    MarkNotificationReadView,

    MarkAllReadView,

    DeleteNotificationView,

)



urlpatterns = [


    path(

        "",

        NotificationListView.as_view()

    ),



    path(

        "<int:id>/read/",

        MarkNotificationReadView.as_view()

    ),



    path(

        "read-all/",

        MarkAllReadView.as_view()

    ),



    path(

        "<int:id>/delete/",

        DeleteNotificationView.as_view()

    ),


]