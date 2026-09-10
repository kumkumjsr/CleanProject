from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Complaint
from .serializers import ComplaintSerializer
from dustbins.models import Dustbin


# =========================================================
# CREATE COMPLAINT
# =========================================================

class CreateComplaintView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        try:

            print("========== CREATE COMPLAINT ==========")
            print("REQUEST DATA:", request.data)
            print("REQUEST USER:", request.user)


            # Frontend se bin_id aayega
            bin_id = request.data.get("bin_id")


            # BIN ID REQUIRED
            if not bin_id:

                return Response(
                    {
                        "error": "Please select a dustbin"
                    },
                    status=400
                )


            # Find dustbin using bin_id
            try:

                dustbin = Dustbin.objects.get(
                    bin_id=bin_id,
                    is_active=True
                )

            except Dustbin.DoesNotExist:

                return Response(
                    {
                        "error":
                        "Dustbin not found or inactive",

                        "bin_id":
                        str(bin_id)
                    },
                    status=404
                )


            # Validate complaint
            serializer = ComplaintSerializer(
                data=request.data
            )


            if not serializer.is_valid():

                print(
                    "SERIALIZER ERRORS:",
                    serializer.errors
                )

                return Response(
                    serializer.errors,
                    status=400
                )


            # Save complaint
            complaint = serializer.save(

                dustbin=dustbin,

                user=(
                    request.user
                    if request.user.is_authenticated
                    else None
                ),

                location=(
                    request.data.get("location")
                    or getattr(
                        dustbin,
                        "address",
                        ""
                    )
                    or ""
                )
            )


            print(
                "COMPLAINT CREATED:",
                complaint.id
            )


            return Response(
                {
                    "message":
                    "Complaint submitted successfully",

                    "complaint_id":
                    complaint.id,

                    "dustbin":
                    dustbin.bin_id,

                    "dustbin_name":
                    dustbin.name
                },
                status=201
            )


        except Exception as e:

            print(
                "========== COMPLAINT ERROR =========="
            )

            print(
                type(e).__name__,
                str(e)
            )

            return Response(
                {
                    "error":
                    str(e),

                    "error_type":
                    type(e).__name__
                },
                status=500
            )


# =========================================================
# MY COMPLAINTS
# =========================================================

class MyComplaintView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):

        complaints = Complaint.objects.filter(
            user=request.user
        ).order_by(
            "-created_at"
        )


        serializer = ComplaintSerializer(
            complaints,
            many=True
        )


        return Response(
            serializer.data,
            status=200
        )


# =========================================================
# ADMIN - ALL COMPLAINTS
# =========================================================

class AdminComplaintListView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):

        if not (
            request.user.is_staff
            or request.user.is_superuser
        ):

            return Response(
                {
                    "error":
                    "Admin access required"
                },
                status=403
            )


        complaints = Complaint.objects.all().order_by(
            "-created_at"
        )


        serializer = ComplaintSerializer(
            complaints,
            many=True
        )


        return Response(
            serializer.data,
            status=200
        )


# =========================================================
# ADMIN - UPDATE COMPLAINT STATUS
# =========================================================

class UpdateComplaintStatusView(APIView):

    permission_classes = [IsAuthenticated]


    def patch(
        self,
        request,
        complaint_id
    ):

        if not (
            request.user.is_staff
            or request.user.is_superuser
        ):

            return Response(
                {
                    "error":
                    "Admin access required"
                },
                status=403
            )


        try:

            complaint = Complaint.objects.get(
                id=complaint_id
            )

        except Complaint.DoesNotExist:

            return Response(
                {
                    "error":
                    "Complaint not found"
                },
                status=404
            )


        status_value = request.data.get(
            "status"
        )


        valid_statuses = [

            "PENDING",

            "PROCESSING",

            "RESOLVED"

        ]


        if status_value not in valid_statuses:

            return Response(
                {
                    "error":
                    "Invalid status",

                    "valid_statuses":
                    valid_statuses
                },
                status=400
            )


        complaint.status = status_value

        complaint.save()


        return Response(
            {
                "message":
                "Complaint status updated successfully",

                "complaint_id":
                complaint.id,

                "status":
                complaint.status
            },
            status=200
        )