# from rest_framework import serializers

# from .models import Dustbin



# class DustbinSerializer(serializers.ModelSerializer):

#     class Meta:

#         model = Dustbin

#         fields = "__all__"



from rest_framework import serializers

from .models import Dustbin


class DustbinSerializer(serializers.ModelSerializer):

    qr_code_url = serializers.SerializerMethodField()

    class Meta:
        model = Dustbin

        fields = [
            "id",
            "name",
            "dustbin_type",
            "latitude",
            "longitude",
            "address",
            "is_active",
            "is_full",
            "priority_score",
            "priority_level",
            "last_priority_update",
            "bin_id",
            "qr_code",
            "qr_code_url",
        ]

        read_only_fields = [
            "id",
            "bin_id",
            "qr_code",
            "qr_code_url",
        ]

    def get_qr_code_url(self, obj):

        if not obj.qr_code:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(
                obj.qr_code.url
            )

        return obj.qr_code.url