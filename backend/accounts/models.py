
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ADMIN = "ADMIN"
    WORKER = "WORKER"
    CITIZEN = "CITIZEN"

    ROLE_CHOICES = (
        (ADMIN, "Admin"),
        (WORKER, "Worker"),
        (CITIZEN, "Citizen"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=CITIZEN
    )

    phone = models.CharField(
        max_length=15,
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    profile_image = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.username


class EcoProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="eco_profile"
    )

    eco_points = models.IntegerField(
        default=0
    )

    total_scans = models.IntegerField(
        default=0
    )

    badge = models.CharField(
        max_length=50,
        default="Eco Beginner"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def update_badge(self):

        if self.eco_points >= 500:

            self.badge = "Eco Champion"

        elif self.eco_points >= 250:

            self.badge = "Green Hero"

        elif self.eco_points >= 100:

            self.badge = "Eco Explorer"

        else:

            self.badge = "Eco Beginner"

        self.save()

    def __str__(self):

        return f"{self.user.username} Profile"


# ==========================================
# ADMIN SETTINGS
# ==========================================

class AdminSettings(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="admin_settings"
    )

    # Notification Settings

    email_notifications = models.BooleanField(
        default=True
    )

    task_notifications = models.BooleanField(
        default=True
    )

    system_notifications = models.BooleanField(
        default=True
    )

    # Appearance

    dark_mode = models.BooleanField(
        default=False
    )

    # Created / Updated

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):

        return f"Settings - {self.user.username}"


# ==========================================
# STAFF SALARY
# ==========================================

class Salary(models.Model):

    PENDING = "PENDING"
    PAID = "PAID"

    PAYMENT_STATUS_CHOICES = (
        (PENDING, "Pending"),
        (PAID, "Paid"),
    )

    staff = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="salary_records",
        limit_choices_to={"role": User.WORKER}
    )

    month = models.CharField(
        max_length=20
    )

    profile_image = models.ImageField(
    upload_to="profile/",
    null=True,
    blank=True
)


    year = models.PositiveIntegerField()

    basic_salary = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    allowance = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    deduction = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    net_salary = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default=PENDING
    )

    payment_date = models.DateField(
        null=True,
        blank=True
    )

    notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):

        self.net_salary = (
            self.basic_salary
            + self.allowance
            - self.deduction
        )

        super().save(*args, **kwargs)

    def __str__(self):

        return (
            f"{self.staff.username} - "
            f"{self.month} {self.year}"
        )
    