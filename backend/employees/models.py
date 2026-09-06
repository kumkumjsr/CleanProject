from django.db import models
from django.conf import settings


class Employee(models.Model):

    DEPARTMENT_CHOICES = (

        ("Cleaning", "Cleaning"),

        ("Maintenance", "Maintenance"),

        ("Supervisor", "Supervisor"),

    )


    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )


    employee_id = models.CharField(
        max_length=50,
        unique=True
    )


    department = models.CharField(
        max_length=50,
        choices=DEPARTMENT_CHOICES,
        default="Cleaning"
    )


    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )


    is_available = models.BooleanField(
        default=True
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):

        return self.user.username