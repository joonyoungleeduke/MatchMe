from django.shortcuts import render
from Profiles.models import Profile 
import Groups.views 
from Posts.models import Post, Comment, UserHeart, UserMatch 
from Groups.models import ActionGroup
from Posts.serializers import PostSerializer, CommentSerializer, PostActionSerializer, NumberSerializer, PostSendSerializer, HeartSerializer, MatchSerializer 
from rest_framework import viewsets, permissions
from server.permissions import IsOwnerOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status 



# class HeartSerializer(serializers.ModelSerializer):
#     class Meta: 
#         model = UserHeart 
#         fields = ['author', 'post']

# class MatchSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserMatch 
#         fields = ['author', 'match_post']

class MatchViewSet(viewsets.ModelViewSet):
    queryset = UserMatch.objects.all()
    serializer_class = MatchSerializer 
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    @action(detail=True, method=['post'])
    def unmatch(self, request, post_id=None, user_id=None):
        try: 
            match = self.queryset.filter(match_post=post_id).filter(author=user_id)
            match.delete() 
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

class HeartViewSet(viewsets.ModelViewSet):
    queryset = UserHeart.objects.all()
    serializer_class = HeartSerializer 
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    @action(detail=True, method=['post'])
    def unheart(self, request, post_id=None, user_id=None):
        try: 
            heart = self.queryset.filter(post=post_id).filter(author=user_id)
            heart.delete() 
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer 
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                         IsOwnerOrReadOnly]
    
    def create(self, request):
        try: 
            data = request.data
            data['author'] = self.request.user.id
            serializer = self.serializer_class(data=data)
            serializer.is_valid(raise_exception=True) 
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e: 
            print(e)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def all_themes(self, request):
        try: 
            themes = []
            for group in ActionGroup.objects.all(): 
                themes.append(group.theme)
            
            return Response(themes, status=status.HTTP_200_OK)

        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)    

    @action(detail=False, methods=['get'])
    def popular_posts(self, request):
        try: 
            posts = Post.objects.all().filter(isMatch=True).order_by('hearts').distinct() 

            serializer = PostSendSerializer(posts, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)


        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
    
    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    @action(detail=True, methods=['get'])
    def theme_posts(self, request, theme=None):
        try:    
            print(theme)

            posts = Post.objects.all().filter( group__theme=theme ).distinct()

            serializer = PostSendSerializer(posts, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e: 

            print(e) 

            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def similar_posts(self, request, pk=None, post_id=None):
        try: 

            theme = ActionGroup.objects.all().filter(pk=pk).first().theme 
            posts = Post.objects.all().filter( group__theme = theme).distinct().exclude( id=post_id ).exclude( author=request.user.id )

            serializer = PostSendSerializer(posts, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def check_heart(self, request, pk=None, user_id=None):
        try: 
            hearts = UserHeart.objects.all().filter( author=user_id ).filter( post=pk )
            if len(hearts) > 0: 
                return Response(True, status=status.HTTP_200_OK)
            else: 
                return Response(False)
        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def check_match(self, request, pk=None, user_id=None):
        try: 
            matches = UserMatch.objects.all().filter( author=user_id ).filter( match_post=pk )
            if len(matches) > 0: 
                return Response(True, status=status.HTTP_200_OK)
            else: 
                return Response(False)
        except Exception as e: 
            print(e) 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def helper_profile_preferences(pk):
        profile = Profile.objects.all().filter(pk=pk).first()

        pref1 = profile.preference1
        pref2 = profile.preference2
        pref3 = profile.preference3

        preferences = [pref1, pref2, pref3]

        return preferences 
    
    @action(detail=True, methods=['get'])
    def get_specific_posts(self, request, pk=None, limit=None): # posts in user's groups 
        groups = Groups.views.GroupViewSet.helper_user_groups(pk)

        posts = self.queryset.filter( group__in=groups ).order_by('hearts').distinct()


        print("GREATGREAT")
        print(posts)

        serializer = PostSendSerializer(posts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def get_post_preferences(self, request, pk=None, limit=None): # post by user preferences 
        preferences = self.helper_profile_preferences(pk)

        posts = self.queryset.filter( group__theme__in=preferences).order_by('hearts').distinct()

        print("GREATGREAT")
        print(posts)
        
        serializer = PostSendSerializer(posts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    
    @action(detail=True, methods=['get'])
    def get_post_comments(self, request, pk=None):
        try: 
            comments = Comment.objects.all().filter(post=pk)
            serializer = CommentSerializer(comments, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except: 
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def get_hearts(self, request, pk=None):
        try:
            post = self.queryset.filter(pk=pk).first() 
            hearts = post.get_hearts()
            serializer = NumberSerializer(hearts) 

            serializer.is_valid(raise_exception=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e: 
            print(e) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def get_matches(self, request, pk=None):    
        try: 
            post = self.queryset.filter(pk=pk)
            matches = post.get_matches() 
            serializer = NumberSerializer(matches) 

            serializer.is_valid(raise_exception=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e: 
            print(e) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def perform_action(self, request, pk=None):
        serializer = PostActionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):

            post = self.queryset.filter(pk=pk)
            if not post.exists():
                return Response({}, status=status.HTTP_404_NOT_FOUND)
            post = post.first() 

            data = serializer.validated_data
            action = data.get("action")

            if action == 'heart': 
                post.hearts.add(request.user)
            elif action == 'unheart':
                post.hearts.remove(request.user)
            elif action == 'match':
                post.matches.add(request.user)
            elif action == 'unmatch':
                post.matches.remove(request.user)
            
            serializer = self.serializer_class(post)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer 
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                            IsOwnerOrReadOnly]

    @action(detail=True, methods=['post'])
    def create_comment(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)

        post = Post.objects.all().filter(pk=pk)
        if not post.exists():
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid(raise_exception=True):
            serializer.save(author=self.request.user, 
                            post=post.first())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)