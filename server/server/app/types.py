import graphene 
from graphene_django import DjangoObjectType

from .models import User, Group, Post, Comment, Match, Heart 

class UserType(DjangoObjectType):
  class Meta:
    model = User 
    fields = ("id", "first_name", "last_name", "username", "bio") 

class GroupType(DjangoObjectType):
  class Meta:
    model = Group 
    fields = ("id", "name", "description", "theme", "owner", "members")
    
class PostType(DjangoObjectType):
  class Meta:
    model = Post 
    fields = ("id", "title", "body", "target_matches", "owner", "group")
    
class CommentType(DjangoObjectType):
  class Meta:
    model = Comment 
    fields = ("owner", "post")
    
class MatchType(DjangoObjectType):
  class Meta:
    model = Match 
    fields = ("owner", "post")
    
class HeartType(DjangoObjectType):
  class Meta:
    model = Heart 
    fields = ("owner", "post")