from Groups.models import ActionGroup 
from Groups.serializers import GroupActionSerializer, GroupSerializer
from rest_framework import viewsets, permissions
from server.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response 
from rest_framework.decorators import action 
from rest_framework import status 
from Posts.models import Post, UserMatch 
from Posts.serializers import PostSerializer, PostSendSerializer
from django.contrib.auth.models import User 
import Posts.views 

class GroupViewSet(viewsets.ModelViewSet):
    queryset = ActionGroup.objects.all() 
    serializer_class = GroupSerializer 
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                            IsOwnerOrReadOnly]
    
    @action(detail=True, methods=['get'])
    def get_similar(self, request, pk=None):
        try: 
            theme = self.queryset.filter(pk=pk).first().theme 
            
            groups = self.queryset.filter(theme=theme).exclude(id=pk)

            serializer = GroupSerializer(groups, many=True, context={"request": request})
            

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put'])
    def remove_user(self, request, pk=None, user_id=None):
        try: 
            group = self.queryset.filter(pk=pk).first() 

            group.members.remove(user_id)

            group.save() 

            return Response({}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    
    @action(detail=True, methods=['put'])
    def add_user(self, request, pk=None, user_id=None):
        try: 
            group = self.queryset.filter(pk=pk).first()

            group.members.add(user_id)

            group.save() 

            return Response({}, status=status.HTTP_201_CREATED)


        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_REQUEST)
    
    @action(detail=True, methods=['get'])
    def total_users(self, request, pk=None):
        try:    
            group = self.queryset.filter(pk=pk).first()

            members = group.members.all() | group.admins.all() | group.mods.all()
            members = members.distinct() 

            return Response(len(members), status=status.HTTP_200_OK)
    
        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def get_actions(self, request, pk=None):
        try: 
            posts = Post.objects.all().filter(group__id=pk)
            
            return Response(len(posts), status=status.HTTP_200_OK)
        except Exception as e: 
            print(e)
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def get_matches(self, request, pk=None):
        try: 
            posts = Post.objects.all().filter(group__id=pk)

            matches = UserMatch.objects.all().filter(match_post__in=posts)

            return Response(len(matches), status=status.HTTP_200_OK)

        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    @staticmethod 
    def helper_user_groups(user_id):
        groups_members = ActionGroup.objects.all().filter(members__id=user_id)
        groups_admin = ActionGroup.objects.all().filter(admins__id=user_id)
        groups_mod = ActionGroup.objects.all().filter(mods__id=user_id)
        groups_owner = ActionGroup.objects.all().filter(owner=user_id)

        groups = groups_members | groups_admin | groups_mod | groups_owner
        groups = groups.distinct()

        print(groups)

        return groups 
    
    @action(detail=True, methods=['get'])
    def get_suggestions(self, request, pk=None): # suggestions for groups that overlap in theme + user not in 
        try: 

            preferences = Posts.views.PostViewSet.helper_profile_preferences(pk)

            groups = self.queryset.filter(theme__in=preferences)

            user_groups = self.helper_user_groups(request.user.id)

            suggestions = groups.difference(user_groups)

            serializer = self.serializer_class(suggestions, many=True, context={"request": request})

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def users_groups(self, request, pk=None): # groups that a user is in 
        try: 
            # groups_member = ActionGroup.objects.all().filter(mods__id=request.user)
            groups = self.helper_user_groups(request.user.id)

            serializer = self.serializer_class(groups, many=True, context={"request": request})
            
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def get_users(self, request, pk=None):
        try: 
            group = self.queryset.filter(pk=pk).first() 
            return Response(group.members(), status=status.HTTP_200_OK) # consider number serializer 

        except Exception as e:
            print(e) 
            return Response({}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def perform_action(self, request, pk=None):
        serializer = GroupActionSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            
            group = self.queryset.filter(pk=pk)
            if not group.exists():
                return Response({}, status=status.HTTP_404_NOT_FOUND)
            group = group.first() 

            data = serializer.validated_data 
            action = data.get("action")
            
            if action == 'join':
                group.members.add(request.user)
            elif action == 'leave':
                group.members.remove(request.user)

            serializer = self.serializer_class(group)

            return Response(serializer.data, status=status.HTTP_200_OK)

        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def get_posts(self, request, pk=None):
        try: 

            posts = Post.objects.all().filter(group=pk)

            serializer = PostSendSerializer(posts, many=True, context={"request": request})

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)