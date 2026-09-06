from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from .models import User, Salary

# ==========================
# Register Serializer
# ==========================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=False
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
            "role"
        ]



    def validate(self, attrs):

        password = attrs.get("password")

        confirm_password = attrs.get("confirm_password")


        if password and password != confirm_password:

            raise serializers.ValidationError(
                {
                    "confirm_password":
                    "Passwords do not match."
                }
            )


        return attrs





    def create(self, validated_data):


        validated_data.pop(
            "confirm_password",
            None
        )


        # IMPORTANT
        # Password ko mail ke liye store karna hai
        password = validated_data["password"]



        user = User.objects.create_user(


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


            role=User.CITIZEN

        )




        # ==========================
        # User Welcome Email
        # ==========================

        try:


            send_mail(


                subject="Welcome to EcoSmart 🌱",



                message=f"""
Hello {user.first_name or user.username},


Welcome to EcoSmart! 🌱


Your account has been created successfully.


Login Details:


Username:
{user.username}


Password:
{password}


Role:
CITIZEN



Thank you for joining EcoSmart Team.



EcoSmart Team
""",



                from_email=settings.DEFAULT_FROM_EMAIL,


                recipient_list=[user.email],


                fail_silently=False,


            )



        except Exception as e:


            print(
                "User Email Error:",
                e
            )



        return user







# ==========================
# JWT Login Serializer
# ==========================

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







# ==========================
# Create Staff Serializer
# ==========================

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
            "role"

        ]





    def create(self, validated_data):


        password = validated_data.pop(
            "password"
        )



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


            role=User.WORKER


        )




        try:


            send_mail(


                subject="Welcome to EcoSmart Staff Team 🌱",



                message=f"""
Hello {staff.first_name or staff.username},


Welcome to EcoSmart Staff Team.


Your account has been created.


Username:
{staff.username}


Password:
{password}


Role:
WORKER



EcoSmart Team
""",



                from_email=settings.DEFAULT_FROM_EMAIL,


                recipient_list=[staff.email],


                fail_silently=False,


            )



        except Exception as e:


            print(
                "Staff Email Error:",
                e
            )



        return staff


# ==========================================
# SALARY SERIALIZER
# ==========================================

from rest_framework import serializers

from .models import User, Salary


class SalarySerializer(serializers.ModelSerializer):

    # Display staff full name
    staff_name = serializers.SerializerMethodField()

    # Display staff email
    staff_email = serializers.EmailField(
        source="staff.email",
        read_only=True
    )

    # Net salary is calculated automatically
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

    # ======================================
    # STAFF NAME
    # ======================================

    def get_staff_name(self, obj):

        staff = obj.staff

        full_name = f"{staff.first_name} {staff.last_name}".strip()

        # If first/last name is empty,
        # fallback to username

        return full_name or staff.username

    # ======================================
    # VALIDATE STAFF
    # ======================================

    def validate_staff(self, value):

        if value.role != User.WORKER:

            raise serializers.ValidationError(
                "Selected user is not a staff member."
            )

        return value


# ==========================================
# PROFILE SERIALIZER
# ==========================================

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
