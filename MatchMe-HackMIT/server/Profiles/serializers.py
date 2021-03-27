from rest_framework import serializers 
from Profiles.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Profile 
        fields = ['id', 'user',  'bio', 'image', 'ind_matches', 'total_matches']