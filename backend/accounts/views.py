from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from django.core.mail import send_mail
from django.conf import settings
from notifications.models import Notification

from .models import User, Salary

from .serializers import (
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    CreateStaffSerializer,
    SalarySerializer,
)

# ==========================
# Register API
# ==========================



class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer


    def perform_create(self, serializer):

        user = serializer.save()


        send_mail(

            subject="🎉 Welcome to EcoSmart",

            message=f"""
Hello {user.first_name or user.username},

Welcome to EcoSmart 🌱

Your EcoSmart account has been created successfully.

===========================
Login Details
===========================

Username : {user.username}
Email    : {user.email}
Role     : {user.role}

Thank you for joining EcoSmart.

Regards,
EcoSmart Team
""",

            from_email=settings.DEFAULT_FROM_EMAIL,

            recipient_list=[user.email],

            fail_silently=False

        )


# ==========================
# Login API
# ==========================

class LoginView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer





# ==========================
# Profile API
# ==========================




# ==========================
# Dashboard Stats
# ==========================

class DashboardStatsView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):

        return Response({

            "total_users":
            User.objects.filter(
                role=User.CITIZEN
            ).count(),


            "total_staff":
            User.objects.filter(
                role=User.WORKER
            ).count(),


            "total_admin":
            User.objects.filter(
                role=User.ADMIN
            ).count(),


            "total_accounts":
            User.objects.count()

        })






# ==========================
# User List
# ==========================

class UserListView(generics.ListAPIView):

    permission_classes = [IsAuthenticated]

    serializer_class = RegisterSerializer


    def get_queryset(self):

        return User.objects.filter(
            role=User.CITIZEN
        ).order_by("-date_joined")







# ==========================
# Staff List
# ==========================

class StaffListView(generics.ListAPIView):

    permission_classes = [IsAuthenticated]

    serializer_class = CreateStaffSerializer


    def get_queryset(self):

        return User.objects.filter(
            role=User.WORKER
        ).order_by("-date_joined")








# ==========================
# Create Staff
# ==========================

# ==========================
# Create Staff + Notification
# ==========================


class CreateStaffView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = CreateStaffSerializer


    permission_classes = [IsAuthenticated]



    def perform_create(self, serializer):


        # Create Staff
        staff = serializer.save()



        # Notify Admin

        Notification.objects.create(

            user=self.request.user,

            title="New Staff Added",

            message=f"{staff.username} joined EcoSmart as staff",

            notification_type="SYSTEM"

        )



        # Welcome Email to Staff

        send_mail(

            subject="Welcome to EcoSmart Staff 🌱",

            message=f"""

Hello {staff.first_name or staff.username},


Welcome to EcoSmart Team.


Your staff account has been created successfully.


Username:
{staff.username}


Role:
{staff.role}



Regards,

EcoSmart Team

""",

            from_email=settings.DEFAULT_FROM_EMAIL,

            recipient_list=[
                staff.email
            ],

            fail_silently=True

        )




# ==========================
# Delete User
# ==========================

class DeleteUserView(generics.DestroyAPIView):

    queryset = User.objects.filter(
        role=User.CITIZEN
    )

    permission_classes = [IsAuthenticated]

    lookup_field = "id"



    def delete(self, request, *args, **kwargs):

        user = self.get_object()

        user.delete()


        return Response({

            "message":
            "User deleted successfully"

        },

        status=status.HTTP_200_OK

        )







# ==========================
# Delete Staff
# ==========================

class DeleteStaffView(generics.DestroyAPIView):

    queryset = User.objects.filter(
        role=User.WORKER
    )

    permission_classes = [IsAuthenticated]

    lookup_field = "id"



    def delete(self, request, *args, **kwargs):

        staff = self.get_object()

        staff.delete()


        return Response({

            "message":
            "Staff deleted successfully"

        },

        status=status.HTTP_200_OK

        )









# ==========================
# Update Staff + Email
# ==========================

class UpdateStaffView(generics.UpdateAPIView):

    queryset = User.objects.filter(
        role=User.WORKER
    )


    serializer_class = CreateStaffSerializer


    permission_classes = [IsAuthenticated]


    lookup_field = "id"



    def update(self, request, *args, **kwargs):


        response = super().update(
            request,
            *args,
            **kwargs
        )


        staff = self.get_object()



        send_mail(

            subject="EcoSmart Staff Profile Updated 🌱",


            message=f"""

Hello {staff.first_name or staff.username},


Your EcoSmart staff profile has been updated successfully.


Username:
{staff.username}


Email:
{staff.email}


Phone:
{staff.phone}


Address:
{staff.address}


Role:
{staff.role}



EcoSmart Team

""",


            from_email=settings.DEFAULT_FROM_EMAIL,


            recipient_list=[
                staff.email
            ],


            fail_silently=True

        )



        return response







# ==========================
# Update User + Email
# ==========================

class UpdateUserView(generics.UpdateAPIView):


    queryset = User.objects.filter(
        role=User.CITIZEN
    )


    serializer_class = RegisterSerializer


    permission_classes = [IsAuthenticated]


    lookup_field = "id"




    def update(self, request, *args, **kwargs):


        response = super().update(
            request,
            *args,
            **kwargs
        )



        user = self.get_object()




        send_mail(

            subject="EcoSmart Account Updated 🌱",


            message=f"""

Hello {user.first_name or user.username},


Your EcoSmart account details have been updated successfully.


Username:
{user.username}


Email:
{user.email}


Phone:
{user.phone}


Address:
{user.address}



EcoSmart Team

""",


            from_email=settings.DEFAULT_FROM_EMAIL,


            recipient_list=[
                user.email
            ],


            fail_silently=True

        )



        return response



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import EcoProfile



# ==================================
# USER REWARD SYSTEM API
# ==================================

class RewardView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):


        # Get/Create Eco Profile

        profile, created = EcoProfile.objects.get_or_create(

            user=request.user

        )



        points = profile.eco_points





        # Reward List

        rewards = [

            {

                "id":1,

                "name":"🌱 Eco Beginner",

                "required_points":0,

                "description":"Start your eco journey",

                "unlocked":True

            },


            {

                "id":2,

                "name":"🥉 Eco Explorer",

                "required_points":100,

                "description":"Complete waste scans and save environment",

                "unlocked": points >= 100

            },


            {

                "id":3,

                "name":"🥈 Green Hero",

                "required_points":250,

                "description":"Become a regular waste recycler",

                "unlocked": points >= 250

            },


            {

                "id":4,

                "name":"🥇 Eco Champion",

                "required_points":500,

                "description":"Amazing contribution towards clean city",

                "unlocked": points >= 500

            },


            {

                "id":5,

                "name":"🌍 Earth Guardian",

                "required_points":1000,

                "description":"Ultimate environmental protector",

                "unlocked": points >= 1000

            }


        ]






        # Find Next Reward


        next_reward = None


        for reward in rewards:


            if not reward["unlocked"]:


                next_reward = reward

                break







        # Progress Calculation


        if next_reward:


            progress = (

                points /

                next_reward["required_points"]

            ) * 100


            progress = round(progress,2)



        else:


            progress = 100








        return Response({


            "username":request.user.username,


            "eco_points":points,


            "badge":profile.badge,


            "total_scans":profile.total_scans,


            "progress":progress,


            "next_reward":next_reward,


            "rewards":rewards


        })    


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import User, EcoProfile



# ==================================
# USER PROFILE API
# ==================================

class ProfileView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):

        user = request.user


        profile, created = EcoProfile.objects.get_or_create(
            user=user
        )


        return Response({

            "id": user.id,

            "username": user.username,

            "email": user.email,

            "first_name": user.first_name,

            "last_name": user.last_name,

            "phone": user.phone,

            "address": user.address,

            "profile_image": (

                request.build_absolute_uri(
                    user.profile_image.url
                )

                if user.profile_image

                else None

            ),


            "role": user.role,


            "eco_points": profile.eco_points,

            "total_scans": profile.total_scans,

            "badge": profile.badge


        })





    def put(self, request):

        user = request.user


        user.first_name = request.data.get(
            "first_name",
            user.first_name
        )


        user.last_name = request.data.get(
            "last_name",
            user.last_name
        )


        user.phone = request.data.get(
            "phone",
            user.phone
        )


        user.address = request.data.get(
            "address",
            user.address
        )


        if request.FILES.get("profile_image"):

            user.profile_image = request.FILES.get(
                "profile_image"
            )


        user.save()



        return Response({

            "message":
            "Profile Updated Successfully"

        })


# ==========================================
# ADMIN SETTINGS API
# ==========================================

from .models import AdminSettings


class AdminSettingsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        settings, created = AdminSettings.objects.get_or_create(
            user=request.user
        )

        return Response({

            "email_notifications":
                settings.email_notifications,

            "task_notifications":
                settings.task_notifications,

            "system_notifications":
                settings.system_notifications,

            "dark_mode":
                settings.dark_mode,

        })


    def put(self, request):

        settings, created = AdminSettings.objects.get_or_create(
            user=request.user
        )

        settings.email_notifications = request.data.get(
            "email_notifications",
            settings.email_notifications
        )

        settings.task_notifications = request.data.get(
            "task_notifications",
            settings.task_notifications
        )

        settings.system_notifications = request.data.get(
            "system_notifications",
            settings.system_notifications
        )

        settings.dark_mode = request.data.get(
            "dark_mode",
            settings.dark_mode
        )

        settings.save()

        return Response({

            "message":
                "Admin settings updated successfully",

            "email_notifications":
                settings.email_notifications,

            "task_notifications":
                settings.task_notifications,

            "system_notifications":
                settings.system_notifications,

            "dark_mode":
                settings.dark_mode,

        })    


# ==========================================
# CHANGE PASSWORD API
# ==========================================

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


class ChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        current_password = request.data.get(
            "current_password"
        )

        new_password = request.data.get(
            "new_password"
        )

        confirm_password = request.data.get(
            "confirm_password"
        )


        # ==============================
        # REQUIRED FIELDS
        # ==============================

        if not current_password:
            return Response(
                {
                    "error": "Current password is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        if not new_password:
            return Response(
                {
                    "error": "New password is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        if not confirm_password:
            return Response(
                {
                    "error": "Confirm password is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==============================
        # CHECK CURRENT PASSWORD
        # ==============================

        if not check_password(
            current_password,
            request.user.password
        ):

            return Response(
                {
                    "error": "Current password is incorrect"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==============================
        # CHECK NEW PASSWORD
        # ==============================

        if new_password != confirm_password:

            return Response(
                {
                    "error": "New passwords do not match"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==============================
        # PASSWORD LENGTH
        # ==============================

        if len(new_password) < 8:

            return Response(
                {
                    "error":
                    "Password must be at least 8 characters"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==============================
        # SAME PASSWORD CHECK
        # ==============================

        if check_password(
            new_password,
            request.user.password
        ):

            return Response(
                {
                    "error":
                    "New password must be different from current password"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==============================
        # SAVE NEW PASSWORD
        # ==============================

        request.user.set_password(
            new_password
        )

        request.user.save()


        return Response(
            {
                "message":
                "Password changed successfully"
            },
            status=status.HTTP_200_OK
        )

# ==========================================
# ADMIN SETTINGS API
# ==========================================

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class SettingsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        # Settings default values
        settings_data = {
            "email_notifications": True,
            "task_notifications": True,
            "system_notifications": True,
            "dark_mode": False,
        }

        # If user has saved settings in session
        saved_settings = request.session.get(
            "ecosmart_settings",
            {}
        )

        settings_data.update(saved_settings)

        return Response(settings_data)


    def put(self, request):

        settings_data = {
            "email_notifications": request.data.get(
                "email_notifications",
                True
            ),

            "task_notifications": request.data.get(
                "task_notifications",
                True
            ),

            "system_notifications": request.data.get(
                "system_notifications",
                True
            ),

            "dark_mode": request.data.get(
                "dark_mode",
                False
            ),
        }

        # Save settings in user's session
        request.session["ecosmart_settings"] = settings_data

        request.session.modified = True

        return Response({
            "message": "Settings saved successfully",
            **settings_data
        })

    
# ==========================================
# STAFF SALARY API
# ==========================================

class SalaryListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        salaries = Salary.objects.select_related(
            "staff"
        ).filter(
            staff__role=User.WORKER
        ).order_by(
            "-year",
            "-id"
        )

        serializer = SalarySerializer(
            salaries,
            many=True
        )

        return Response(
            serializer.data
        )

    def post(self, request):

        serializer = SalarySerializer(
            data=request.data
        )

        if serializer.is_valid():

            salary = serializer.save()

            return Response(
                SalarySerializer(salary).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ==========================================
# SALARY DETAIL
# ==========================================

class SalaryDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):

        try:

            return Salary.objects.select_related(
                "staff"
            ).get(
                pk=pk
            )

        except Salary.DoesNotExist:

            return None

    def get(self, request, pk):

        salary = self.get_object(pk)

        if not salary:

            return Response(
                {
                    "error": "Salary record not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = SalarySerializer(
            salary
        )

        return Response(
            serializer.data
        )

    def put(self, request, pk):

        salary = self.get_object(pk)

        if not salary:

            return Response(
                {
                    "error": "Salary record not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = SalarySerializer(
            salary,
            data=request.data
        )

        if serializer.is_valid():

            salary = serializer.save()

            return Response(
                SalarySerializer(salary).data
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):

        salary = self.get_object(pk)

        if not salary:

            return Response(
                {
                    "error": "Salary record not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        salary.delete()

        return Response(
            {
                "message":
                "Salary record deleted successfully"
            },
            status=status.HTTP_200_OK
        )    

# ==========================================
# PROFILE UPDATE API
# ==========================================

class ProfileUpdateView(APIView):

    permission_classes = [IsAuthenticated]


    def patch(self, request):

        user = request.user


        print("FILES:", request.FILES)
        print("IMAGE:", request.FILES.get("profile_image"))


        # Text fields update

        user.username = request.data.get(
            "username",
            user.username
        )


        user.email = request.data.get(
            "email",
            user.email
        )


        user.phone = request.data.get(
            "phone",
            user.phone
        )


        user.address = request.data.get(
            "address",
            user.address
        )



        # Profile Image Update

        if request.FILES.get("profile_image"):

            user.profile_image = request.FILES.get(
                "profile_image"
            )



        user.save()



        return Response({

            "message":
            "Profile Updated Successfully",


            "username":
            user.username,


            "email":
            user.email,


            "phone":
            user.phone,


            "address":
            user.address,


            "profile_image":
            request.build_absolute_uri(
                user.profile_image.url
            )
            if user.profile_image
            else None,


            "role":
            user.role

        })

# ==========================================
# PROFILE VIEW
# ==========================================

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import ProfileSerializer



class ProfileView(APIView):


    permission_classes = [
        IsAuthenticated
    ]



    def get(self, request):


        serializer = ProfileSerializer(

            request.user

        )


        return Response(

            serializer.data

        )





    def patch(self, request):


        serializer = ProfileSerializer(

            request.user,

            data=request.data,

            partial=True

        )



        if serializer.is_valid():


            serializer.save()



            return Response(

                serializer.data

            )



        return Response(

            serializer.errors,

            status=400

        )

class StaffSalaryView(APIView):

    permission_classes = [
        IsAuthenticated
    ]


    def get(self, request):

        print("USER:", request.user)
        print("USER ID:", request.user.id)
        print("ROLE:", request.user.role)


        salaries = Salary.objects.filter(
            staff=request.user
        )


        print("SALARY COUNT:", salaries.count())


        serializer = SalarySerializer(
            salaries,
            many=True
        )


        return Response(serializer.data)


# ==========================================
# CHANGE PASSWORD API
# ==========================================

from django.contrib.auth.hashers import check_password

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status



class ChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]


    def post(self, request):


        print("PASSWORD DATA:", request.data)


        current_password = request.data.get(
            "current_password"
        )


        new_password = request.data.get(
            "new_password"
        )


        confirm_password = request.data.get(
            "confirm_password"
        )



        # REQUIRED CHECK

        if not current_password:

            return Response(

                {
                    "error":
                    "Current password is required"
                },

                status=status.HTTP_400_BAD_REQUEST

            )



        if not new_password:

            return Response(

                {
                    "error":
                    "New password is required"
                },

                status=status.HTTP_400_BAD_REQUEST

            )



        if not confirm_password:

            return Response(

                {
                    "error":
                    "Confirm password is required"
                },

                status=status.HTTP_400_BAD_REQUEST

            )





        # CURRENT PASSWORD CHECK


        password_match = check_password(

            current_password,

            request.user.password

        )


        print(
            "PASSWORD MATCH:",
            password_match
        )



        if not password_match:


            return Response(

                {
                    "error":
                    "Current password is incorrect"
                },

                status=status.HTTP_400_BAD_REQUEST

            )







        # NEW PASSWORD MATCH CHECK


        if new_password != confirm_password:


            return Response(

                {
                    "error":
                    "New passwords do not match"
                },

                status=status.HTTP_400_BAD_REQUEST

            )







        # PASSWORD LENGTH


        if len(new_password) < 8:


            return Response(

                {
                    "error":
                    "Password must be at least 8 characters"
                },

                status=status.HTTP_400_BAD_REQUEST

            )








        # SAME PASSWORD CHECK


        if check_password(

            new_password,

            request.user.password

        ):


            return Response(

                {
                    "error":
                    "New password must be different from current password"
                },

                status=status.HTTP_400_BAD_REQUEST

            )








        # SAVE PASSWORD


        request.user.set_password(

            new_password

        )


        request.user.save()





        return Response(

            {

                "message":
                "Password changed successfully"

            },

            status=status.HTTP_200_OK

        )    