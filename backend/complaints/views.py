# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated

# from .models import Complaint
# from .serializers import ComplaintSerializer



# class CreateComplaintView(APIView):

#     permission_classes = [
#         IsAuthenticated
#     ]


#     def post(self, request):

#         serializer = ComplaintSerializer(
#             data=request.data
#         )


#         if serializer.is_valid():

#             serializer.save(
#                 user=request.user
#             )


#             return Response({

#                 "message":
#                 "Complaint submitted successfully"

#             })


#         return Response(
#             serializer.errors,
#             status=400
#         )




# class MyComplaintView(APIView):

#     permission_classes=[
#         IsAuthenticated
#     ]


#     def get(self,request):

#         complaints = Complaint.objects.filter(
#             user=request.user
#         ).order_by("-created_at")


#         serializer = ComplaintSerializer(
#             complaints,
#             many=True
#         )


#         return Response(
#             serializer.data
#         )

# # ==================================
# # ADMIN VIEW ALL COMPLAINTS
# # ==================================

# class AdminComplaintListView(APIView):

#     permission_classes = [
#         IsAuthenticated
#     ]


#     def get(self, request):

#         complaints = Complaint.objects.all().order_by(
#             "-created_at"
#         )


#         serializer = ComplaintSerializer(
#             complaints,
#             many=True
#         )


#         return Response(
#             serializer.data
#         )



# # ==================================
# # ADMIN UPDATE STATUS
# # ==================================

# class UpdateComplaintStatusView(APIView):

#     permission_classes = [
#         IsAuthenticated
#     ]


#     def patch(self, request, id):

#         try:

#             complaint = Complaint.objects.get(
#                 id=id
#             )

#         except Complaint.DoesNotExist:

#             return Response(
#                 {
#                     "error":
#                     "Complaint not found"
#                 },
#                 status=404
#             )


#         complaint.status = request.data.get(
#             "status"
#         )


#         complaint.save()


#         return Response(
#             {
#                 "message":
#                 "Complaint status updated"
#             }
#         )
    



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Complaint
from .serializers import ComplaintSerializer

from dustbins.models import Dustbin


# ==================================
# CREATE COMPLAINT
# ==================================

class CreateComplaintView(APIView):

    # QR scan se complaint karne ke liye
    # login required nahi hai
    permission_classes = [AllowAny]

    def post(self, request):

        # Frontend sends "dustbin_id"
        dustbin_id = request.data.get("dustbin_id")

        # Dustbin ID required
        if not dustbin_id:

            return Response(
                {
                    "error": "Dustbin ID is required"
                },
                status=400
            )

        # Dustbin check
        try:

            dustbin = Dustbin.objects.get(
                id=dustbin_id,
                is_active=True
            )

        except Dustbin.DoesNotExist:

            return Response(
                {
                    "error": "Dustbin not found"
                },
                status=404
            )

        # Validate complaint data
        serializer = ComplaintSerializer(
            data=request.data
        )

        if serializer.is_valid():

            complaint = serializer.save(
                dustbin=dustbin,

                # Login hai to user save hoga
                # Anonymous hai to NULL
                user=(
                    request.user
                    if request.user.is_authenticated
                    else None
                ),

                # Dustbin ka address automatically save
                location=dustbin.address
            )

            return Response(
                {
                    "message": "Complaint submitted successfully",

                    "complaint_id": complaint.id,

                    "dustbin": dustbin.bin_id,

                    "dustbin_name": dustbin.name
                },
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )


# ==================================
# MY COMPLAINTS
# ==================================

class MyComplaintView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        complaints = Complaint.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = ComplaintSerializer(
            complaints,
            many=True
        )

        return Response(
            serializer.data
        )


# ==================================
# ADMIN VIEW ALL COMPLAINTS
# ==================================

class AdminComplaintListView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        complaints = Complaint.objects.all().order_by(
            "-created_at"
        )

        serializer = ComplaintSerializer(
            complaints,
            many=True
        )

        return Response(
            serializer.data
        )


# ==================================
# ADMIN UPDATE STATUS
# ==================================

class UpdateComplaintStatusView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(self, request, id):

        try:

            complaint = Complaint.objects.get(
                id=id
            )

        except Complaint.DoesNotExist:

            return Response(
                {
                    "error": "Complaint not found"
                },
                status=404
            )

        new_status = request.data.get(
            "status"
        )

        if new_status not in [
            "PENDING",
            "PROCESSING",
            "RESOLVED"
        ]:

            return Response(
                {
                    "error": "Invalid complaint status"
                },
                status=400
            )

        complaint.status = new_status

        complaint.save()

        return Response(
            {
                "message": "Complaint status updated"
            }
        )