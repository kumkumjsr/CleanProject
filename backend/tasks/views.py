# from django.utils import timezone
# from django.db.models import Count

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import (
#     IsAuthenticated,
#     IsAdminUser
# )
# from rest_framework import generics


# from .models import Task
# from .serializers import TaskSerializer


# from accounts.models import User
# from employees.models import Employee
# from dustbins.models import Dustbin
# from waste.models import WasteScan



# # ================================
# # STAFF TASK LIST
# # ================================

# class StaffTaskListView(APIView):

#     permission_classes = [IsAuthenticated]


#     def get(self, request):

#         tasks = Task.objects.filter(
#             assigned_to=request.user
#         ).order_by("-created_at")


#         serializer = TaskSerializer(
#             tasks,
#             many=True
#         )


#         return Response(serializer.data)





# # ================================
# # START CLEANING
# # ================================

# class StartTaskView(APIView):

#     permission_classes = [IsAuthenticated]


#     def patch(self, request, id):

#         try:

#             task = Task.objects.get(
#                 id=id,
#                 assigned_to=request.user
#             )

#         except Task.DoesNotExist:

#             return Response(
#                 {
#                     "error":"Task not found"
#                 },
#                 status=404
#             )


#         task.status = "IN_PROGRESS"


#         task.started_at = timezone.now()



#         if request.FILES.get("before_image"):

#             task.before_image = request.FILES.get(
#                 "before_image"
#             )



#         task.save()



#         return Response({

#             "message":
#             "Cleaning Started Successfully",

#             "task_id":
#             task.id,

#             "status":
#             task.status,

#             "started_at":
#             task.started_at

#         })






# # ================================
# # COMPLETE TASK
# # ================================

# class CompleteTaskView(APIView):

#     permission_classes = [IsAuthenticated]


#     def patch(self, request, id):

#         try:

#             task = Task.objects.get(
#                 id=id,
#                 assigned_to=request.user
#             )


#         except Task.DoesNotExist:

#             return Response(
#                 {
#                     "error":"Task not found"
#                 },
#                 status=404
#             )



#         task.status="COMPLETED"



#         task.completion_note=request.data.get(
#             "completion_note",
#             ""
#         )



#         task.completed_location=request.data.get(
#             "completed_location",
#             ""
#         )



#         if request.FILES.get("after_image"):

#             task.after_image=request.FILES.get(
#                 "after_image"
#             )



#         task.completed_at=timezone.now()



#         if task.started_at:


#             diff = (
#                 task.completed_at -
#                 task.started_at
#             )


#             task.cleaning_duration=int(
#                 diff.total_seconds()/60
#             )



#         task.save()



#         return Response({

#             "message":
#             "Task Completed Successfully",

#             "task_id":
#             task.id,

#             "duration":
#             task.cleaning_duration,

#             "completed_at":
#             task.completed_at

#         })







# # ================================
# # ADMIN CREATE TASK
# # ================================

# class CreateTaskView(APIView):

#     permission_classes=[IsAdminUser]


#     def post(self,request):


#         dustbin_id=request.data.get(
#             "dustbin_id"
#         )


#         worker_id=request.data.get(
#             "worker_id"
#         )



#         dustbin=Dustbin.objects.get(
#             id=dustbin_id
#         )



#         employee=Employee.objects.get(
#             id=worker_id
#         )


#         worker=employee.user



#         task=Task.objects.create(

#             title="Clean Dustbin",

#             description=
#             f"Cleaning required for {dustbin.name}",

#             assigned_to=worker,

#             location=dustbin.address,

#             dustbin=dustbin

#         )



#         return Response({

#             "message":
#             "Task Assigned Successfully",

#             "task_id":
#             task.id,

#             "worker":
#             worker.username,

#             "dustbin":
#             dustbin.name

#         })







# # ================================
# # UPDATE STATUS
# # ================================

# class UpdateTaskStatusView(APIView):

#     permission_classes=[IsAuthenticated]


#     def patch(self,request,id):

#         task=Task.objects.get(
#             id=id
#         )


#         task.status=request.data.get(
#             "status",
#             task.status
#         )


#         task.save()



#         return Response({

#             "message":
#             "Task Updated Successfully"

#         })







# # ================================
# # STAFF DASHBOARD
# # ================================

# class StaffDashboardStatsView(APIView):

#     permission_classes=[IsAuthenticated]


#     def get(self,request):

#         tasks=Task.objects.filter(
#             assigned_to=request.user
#         )


#         return Response({

#             "total_tasks":
#             tasks.count(),


#             "pending_tasks":
#             tasks.filter(
#                 status="PENDING"
#             ).count(),


#             "in_progress_tasks":
#             tasks.filter(
#                 status="IN_PROGRESS"
#             ).count(),


#             "completed_tasks":
#             tasks.filter(
#                 status="COMPLETED"
#             ).count()

#         })







# # ================================
# # ADMIN TASK LIST
# # ================================

# class AdminTaskListView(generics.ListAPIView):

#     permission_classes=[IsAuthenticated]

#     queryset=Task.objects.all().order_by(
#         "-created_at"
#     )

#     serializer_class=TaskSerializer






# class AdminTaskDetailView(generics.RetrieveAPIView):

#     permission_classes=[IsAuthenticated]

#     queryset=Task.objects.all()

#     serializer_class=TaskSerializer

#     lookup_field="id"






# class AdminTaskUpdateView(generics.UpdateAPIView):

#     permission_classes=[IsAuthenticated]

#     queryset=Task.objects.all()

#     serializer_class=TaskSerializer

#     lookup_field="id"






# class AdminTaskDeleteView(generics.DestroyAPIView):

#     permission_classes=[IsAuthenticated]

#     queryset=Task.objects.all()

#     lookup_field="id"







# # ================================
# # ADMIN STATS
# # ================================

# class AdminTaskStatsView(APIView):

#     permission_classes=[IsAuthenticated]


#     def get(self,request):

#         return Response({

#             "total_tasks":
#             Task.objects.count(),

#             "pending_tasks":
#             Task.objects.filter(
#                 status="PENDING"
#             ).count(),

#             "in_progress_tasks":
#             Task.objects.filter(
#                 status="IN_PROGRESS"
#             ).count(),

#             "completed_tasks":
#             Task.objects.filter(
#                 status="COMPLETED"
#             ).count()

#         })







# # ================================
# # REPORTS
# # ================================

# class AdminReportView(APIView):

#     permission_classes=[IsAuthenticated]


#     def get(self,request):

#         return Response({

#             "total_users":
#             User.objects.filter(
#                 role="CITIZEN"
#             ).count(),

#             "total_staff":
#             User.objects.filter(
#                 role="WORKER"
#             ).count(),

#             "total_tasks":
#             Task.objects.count(),

#             "completed":
#             Task.objects.filter(
#                 status="COMPLETED"
#             ).count(),

#             "scans":
#             WasteScan.objects.count()

#         })







# class StaffPerformanceReport(APIView):

#     permission_classes=[IsAuthenticated]


#     def get(self,request):

#         data=[]


#         for staff in User.objects.filter(
#             role="WORKER"
#         ):


#             tasks=Task.objects.filter(
#                 assigned_to=staff
#             )


#             data.append({

#                 "staff":
#                 staff.username,

#                 "total":
#                 tasks.count(),

#                 "completed":
#                 tasks.filter(
#                     status="COMPLETED"
#                 ).count()

#             })


#         return Response(data)







# class WasteCategoryReport(APIView):

#     permission_classes=[IsAuthenticated]


#     def get(self,request):

#         return Response(

#             WasteScan.objects.values(
#                 "waste_type"
#             ).annotate(
#                 total=Count("id")
#             )

#         )






# class AreaWiseReport(APIView):

#     permission_classes=[IsAuthenticated]


#     def get(self,request):

#         return Response(

#             Task.objects.values(
#                 "location"
#             ).annotate(
#                 total=Count("id")
#             )

#         )





# from django.utils import timezone
# from django.db.models import Count

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import (
#     IsAuthenticated,
#     IsAdminUser
# )
# from rest_framework import generics

# from .models import Task
# from .serializers import TaskSerializer

# from accounts.models import User
# from employees.models import Employee
# from dustbins.models import Dustbin
# from waste.models import WasteScan


# # ==========================================================
# # STAFF TASK LIST
# # ==========================================================

# class StaffTaskListView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self, request):

#         tasks = Task.objects.filter(
#             assigned_to=request.user
#         ).select_related(
#             "dustbin"
#         ).order_by(
#             "-created_at"
#         )

#         serializer = TaskSerializer(
#             tasks,
#             many=True
#         )

#         return Response(serializer.data)


# # ==========================================================
# # START CLEANING
# # ==========================================================

# class StartTaskView(APIView):

#     permission_classes = [IsAuthenticated]

#     def patch(self, request, id):

#         try:

#             task = Task.objects.get(
#                 id=id,
#                 assigned_to=request.user
#             )

#         except Task.DoesNotExist:

#             return Response(
#                 {
#                     "error": "Task not found"
#                 },
#                 status=404
#             )

#         task.status = "IN_PROGRESS"

#         task.started_at = timezone.now()

#         if request.FILES.get("before_image"):

#             task.before_image = request.FILES.get(
#                 "before_image"
#             )

#         task.save()

#         return Response(
#             {
#                 "message":
#                     "Cleaning Started Successfully",

#                 "task_id":
#                     task.id,

#                 "status":
#                     task.status,

#                 "started_at":
#                     task.started_at
#             }
#         )


# # ==========================================================
# # COMPLETE TASK
# # ==========================================================

# class CompleteTaskView(APIView):

#     permission_classes = [IsAuthenticated]

#     def patch(self, request, id):

#         try:

#             task = Task.objects.get(
#                 id=id,
#                 assigned_to=request.user
#             )

#         except Task.DoesNotExist:

#             return Response(
#                 {
#                     "error": "Task not found"
#                 },
#                 status=404
#             )

#         task.status = "COMPLETED"

#         task.completion_note = request.data.get(
#             "completion_note",
#             ""
#         )

#         task.completed_location = request.data.get(
#             "completed_location",
#             ""
#         )

#         if request.FILES.get("after_image"):

#             task.after_image = request.FILES.get(
#                 "after_image"
#             )

#         task.completed_at = timezone.now()

#         if task.started_at:

#             diff = (
#                 task.completed_at -
#                 task.started_at
#             )

#             task.cleaning_duration = int(
#                 diff.total_seconds() / 60
#             )

#         task.save()

#         # --------------------------------------------------
#         # MAKE EMPLOYEE AVAILABLE AGAIN
#         # --------------------------------------------------

#         try:

#             employee = Employee.objects.get(
#                 user=task.assigned_to
#             )

#             employee.is_available = True

#             employee.save(
#                 update_fields=[
#                     "is_available"
#                 ]
#             )

#         except Employee.DoesNotExist:

#             pass

#         return Response(
#             {
#                 "message":
#                     "Task Completed Successfully",

#                 "task_id":
#                     task.id,

#                 "duration":
#                     task.cleaning_duration,

#                 "completed_at":
#                     task.completed_at
#             }
#         )


# # ==========================================================
# # ADMIN CREATE TASK
# # ==========================================================

# class CreateTaskView(APIView):

#     permission_classes = [IsAdminUser]

#     def post(self, request):

#         dustbin_id = request.data.get(
#             "dustbin_id"
#         )

#         worker_id = request.data.get(
#             "worker_id"
#         )

#         # --------------------------------------------------
#         # VALIDATION
#         # --------------------------------------------------

#         if not dustbin_id:

#             return Response(
#                 {
#                     "error":
#                         "Dustbin is required"
#                 },
#                 status=400
#             )

#         if not worker_id:

#             return Response(
#                 {
#                     "error":
#                         "Staff member is required"
#                 },
#                 status=400
#             )

#         # --------------------------------------------------
#         # GET DUSTBIN
#         # --------------------------------------------------

#         try:

#             dustbin = Dustbin.objects.get(
#                 id=dustbin_id
#             )

#         except Dustbin.DoesNotExist:

#             return Response(
#                 {
#                     "error":
#                         "Dustbin not found"
#                 },
#                 status=404
#             )

#         # --------------------------------------------------
#         # GET WORKER
#         # --------------------------------------------------

#         try:

#             worker = User.objects.get(
#                 id=worker_id,
#                 role="WORKER"
#             )

#         except User.DoesNotExist:

#             return Response(
#                 {
#                     "error":
#                         "Staff member not found"
#                 },
#                 status=404
#             )

#         # --------------------------------------------------
#         # EMPLOYEE RECORD
#         # --------------------------------------------------

#         try:

#             employee = Employee.objects.get(
#                 user=worker
#             )

#         except Employee.DoesNotExist:

#             employee = None

#         # --------------------------------------------------
#         # CHECK AVAILABILITY
#         # --------------------------------------------------

#         if employee:

#             if not employee.is_available:

#                 return Response(
#                     {
#                         "error":
#                             "This staff member is currently busy"
#                     },
#                     status=400
#                 )

#         # --------------------------------------------------
#         # CHECK ACTIVE TASK
#         # --------------------------------------------------

#         active_task_exists = Task.objects.filter(

#             assigned_to=worker,

#             status__in=[
#                 "PENDING",
#                 "IN_PROGRESS"
#             ]

#         ).exists()

#         if active_task_exists:

#             return Response(
#                 {
#                     "error":
#                         "This staff member already has an active task"
#                 },
#                 status=400
#             )

#         # --------------------------------------------------
#         # CREATE TASK
#         # --------------------------------------------------

#         task = Task.objects.create(

#             title="Clean Dustbin",

#             description=(
#                 f"Cleaning required for "
#                 f"{dustbin.name}"
#             ),

#             assigned_to=worker,

#             location=dustbin.address,

#             dustbin=dustbin,

#             status="PENDING"

#         )

#         # --------------------------------------------------
#         # RESET DUSTBIN REPORT
#         # --------------------------------------------------
#         # Worker successfully assigned.
#         #
#         # Dustbin database record will NOT be deleted.
#         #
#         # It will simply disappear from
#         # "Reported Full Dustbins" because
#         # is_full becomes False.

#         dustbin.is_full = False

#         dustbin.priority_score = 0

#         dustbin.priority_level = "LOW"

#         dustbin.save(
#             update_fields=[
#                 "is_full",
#                 "priority_score",
#                 "priority_level"
#             ]
#         )

#         # --------------------------------------------------
#         # MARK EMPLOYEE BUSY
#         # --------------------------------------------------

#         if employee:

#             employee.is_available = False

#             employee.save(
#                 update_fields=[
#                     "is_available"
#                 ]
#             )

#         # --------------------------------------------------
#         # GET WORKER FULL NAME
#         # --------------------------------------------------

#         full_name = (
#             f"{worker.first_name} "
#             f"{worker.last_name}"
#         ).strip()

#         if not full_name:

#             full_name = worker.username

#         # --------------------------------------------------
#         # RESPONSE
#         # --------------------------------------------------

#         return Response(
#             {
#                 "message":
#                     "Task Assigned Successfully",

#                 "task_id":
#                     task.id,

#                 "worker":
#                     full_name,

#                 "worker_username":
#                     worker.username,

#                 "worker_id":
#                     worker.id,

#                 "dustbin":
#                     dustbin.name,

#                 "dustbin_id":
#                     dustbin.id
#             },
#             status=201
#         )


# # ==========================================================
# # UPDATE TASK STATUS
# # ==========================================================

# class UpdateTaskStatusView(APIView):

#     permission_classes = [IsAuthenticated]

#     def patch(self, request, id):

#         try:

#             task = Task.objects.get(
#                 id=id
#             )

#         except Task.DoesNotExist:

#             return Response(
#                 {
#                     "error":
#                         "Task not found"
#                 },
#                 status=404
#             )

#         status = request.data.get(
#             "status"
#         )

#         if not status:

#             return Response(
#                 {
#                     "error":
#                         "Status is required"
#                 },
#                 status=400
#             )

#         allowed_statuses = [
#             "PENDING",
#             "IN_PROGRESS",
#             "COMPLETED"
#         ]

#         if status not in allowed_statuses:

#             return Response(
#                 {
#                     "error":
#                         "Invalid task status"
#                 },
#                 status=400
#             )

#         task.status = status

#         # --------------------------------------------------
#         # TIMESTAMPS
#         # --------------------------------------------------

#         if status == "IN_PROGRESS":

#             if not task.started_at:

#                 task.started_at = timezone.now()

#         elif status == "COMPLETED":

#             task.completed_at = timezone.now()

#             if task.started_at:

#                 diff = (
#                     task.completed_at -
#                     task.started_at
#                 )

#                 task.cleaning_duration = int(
#                     diff.total_seconds() / 60
#                 )

#         task.save()

#         # --------------------------------------------------
#         # COMPLETED -> STAFF AVAILABLE
#         # --------------------------------------------------

#         if status == "COMPLETED":

#             try:

#                 employee = Employee.objects.get(
#                     user=task.assigned_to
#                 )

#                 employee.is_available = True

#                 employee.save(
#                     update_fields=[
#                         "is_available"
#                     ]
#                 )

#             except Employee.DoesNotExist:

#                 pass

#         return Response(
#             {
#                 "message":
#                     "Task Updated Successfully",

#                 "status":
#                     task.status
#             }
#         )


# # ==========================================================
# # STAFF DASHBOARD
# # ==========================================================

# class StaffDashboardStatsView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self, request):

#         tasks = Task.objects.filter(
#             assigned_to=request.user
#         )

#         return Response(
#             {
#                 "total_tasks":
#                     tasks.count(),

#                 "pending_tasks":
#                     tasks.filter(
#                         status="PENDING"
#                     ).count(),

#                 "in_progress_tasks":
#                     tasks.filter(
#                         status="IN_PROGRESS"
#                     ).count(),

#                 "completed_tasks":
#                     tasks.filter(
#                         status="COMPLETED"
#                     ).count()
#             }
#         )


# # ==========================================================
# # ADMIN TASK LIST
# # ==========================================================

# class AdminTaskListView(
#     generics.ListAPIView
# ):

#     permission_classes = [
#         IsAdminUser
#     ]

#     queryset = (
#         Task.objects
#         .select_related(
#             "assigned_to",
#             "dustbin"
#         )
#         .all()
#         .order_by(
#             "-created_at"
#         )
#     )

#     serializer_class = TaskSerializer


# # ==========================================================
# # ADMIN TASK DETAIL
# # ==========================================================

# class AdminTaskDetailView(
#     generics.RetrieveAPIView
# ):

#     permission_classes = [
#         IsAdminUser
#     ]

#     queryset = (
#         Task.objects
#         .select_related(
#             "assigned_to",
#             "dustbin"
#         )
#         .all()
#     )

#     serializer_class = TaskSerializer

#     lookup_field = "id"


# # ==========================================================
# # ADMIN TASK UPDATE
# # ==========================================================

# class AdminTaskUpdateView(
#     generics.UpdateAPIView
# ):

#     permission_classes = [
#         IsAdminUser
#     ]

#     queryset = Task.objects.all()

#     serializer_class = TaskSerializer

#     lookup_field = "id"


# # ==========================================================
# # ADMIN TASK DELETE
# # ==========================================================

# class AdminTaskDeleteView(
#     generics.DestroyAPIView
# ):

#     permission_classes = [
#         IsAdminUser
#     ]

#     queryset = Task.objects.all()

#     lookup_field = "id"


# # ==========================================================
# # ADMIN TASK STATS
# # ==========================================================

# class AdminTaskStatsView(APIView):

#     permission_classes = [
#         IsAdminUser
#     ]

#     def get(self, request):

#         return Response(
#             {
#                 "total_tasks":
#                     Task.objects.count(),

#                 "pending_tasks":
#                     Task.objects.filter(
#                         status="PENDING"
#                     ).count(),

#                 "in_progress_tasks":
#                     Task.objects.filter(
#                         status="IN_PROGRESS"
#                     ).count(),

#                 "completed_tasks":
#                     Task.objects.filter(
#                         status="COMPLETED"
#                     ).count()
#             }
#         )


# # ==========================================================
# # ADMIN REPORT
# # ==========================================================

# class AdminReportView(APIView):

#     permission_classes = [
#         IsAdminUser
#     ]

#     def get(self, request):

#         return Response(
#             {
#                 "total_users":
#                     User.objects.filter(
#                         role="CITIZEN"
#                     ).count(),

#                 "total_staff":
#                     User.objects.filter(
#                         role="WORKER"
#                     ).count(),

#                 "total_tasks":
#                     Task.objects.count(),

#                 "completed":
#                     Task.objects.filter(
#                         status="COMPLETED"
#                     ).count(),

#                 "scans":
#                     WasteScan.objects.count()
#             }
#         )


# # ==========================================================
# # STAFF PERFORMANCE REPORT
# # ==========================================================

# class StaffPerformanceReport(APIView):

#     permission_classes = [
#         IsAdminUser
#     ]

#     def get(self, request):

#         data = []

#         # --------------------------------------------------
#         # GET ALL STAFF
#         # --------------------------------------------------

#         staff_users = User.objects.filter(
#             role="WORKER"
#         ).order_by(
#             "username"
#         )

#         # --------------------------------------------------
#         # CALCULATE EACH STAFF PERFORMANCE
#         # --------------------------------------------------

#         for staff in staff_users:

#             tasks = Task.objects.filter(
#                 assigned_to=staff
#             )

#             # ==============================================
#             # TASK COUNTS
#             # ==============================================

#             assigned = tasks.count()

#             completed = tasks.filter(
#                 status="COMPLETED"
#             ).count()

#             pending = tasks.filter(
#                 status="PENDING"
#             ).count()

#             in_progress = tasks.filter(
#                 status="IN_PROGRESS"
#             ).count()

#             # ==============================================
#             # COMPLETION PERCENTAGE
#             # ==============================================

#             if assigned > 0:

#                 completion_percentage = round(
#                     (completed / assigned) * 100
#                 )

#             else:

#                 completion_percentage = 0

#             # ==============================================
#             # STAFF NAME
#             # ==============================================

#             full_name = (
#                 f"{staff.first_name} "
#                 f"{staff.last_name}"
#             ).strip()

#             if not full_name:

#                 full_name = staff.username

#             # ==============================================
#             # RESPONSE
#             # ==============================================

#             data.append(
#                 {
#                     "id":
#                         staff.id,

#                     "staff":
#                         staff.username,

#                     "name":
#                         full_name,

#                     "assigned":
#                         assigned,

#                     "completed":
#                         completed,

#                     "pending":
#                         pending,

#                     "in_progress":
#                         in_progress,

#                     "completion_percentage":
#                         completion_percentage
#                 }
#             )

#         return Response(data)


# # ==========================================================
# # WASTE CATEGORY REPORT
# # ==========================================================

# class WasteCategoryReport(APIView):

#     permission_classes = [
#         IsAdminUser
#     ]

#     def get(self, request):

#         data = (
#             WasteScan.objects
#             .values(
#                 "waste_type"
#             )
#             .annotate(
#                 total=Count("id")
#             )
#             .order_by(
#                 "-total"
#             )
#         )

#         return Response(data)


# # ==========================================================
# # AREA WISE REPORT
# # ==========================================================

# class AreaWiseReport(APIView):

#     permission_classes = [
#         IsAdminUser
#     ]

#     def get(self, request):

#         data = (
#             Task.objects
#             .values(
#                 "location"
#             )
#             .annotate(
#                 total=Count("id")
#             )
#             .order_by(
#                 "-total"
#             )
#         )

#         return Response(data)







from django.utils import timezone
from django.db.models import Count

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser
)
from rest_framework import generics

from .models import Task
from .serializers import TaskSerializer

from accounts.models import User
from employees.models import Employee
from dustbins.models import Dustbin
from waste.models import WasteScan


# =========================================================
# STAFF TASK LIST
# =========================================================

class StaffTaskListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        tasks = (
            Task.objects
            .filter(
                assigned_to=request.user
            )
            .select_related("dustbin")
            .order_by("-created_at")
        )

        serializer = TaskSerializer(
            tasks,
            many=True
        )

        return Response(serializer.data)


# =========================================================
# START TASK
# =========================================================

class StartTaskView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, id):

        try:

            task = Task.objects.get(
                id=id,
                assigned_to=request.user
            )

        except Task.DoesNotExist:

            return Response(
                {
                    "error": "Task not found"
                },
                status=404
            )

        task.status = "IN_PROGRESS"
        task.started_at = timezone.now()

        if request.FILES.get("before_image"):

            task.before_image = request.FILES.get(
                "before_image"
            )

        task.save()

        return Response(
            {
                "message":
                    "Cleaning Started Successfully",

                "task_id":
                    task.id,

                "status":
                    task.status,

                "started_at":
                    task.started_at
            }
        )


# =========================================================
# COMPLETE TASK
# =========================================================

class CompleteTaskView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, id):

        try:

            task = Task.objects.get(
                id=id,
                assigned_to=request.user
            )

        except Task.DoesNotExist:

            return Response(
                {
                    "error": "Task not found"
                },
                status=404
            )

        task.status = "COMPLETED"

        task.completion_note = request.data.get(
            "completion_note",
            ""
        )

        task.completed_location = request.data.get(
            "completed_location",
            ""
        )

        if request.FILES.get("after_image"):

            task.after_image = request.FILES.get(
                "after_image"
            )

        task.completed_at = timezone.now()

        if task.started_at:

            diff = (
                task.completed_at -
                task.started_at
            )

            task.cleaning_duration = int(
                diff.total_seconds() / 60
            )

        task.save()

        return Response(
            {
                "message":
                    "Task Completed Successfully",

                "task_id":
                    task.id,

                "duration":
                    task.cleaning_duration,

                "completed_at":
                    task.completed_at
            }
        )


# =========================================================
# CREATE TASK / ASSIGN WORKER
# =========================================================

class CreateTaskView(APIView):

    permission_classes = [IsAdminUser]

    def post(self, request):

        # -------------------------------------------------
        # GET REQUEST DATA
        # -------------------------------------------------

        dustbin_id = request.data.get(
            "dustbin_id"
        )

        worker_id = request.data.get(
            "worker_id"
        )

        # -------------------------------------------------
        # CHECK DUSTBIN ID
        # -------------------------------------------------

        if not dustbin_id:

            return Response(
                {
                    "error":
                        "Dustbin is required"
                },
                status=400
            )

        # -------------------------------------------------
        # CHECK WORKER ID
        # -------------------------------------------------

        if not worker_id:

            return Response(
                {
                    "error":
                        "Staff member is required"
                },
                status=400
            )

        # -------------------------------------------------
        # FIND DUSTBIN
        # -------------------------------------------------

        try:

            dustbin = Dustbin.objects.get(
                id=dustbin_id
            )

        except Dustbin.DoesNotExist:

            return Response(
                {
                    "error":
                        "Dustbin not found",

                    "dustbin_id":
                        dustbin_id
                },
                status=404
            )

        # -------------------------------------------------
        # FIND WORKER
        # -------------------------------------------------

        try:

            worker = User.objects.get(
                id=worker_id,
                role="WORKER"
            )

        except User.DoesNotExist:

            return Response(
                {
                    "error":
                        "Staff member not found",

                    "worker_id":
                        worker_id
                },
                status=404
            )

        # -------------------------------------------------
        # EMPLOYEE RECORD
        # -------------------------------------------------

        try:

            employee = Employee.objects.get(
                user=worker
            )

        except Employee.DoesNotExist:

            employee = None

        # =================================================
        # IMPORTANT
        #
        # SAME WORKER CAN HAVE MULTIPLE TASKS
        #
        # We DO NOT check:
        #
        # employee.is_available
        #
        # active_task_exists
        #
        # So the same worker can receive:
        #
        # Task 1
        # Task 2
        # Task 3
        # Task 4
        #
        # =================================================

        # -------------------------------------------------
        # CREATE TASK
        # -------------------------------------------------

        try:

            task = Task.objects.create(

                title="Clean Dustbin",

                description=(
                    f"Cleaning required for "
                    f"{dustbin.name}"
                ),

                assigned_to=worker,

                location=dustbin.address,

                dustbin=dustbin,

                status="PENDING"
            )

        except Exception as e:

            return Response(
                {
                    "error":
                        "Task creation failed",

                    "details":
                        str(e)
                },
                status=400
            )

        # -------------------------------------------------
        # RESET DUSTBIN
        #
        # After assigning the task, the dustbin
        # is removed from Reported Full Dustbins.
        # -------------------------------------------------

        dustbin.is_full = False

        dustbin.priority_score = 0

        dustbin.priority_level = "LOW"

        dustbin.save(
            update_fields=[
                "is_full",
                "priority_score",
                "priority_level"
            ]
        )

        # -------------------------------------------------
        # WORKER FULL NAME
        # -------------------------------------------------

        full_name = (
            f"{worker.first_name} "
            f"{worker.last_name}"
        ).strip()

        if not full_name:

            full_name = worker.username

        # -------------------------------------------------
        # SUCCESS RESPONSE
        # -------------------------------------------------

        return Response(
            {
                "message":
                    "Task Assigned Successfully",

                "task_id":
                    task.id,

                "worker":
                    full_name,

                "worker_username":
                    worker.username,

                "worker_id":
                    worker.id,

                "dustbin":
                    dustbin.name,

                "dustbin_id":
                    dustbin.id
            },
            status=201
        )


# =========================================================
# UPDATE TASK STATUS
# =========================================================

class UpdateTaskStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, id):

        try:

            task = Task.objects.get(
                id=id
            )

        except Task.DoesNotExist:

            return Response(
                {
                    "error":
                        "Task not found"
                },
                status=404
            )

        new_status = request.data.get(
            "status"
        )

        if not new_status:

            return Response(
                {
                    "error":
                        "Status is required"
                },
                status=400
            )

        allowed_statuses = [
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED"
        ]

        if new_status not in allowed_statuses:

            return Response(
                {
                    "error":
                        "Invalid task status"
                },
                status=400
            )

        task.status = new_status

        # -------------------------------------------------
        # IN PROGRESS
        # -------------------------------------------------

        if new_status == "IN_PROGRESS":

            if not task.started_at:

                task.started_at = timezone.now()

        # -------------------------------------------------
        # COMPLETED
        # -------------------------------------------------

        elif new_status == "COMPLETED":

            task.completed_at = timezone.now()

            if task.started_at:

                diff = (
                    task.completed_at -
                    task.started_at
                )

                task.cleaning_duration = int(
                    diff.total_seconds() / 60
                )

        task.save()

        return Response(
            {
                "message":
                    "Task Updated Successfully",

                "status":
                    task.status
            }
        )


# =========================================================
# STAFF DASHBOARD STATS
# =========================================================

class StaffDashboardStatsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        tasks = Task.objects.filter(
            assigned_to=request.user
        )

        return Response(
            {
                "total_tasks":
                    tasks.count(),

                "pending_tasks":
                    tasks.filter(
                        status="PENDING"
                    ).count(),

                "in_progress_tasks":
                    tasks.filter(
                        status="IN_PROGRESS"
                    ).count(),

                "completed_tasks":
                    tasks.filter(
                        status="COMPLETED"
                    ).count()
            }
        )


# =========================================================
# ADMIN TASK LIST
# =========================================================

class AdminTaskListView(
    generics.ListAPIView
):

    permission_classes = [
        IsAdminUser
    ]

    queryset = (
        Task.objects
        .select_related(
            "assigned_to",
            "dustbin"
        )
        .all()
        .order_by("-created_at")
    )

    serializer_class = TaskSerializer


# =========================================================
# ADMIN TASK DETAIL
# =========================================================

class AdminTaskDetailView(
    generics.RetrieveAPIView
):

    permission_classes = [
        IsAdminUser
    ]

    queryset = (
        Task.objects
        .select_related(
            "assigned_to",
            "dustbin"
        )
        .all()
    )

    serializer_class = TaskSerializer

    lookup_field = "id"


# =========================================================
# ADMIN TASK UPDATE
# =========================================================

class AdminTaskUpdateView(
    generics.UpdateAPIView
):

    permission_classes = [
        IsAdminUser
    ]

    queryset = Task.objects.all()

    serializer_class = TaskSerializer

    lookup_field = "id"


# =========================================================
# ADMIN TASK DELETE
# =========================================================

class AdminTaskDeleteView(
    generics.DestroyAPIView
):

    permission_classes = [
        IsAdminUser
    ]

    queryset = Task.objects.all()

    lookup_field = "id"


# =========================================================
# ADMIN TASK STATS
# =========================================================

class AdminTaskStatsView(APIView):

    permission_classes = [
        IsAdminUser
    ]

    def get(self, request):

        return Response(
            {
                "total_tasks":
                    Task.objects.count(),

                "pending_tasks":
                    Task.objects.filter(
                        status="PENDING"
                    ).count(),

                "in_progress_tasks":
                    Task.objects.filter(
                        status="IN_PROGRESS"
                    ).count(),

                "completed_tasks":
                    Task.objects.filter(
                        status="COMPLETED"
                    ).count()
            }
        )


# =========================================================
# ADMIN REPORT
# =========================================================

class AdminReportView(APIView):

    permission_classes = [
        IsAdminUser
    ]

    def get(self, request):

        return Response(
            {
                "total_users":
                    User.objects.filter(
                        role="CITIZEN"
                    ).count(),

                "total_staff":
                    User.objects.filter(
                        role="WORKER"
                    ).count(),

                "total_tasks":
                    Task.objects.count(),

                "completed":
                    Task.objects.filter(
                        status="COMPLETED"
                    ).count(),

                "scans":
                    WasteScan.objects.count()
            }
        )


# =========================================================
# STAFF PERFORMANCE REPORT
# =========================================================

class StaffPerformanceReport(APIView):

    permission_classes = [
        IsAdminUser
    ]

    def get(self, request):

        data = []

        staff_users = (
            User.objects
            .filter(
                role="WORKER"
            )
            .order_by("username")
        )

        for staff in staff_users:

            tasks = Task.objects.filter(
                assigned_to=staff
            )

            assigned = tasks.count()

            completed = tasks.filter(
                status="COMPLETED"
            ).count()

            pending = tasks.filter(
                status="PENDING"
            ).count()

            in_progress = tasks.filter(
                status="IN_PROGRESS"
            ).count()

            if assigned > 0:

                completion_percentage = round(
                    (completed / assigned) * 100
                )

            else:

                completion_percentage = 0

            full_name = (
                f"{staff.first_name} "
                f"{staff.last_name}"
            ).strip()

            if not full_name:

                full_name = staff.username

            data.append(
                {
                    "id":
                        staff.id,

                    "staff":
                        staff.username,

                    "name":
                        full_name,

                    "assigned":
                        assigned,

                    "completed":
                        completed,

                    "pending":
                        pending,

                    "in_progress":
                        in_progress,

                    "completion_percentage":
                        completion_percentage
                }
            )

        return Response(data)


# =========================================================
# WASTE CATEGORY REPORT
# =========================================================

class WasteCategoryReport(APIView):

    permission_classes = [
        IsAdminUser
    ]

    def get(self, request):

        data = (
            WasteScan.objects
            .values("waste_type")
            .annotate(
                total=Count("id")
            )
            .order_by("-total")
        )

        return Response(data)


# =========================================================
# AREA WISE REPORT
# =========================================================

class AreaWiseReport(APIView):

    permission_classes = [
        IsAdminUser
    ]

    def get(self, request):

        data = (
            Task.objects
            .values("location")
            .annotate(
                total=Count("id")
            )
            .order_by("-total")
        )

        return Response(data)
