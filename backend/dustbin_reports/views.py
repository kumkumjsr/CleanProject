from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import DustbinReport
from .serializer import DustbinReportSerializer

from accounts.models import User


# ==========================================
# CREATE REPORT
# ==========================================

class DustbinReportCreateView(generics.CreateAPIView):

    serializer_class = DustbinReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ==========================================
# USER REPORT HISTORY
# ==========================================

class DustbinReportListView(generics.ListAPIView):

    serializer_class = DustbinReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DustbinReport.objects.filter(
            user=self.request.user
        ).order_by("-created_at")


# ==========================================
# ADMIN ALL REPORTS
# ==========================================

class AllReportsView(generics.ListAPIView):

    serializer_class = DustbinReportSerializer
    permission_classes = [permissions.IsAdminUser]

    queryset = DustbinReport.objects.all().order_by("-created_at")


# ==========================================
# ASSIGN STAFF
# ==========================================

class AssignStaffView(APIView):

    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):

        report = DustbinReport.objects.get(id=pk)

        staff = User.objects.get(
            id=request.data["staff_id"],
            role="WORKER"
        )

        report.assigned_staff = staff
        report.status = "Assigned"
        report.save()

        return Response({
            "message": "Staff Assigned Successfully"
        })


# ==========================================
# STAFF TASKS
# ==========================================

class StaffAssignedReportsView(generics.ListAPIView):

    serializer_class = DustbinReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        return DustbinReport.objects.filter(
            assigned_staff=self.request.user
        ).order_by("-created_at")


# ==========================================
# START CLEANING
# ==========================================

class StartCleaningView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):

        report = DustbinReport.objects.get(
            id=pk,
            assigned_staff=request.user
        )

        report.status = "Cleaning"
        report.save()

        return Response({
            "message": "Cleaning Started Successfully"
        })


# ==========================================
# UPLOAD BEFORE IMAGE
# ==========================================

class UploadBeforeImageView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):

        report = DustbinReport.objects.get(
            id=pk,
            assigned_staff=request.user
        )

        image = request.FILES.get("before_image")

        if image is None:

            return Response({
                "error": "No image uploaded"
            }, status=400)

        report.before_image = image
        report.save()

        return Response({
            "message": "Before Image Uploaded Successfully",
            "image": report.before_image.url
        })

class CompleteCleaningView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):

        report = DustbinReport.objects.get(
            id=pk,
            assigned_staff=request.user
        )

        image = request.FILES.get("after_image")

        if image is None:

            return Response(
                {
                    "error": "No image uploaded"
                },
                status=400
            )

        report.after_image = image
        report.status = "Completed"

        report.save()

        return Response({

            "message": "Cleaning Completed Successfully",

            "after_image": report.after_image.url

        })
    