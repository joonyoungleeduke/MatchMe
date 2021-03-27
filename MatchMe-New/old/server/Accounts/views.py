from django.shortcuts import render
from Accounts.serializers import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User 
from rest_framework.response import Response 
from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions 
from rest_framework import status 
from Posts.models import Comment, Post
from Posts.serializers import CommentSerializer, PostSerializer
from rest_framework.decorators import action 

class UserViewSet(viewsets.ReadOnlyModelViewSet): # main user viewset is in Profiles
    """
    'list' and 'detail' for user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer 

    @action(detail=False, method=['get'])
    def get_user_id(self, request):
        return Response(self.request.user.id, status=status.HTTP_200_OK) # might consider using NumberSerializer from Posts

    @action(detail=True, methods=['get'])
    def get_user_comments(self, request, pk=None):
        try: 
            comments = Comment.objects.all().filter(author=pk)
            serializer = CommentSerializer(comments, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def get_user_posts(self, request, pk=None):
        try: 
            posts = Post.objects.all().filter(author=pk)
            serializer = PostSerializer(posts, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer 
    permission_classes = (permissions.AllowAny,)

class LogoutView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try: 
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e: 
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)