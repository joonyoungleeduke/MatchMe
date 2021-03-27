from Profiles.models import Profile 
from Profiles.serializers import ProfileSerializer 
from rest_framework import viewsets, permissions
from server.permissions import IsOwnerOrReadOnly
from rest_framework import status 

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                            IsOwnerOrReadOnly]