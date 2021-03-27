from Groups.models import ActionGroup
from rest_framework import serializers 
from django.conf import settings 

GROUP_ACTIONS = settings.GROUP_ACTIONS 

class GroupActionSerializer(serializers.Serializer):
    action = serializers.CharField() 

    def validate_action(self, value):
        if not isinstance(value, str):
            return serializers.ValidationError("Action must be given in string.")
        value = value.lower().strip()
        if not value in GROUP_ACTIONS: 
            raise serializers.ValidationError("Not a valid action.")
        return value 
    
    def get_members(self, obj):
        return obj.members.count()

class GroupSerializer(serializers.ModelSerializer):

    closed = serializers.BooleanField(required=False)
    image = serializers.ImageField(required=False)

    class Meta: 
        model = ActionGroup 
        fields = ['id', 'name', 'description', 'closed', 'image', 'theme']
    