from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Notification(models.Model):

    TYPE_CHOICES = (

        ("USER", "User"),

        ("STAFF", "Staff"),

        ("TASK", "Task"),

        ("REPORT", "Report"),

        ("SCAN", "Scan"),

        ("SYSTEM", "System"),

    )


    user = models.ForeignKey(

        User,

        on_delete=models.CASCADE,

        related_name="notifications"

    )


    title = models.CharField(
        max_length=200
    )


    message = models.TextField()


    notification_type = models.CharField(

        max_length=20,

        choices=TYPE_CHOICES,

        default="SYSTEM"

    )


    is_read = models.BooleanField(
        default=False
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )



    def __str__(self):

        return self.title