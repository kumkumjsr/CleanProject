from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated

from rest_framework import status


from .models import Notification

from .serializers import NotificationSerializer





# GET ALL NOTIFICATIONS

class NotificationListView(APIView):

    permission_classes = [
        IsAuthenticated
    ]


    def get(self, request):

        notifications = Notification.objects.filter(

            user=request.user

        ).order_by("-created_at")


        serializer = NotificationSerializer(

            notifications,

            many=True

        )


        return Response(serializer.data)







# MARK SINGLE NOTIFICATION READ

class MarkNotificationReadView(APIView):

    permission_classes = [
        IsAuthenticated
    ]


    def patch(self, request, id):

        notification = Notification.objects.get(

            id=id,

            user=request.user

        )


        notification.is_read = True

        notification.save()


        return Response({

            "message":
            "Notification marked as read"

        })







# MARK ALL READ

class MarkAllReadView(APIView):

    permission_classes = [
        IsAuthenticated
    ]


    def patch(self, request):

        Notification.objects.filter(

            user=request.user,

            is_read=False

        ).update(

            is_read=True

        )


        return Response({

            "message":
            "All notifications marked as read"

        })







# DELETE NOTIFICATION

class DeleteNotificationView(APIView):

    permission_classes = [
        IsAuthenticated
    ]


    def delete(self, request, id):

        notification = Notification.objects.get(

            id=id,

            user=request.user

        )


        notification.delete()


        return Response({

            "message":
            "Notification deleted"

        })