# from rest_framework.generics import ListAPIView, CreateAPIView
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated, IsAdminUser

# from .models import Dustbin
# from .serializers import DustbinSerializer


# # =========================================================
# # USER / GENERAL - LIST ACTIVE DUSTBINS
# # =========================================================

# class DustbinListView(ListAPIView):

#     queryset = Dustbin.objects.filter(
#         is_active=True
#     ).order_by("name")

#     serializer_class = DustbinSerializer


# # =========================================================
# # ADMIN - CREATE DUSTBIN
# # =========================================================

# class CreateDustbinView(CreateAPIView):

#     queryset = Dustbin.objects.all()

#     serializer_class = DustbinSerializer

#     permission_classes = [
#         IsAdminUser
#     ]


# # =========================================================
# # USER - REPORT DUSTBIN AS FULL
# # =========================================================

# class ReportDustbinView(APIView):

#     permission_classes = [
#         IsAuthenticated
#     ]

#     def post(self, request, id):

#         try:

#             dustbin = Dustbin.objects.get(
#                 id=id
#             )

#             dustbin.is_full = True

#             dustbin.save()

#             return Response({

#                 "message":
#                 "Dustbin reported as full successfully"

#             })

#         except Dustbin.DoesNotExist:

#             return Response({

#                 "error":
#                 "Dustbin not found"

#             }, status=404)


# # =========================================================
# # ADMIN - REPORTED / FULL DUSTBINS
# # =========================================================

# class ReportedDustbinListView(APIView):

#     permission_classes = [
#         IsAdminUser
#     ]

#     def get(self, request):

#         dustbins = Dustbin.objects.filter(
#             is_full=True
#         ).order_by("-id")

#         data = []

#         for dustbin in dustbins:

#             data.append({

#                 "id": dustbin.id,

#                 "name": dustbin.name,

#                 "type": dustbin.dustbin_type,

#                 "address": dustbin.address,

#                 "latitude": dustbin.latitude,

#                 "longitude": dustbin.longitude,

#                 "status": "FULL"

#             })

#         return Response(data)







#  # =========================================================
# # ADMIN - ALL DUSTBIN LOCATIONS FOR MAP
# # =========================================================

# class DustbinLocationMapView(APIView):

#     permission_classes = [IsAdminUser]

#     def get(self, request):

#         dustbins = Dustbin.objects.filter(
#             is_active=True
#         ).order_by("name")

#         serializer = DustbinSerializer(
#             dustbins,
#             many=True
#         )

#         return Response(serializer.data)   


from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.conf import settings

from .models import Dustbin
from .serializers import DustbinSerializer
from .utils import generate_dustbin_qr


class DustbinListView(ListAPIView):
    queryset = Dustbin.objects.filter(
        is_active=True
    ).order_by("name")

    serializer_class = DustbinSerializer


class CreateDustbinView(CreateAPIView):
    queryset = Dustbin.objects.all()
    serializer_class = DustbinSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        dustbin = serializer.save()

        # Generate QR code automatically
        generate_dustbin_qr(dustbin)



class ReportedDustbinListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        dustbins = Dustbin.objects.filter(
            is_full=True
        ).order_by("-id")

        data = []

        for dustbin in dustbins:
            data.append({
                "id": dustbin.id,
                "name": dustbin.name,
                "type": dustbin.dustbin_type,
                "address": dustbin.address,
                "latitude": dustbin.latitude,
                "longitude": dustbin.longitude,
                "status": "FULL",
                "bin_id": dustbin.bin_id,
                "qr_code": (
                    request.build_absolute_uri(
                        dustbin.qr_code.url
                    )
                    if dustbin.qr_code
                    else None
                ),
            })

        return Response(data)

class ReportDustbinView(APIView):

    # QR scan karne wala user login nahi bhi ho
    permission_classes = []

    def post(self, request, id):

        try:

            dustbin = Dustbin.objects.get(
                id=id,
                is_active=True
            )

            dustbin.is_full = True
            dustbin.priority_level = "HIGH"
            dustbin.priority_score = 100

            dustbin.save(
                update_fields=[
                    "is_full",
                    "priority_level",
                    "priority_score"
                ]
            )

            return Response({

                "message":
                "Dustbin reported as full successfully",

                "id":
                dustbin.id,

                "bin_id":
                dustbin.bin_id,

                "status":
                "FULL",

                "priority_level":
                "HIGH",

                "priority_score":
                100

            })

        except Dustbin.DoesNotExist:

            return Response({

                "error":
                "Dustbin not found"

            }, status=404)


class DustbinLocationMapView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        dustbins = Dustbin.objects.filter(
            is_active=True
        ).order_by("name")

        serializer = DustbinSerializer(
            dustbins,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)


class DustbinDetailByBinIdView(APIView):
    """
    Get dustbin details using QR/BIN ID.
    Example:
    /api/dustbins/qr/BIN-29A2DE78/
    """

    permission_classes = []

    def get(self, request, bin_id):

        try:
            dustbin = Dustbin.objects.get(
                bin_id=bin_id,
                is_active=True
            )

        except Dustbin.DoesNotExist:
            return Response({
                "error": "Dustbin not found"
            }, status=404)

        qr_url = None

        if dustbin.qr_code:
            qr_url = request.build_absolute_uri(
                dustbin.qr_code.url
            )

        return Response({
            "id": dustbin.id,
            "bin_id": dustbin.bin_id,
            "name": dustbin.name,
            "dustbin_type": dustbin.dustbin_type,
            "latitude": dustbin.latitude,
            "longitude": dustbin.longitude,
            "address": dustbin.address,
            "is_active": dustbin.is_active,
            "is_full": dustbin.is_full,
            "priority_score": dustbin.priority_score,
            "priority_level": dustbin.priority_level,
            "qr_code": qr_url,
            "status": "FULL" if dustbin.is_full else "AVAILABLE",
        })


class GenerateDustbinQRView(APIView):
    """
    Generate/re-generate QR code for an existing dustbin.
    """

    permission_classes = [IsAdminUser]

    def post(self, request, id):

        try:
            dustbin = Dustbin.objects.get(id=id)

        except Dustbin.DoesNotExist:
            return Response({
                "error": "Dustbin not found"
            }, status=404)

        qr_url = generate_dustbin_qr(dustbin)

        return Response({
            "message": "QR code generated successfully",
            "bin_id": dustbin.bin_id,
            "qr_url": qr_url,
            "qr_code": request.build_absolute_uri(
                dustbin.qr_code.url
            ),
        })