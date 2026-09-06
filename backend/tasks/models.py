from django.db import models
from django.utils import timezone

from accounts.models import User
from dustbins.models import Dustbin



class Task(models.Model):


    STATUS = (

        ("PENDING", "PENDING"),

        ("IN_PROGRESS", "IN_PROGRESS"),

        ("COMPLETED", "COMPLETED"),

    )



    title = models.CharField(
        max_length=200
    )



    description = models.TextField()



    assigned_to = models.ForeignKey(

        User,

        on_delete=models.CASCADE,

        related_name="tasks"

    )



    location = models.CharField(

        max_length=200

    )



    status = models.CharField(

        max_length=20,

        choices=STATUS,

        default="PENDING"

    )



    dustbin = models.ForeignKey(

        Dustbin,

        on_delete=models.CASCADE,

        null=True,

        blank=True

    )



    # =========================
    # START CLEANING DETAILS
    # =========================


    before_image = models.ImageField(

        upload_to="task_before/",

        blank=True,

        null=True

    )



    started_at = models.DateTimeField(

        blank=True,

        null=True

    )



    # =========================
    # COMPLETION DETAILS
    # =========================


    after_image = models.ImageField(

        upload_to="task_completion/",

        blank=True,

        null=True

    )



    completion_note = models.TextField(

        blank=True

    )



    completed_location = models.CharField(

        max_length=255,

        blank=True

    )



    completed_at = models.DateTimeField(

        blank=True,

        null=True

    )



    # Total cleaning time in minutes

    cleaning_duration = models.IntegerField(

        blank=True,

        null=True

    )



    created_at = models.DateTimeField(

        auto_now_add=True

    )




    # =========================
    # START TASK FUNCTION
    # =========================


    def start_task(self):

        self.status = "IN_PROGRESS"

        self.started_at = timezone.now()

        self.save()



    # =========================
    # COMPLETE TASK FUNCTION
    # =========================


    def complete(self):


        self.status = "COMPLETED"


        self.completed_at = timezone.now()



        if self.started_at:


            duration = self.completed_at - self.started_at


            self.cleaning_duration = int(

                duration.total_seconds() / 60

            )



        self.save()




    def __str__(self):

        return self.title