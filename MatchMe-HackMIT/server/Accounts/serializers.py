from django.contrib.auth import authenticate 
from django.contrib.auth.models import User 
from rest_framework import serializers 
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User 
        fields = ['url', 'id', 'username', 'email', 'first_name', 'last_name', 'groups', 'profile']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User 
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'first_name': {
                'required': True,
            },
            'last_name': {
                'required': True,
            },
            'email': {
                'required': True,
            },
        }
        # validators = [
        #     UniqueValidator(
        #         queryset=User.objects.all(),
        #     )
        # ]
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user 
