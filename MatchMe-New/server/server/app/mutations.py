import graphene 
import graphql_jwt 
from django.contrib.auth import get_user_model 
from graphql_jwt.shortcuts import create_refresh_token, get_token 
from graphql_jwt.decorators import login_required
from server.app.types import UserType, UserProfileType, PostType
from server.app.models import Profile

class RegisterUser(graphene.Mutation):
  ID = graphene.ID()
  user = graphene.Field(UserType)
  profile = graphene.Field(UserProfileType)
  token = graphene.String()
  refresh_token = graphene.String()
  
  class Arguments:
    username = graphene.String(required = True)
    password = graphene.String(required = True)
    email = graphene.String()
    
  def mutate(root, info, username, password, email=""):
    user = get_user_model()(
      username = username,
      email=email
    )
    user.set_password(password)
    user.save()
    
    profile_obj = Profile.objects.get(owner = user.id)
    token = get_token(user)
    refresh_token = create_refresh_token(user)
    
    return RegisterUser(user = user, profile = profile_obj, token = token, refresh_token = refresh_token)
  
class CreateGroup(graphene.Mutation):
  ID = graphene.ID()
  name = graphene.String()
  description = graphene.String()
  theme = graphene.String()
  owner = graphene.Field(UserProfileType)
  members = graphene.List(UserProfileType) 
  posts = graphene.List(PostType)
  
  class Arguments:
    name = graphene.String(required = True)
    description = graphene.String(required = True)
    theme = graphene.String(required = True)
  
  @login_required
  def mutate(root, info, name, description, theme):
    
    
    return CreateGroup(name = name, description = description, theme = theme)