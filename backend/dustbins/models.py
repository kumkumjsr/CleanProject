# from django.db import models


# class Dustbin(models.Model):


#     TYPE_CHOICES = (

#         ("Organic", "Organic"),

#         ("Plastic", "Plastic"),

#         ("Paper", "Paper"),

#         ("Metal", "Metal"),

#         ("E-Waste", "E-Waste"),

#         ("General", "General"),

#     )


#     name = models.CharField(
#         max_length=100
#     )


#     dustbin_type = models.CharField(
#         max_length=50,
#         choices=TYPE_CHOICES
#     )


#     latitude = models.DecimalField(
#         max_digits=9,
#         decimal_places=6
#     )


#     longitude = models.DecimalField(
#         max_digits=9,
#         decimal_places=6
#     )


#     address = models.TextField()


#     is_active = models.BooleanField(
#         default=True
#     )


#     is_full = models.BooleanField(
#         default=False
#     )


#     priority_score = models.FloatField(
#         default=0.0
#     )

#     priority_level = models.CharField(
#         max_length=20,
#         default="LOW"
#     )

#     last_priority_update = models.DateTimeField(
#         null=True,
#         blank=True
#     )



#     def __str__(self):

#         return self.name
    


import uuid

from django.db import models


class Dustbin(models.Model):

    TYPE_CHOICES = (
        ("Organic", "Organic"),
        ("Plastic", "Plastic"),
        ("Paper", "Paper"),
        ("Metal", "Metal"),
        ("E-Waste", "E-Waste"),
        ("General", "General"),
    )

    name = models.CharField(
        max_length=100
    )

    dustbin_type = models.CharField(
        max_length=50,
        choices=TYPE_CHOICES
    )

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6
    )

    address = models.TextField()

    is_active = models.BooleanField(
        default=True
    )

    is_full = models.BooleanField(
        default=False
    )

    priority_score = models.FloatField(
        default=0.0
    )

    priority_level = models.CharField(
        max_length=20,
        default="LOW"
    )

    last_priority_update = models.DateTimeField(
        null=True,
        blank=True
    )

    # Unique ID for every physical dustbin
    bin_id = models.CharField(
        max_length=20,
        unique=True,
        editable=False,
        blank=True
    )

    # QR code image
    qr_code = models.ImageField(
        upload_to="dustbin_qr/",
        blank=True,
        null=True
    )

    def save(self, *args, **kwargs):

        if not self.bin_id:
            self.bin_id = f"BIN-{uuid.uuid4().hex[:8].upper()}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.bin_id})"