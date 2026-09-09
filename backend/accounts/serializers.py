
from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User, Salary


# =========================================================
# REGISTER SERIALIZER
# =========================================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=6
    )

    confirm_password = serializers.CharField(
        write_only=True,
        required=False
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "password",
            "confirm_password",
            "first_name",
            "last_name",
            "phone",
            "address",
            "role",
        ]

        read_only_fields = [
            "id",
            "role",
        ]

    def validate(self, attrs):

        password = attrs.get("password")
        confirm_password = attrs.get("confirm_password")

        # Confirm password frontend se aaye to check karo
        if confirm_password and password != confirm_password:
            raise serializers.ValidationError({
                "confirm_password": "Passwords do not match."
            })

        return attrs

    def create(self, validated_data):

        # confirm_password database mein save nahi hoga
        validated_data.pop("confirm_password", None)

        password = validated_data.pop("password")

        user = User.objects.create_user(
            username=validated_data.get("username"),
            email=validated_data.get("email"),
            password=password,
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            phone=validated_data.get("phone", ""),
            address=validated_data.get("address", ""),
            role=User.CITIZEN,
        )

        return user


# =========================================================
# JWT LOGIN SERIALIZER
# =========================================================

class CustomTokenObtainPairSerializer(
    TokenObtainPairSerializer
):

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        token["id"] = user.id
        token["username"] = user.username
        token["email"] = user.email
        token["role"] = user.role
        token["is_staff"] = user.is_staff
        token["is_superuser"] = user.is_superuser

        return token

    def validate(self, attrs):

        data = super().validate(attrs)

        data["id"] = self.user.id
        data["username"] = self.user.username
        data["email"] = self.user.email
        data["first_name"] = self.user.first_name
        data["last_name"] = self.user.last_name
        data["phone"] = self.user.phone
        data["address"] = self.user.address
        data["role"] = self.user.role

        return data


# =========================================================
# CREATE STAFF SERIALIZER
# =========================================================

class CreateStaffSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=False
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "phone",
            "address",
            "role",
        ]

        read_only_fields = [
            "id",
            "role",
        ]

    def create(self, validated_data):

        password = validated_data.pop("password")

        staff = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=password,
            first_name=validated_data.get(
                "first_name",
                ""
            ),
            last_name=validated_data.get(
                "last_name",
                ""
            ),
            phone=validated_data.get(
                "phone",
                ""
            ),
            address=validated_data.get(
                "address",
                ""
            ),
            role=User.WORKER,
        )

        # Staff welcome email
        try:

            send_mail(
                subject="Welcome to EcoSmart Staff Team 🌱",

                message=f"""
Hello {staff.first_name or staff.username},

Welcome to EcoSmart Staff Team.

Your staff account has been created successfully.

Username:
{staff.username}

Password:
{password}

Role:
WORKER

Regards,
EcoSmart Team
""",

                from_email=settings.DEFAULT_FROM_EMAIL,

                recipient_list=[
                    staff.email
                ],

                fail_silently=True,
            )

        except Exception as e:

            print(
                "Staff Email Error:",
                e
            )

        return staff


# =========================================================
# SALARY SERIALIZER
# =========================================================

class SalarySerializer(serializers.ModelSerializer):

    staff_name = serializers.SerializerMethodField()

    staff_email = serializers.EmailField(
        source="staff.email",
        read_only=True
    )

    net_salary = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:

        model = Salary

        fields = [
            "id",
            "staff",
            "staff_name",
            "staff_email",
            "month",
            "year",
            "basic_salary",
            "allowance",
            "deduction",
            "net_salary",
            "payment_status",
            "payment_date",
            "notes",
            "created_at",
            "updated_at",
        ]

    def get_staff_name(self, obj):

        staff = obj.staff

        full_name = (
            f"{staff.first_name} {staff.last_name}"
        ).strip()

        return full_name or staff.username

    def validate_staff(self, value):

        if value.role != User.WORKER:

            raise serializers.ValidationError(
                "Selected user is not a staff member."
            )

        return value


# =========================================================
# PROFILE SERIALIZER
# =========================================================

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "phone",
            "address",
            "profile_image",
        ]

        read_only_fields = [
            "username",
            "email",
        ]
