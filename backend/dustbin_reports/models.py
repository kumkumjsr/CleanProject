from django.db import models

from accounts.models import User

from dustbins.models import Dustbin


class DustbinReport(models.Model):

    

    STATUS = (

    ("Pending", "Pending"),

    ("Assigned", "Assigned"),

    ("Cleaning", "Cleaning"),

    ("Completed", "Completed"),

)


    user = models.ForeignKey(

        User,

        on_delete=models.CASCADE

    )


    dustbin = models.ForeignKey(

        Dustbin,

        on_delete=models.CASCADE

    )


    description = models.TextField(
        blank=True
    )


    image = models.ImageField(

        upload_to="dustbin_reports/",

        blank=True,

        null=True

    )


    status = models.CharField(

        max_length=20,

        choices=STATUS,

        default="Pending"

    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )

    assigned_staff = models.ForeignKey(
    User,
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name="assigned_reports"
)

    before_image = models.ImageField(
    upload_to="before_cleaning/",
    blank=True,
    null=True
)

    after_image = models.ImageField(
    upload_to="after_cleaning/",
    blank=True,
    null=True
)


    def __str__(self):

        return f"{self.user.username} - {self.dustbin.name}"