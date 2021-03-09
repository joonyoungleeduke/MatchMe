import graphene 
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from .models import Profile, UserGroup, Post, Comment, Match, Heart 

class UserType(DjangoObjectType):
  class Meta:
    model = get_user_model()
    exclude = ("password",) 
    
class UserProfileType(DjangoObjectType):
  class Meta:
    model = Profile

class GroupType(DjangoObjectType):
  class Meta:
    model = UserGroup 
    
class PostType(DjangoObjectType):
  class Meta:
    model = Post 
    
class CommentType(DjangoObjectType):
  class Meta:
    model = Comment 
    
class MatchType(DjangoObjectType):
  class Meta:
    model = Match 
    
class HeartType(DjangoObjectType):
  class Meta:
    model = Heart 
