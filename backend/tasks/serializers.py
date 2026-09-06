from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):

    # ==========================
    # IMAGE FIELDS
    # ==========================

    before_image = serializers.ImageField(
        read_only=True
    )

    after_image = serializers.ImageField(
        read_only=True
    )


    # ==========================
    # CUSTOM FIELDS
    # ==========================

    assigned_staff = serializers.SerializerMethodField()

    dustbin_name = serializers.SerializerMethodField()


    class Meta:

        model = Task

        fields = [

            # ==========================
            # TASK DETAILS
            # ==========================

            "id",

            "title",

            "description",

            "location",

            "status",


            # ==========================
            # STAFF
            # ==========================

            "assigned_to",

            "assigned_staff",


            # ==========================
            # DUSTBIN
            # ==========================

            "dustbin",

            "dustbin_name",


            # ==========================
            # BEFORE CLEANING
            # ==========================

            "before_image",

            "started_at",


            # ==========================
            # AFTER CLEANING
            # ==========================

            "after_image",

            "completion_note",

            "completed_location",

            "completed_at",


            # ==========================
            # CLEANING DURATION
            # ==========================

            "cleaning_duration",


            # ==========================
            # CREATED
            # ==========================

            "created_at",

        ]


        read_only_fields = [

            "before_image",

            "after_image",

            "started_at",

            "completed_at",

            "cleaning_duration",

            "created_at",

        ]


    # ==========================
    # STAFF DETAILS
    # ==========================

    def get_assigned_staff(self, obj):

        if obj.assigned_to:

            return {

                "id": obj.assigned_to.id,

                "username": obj.assigned_to.username,

                "first_name": obj.assigned_to.first_name,

                "last_name": obj.assigned_to.last_name,

                "email": obj.assigned_to.email,

            }

        return None


    # ==========================
    # DUSTBIN NAME
    # ==========================

    def get_dustbin_name(self, obj):

        if obj.dustbin:

            return obj.dustbin.name

        return None