from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model

from tasks.models import Task


User = get_user_model()


class GlobalSearchView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):

        query = request.GET.get("q","")


        results = []


        users = User.objects.filter(
            username__icontains=query
        )


        for user in users:

            results.append({
                "id": user.id,
                "title": user.username,
                "type": "USER"
            })



        tasks = Task.objects.filter(
            title__icontains=query
        )


        for task in tasks:

            results.append({
                "id": task.id,
                "title": task.title,
                "type": "TASK"
            })



        return Response(results)