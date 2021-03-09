import graphene 
from graphene_django import DjangoObjectType
import graphql_jwt
from django.contrib.auth import get_user_model 
from server.app.types import UserType, UserProfileType, GroupType, PostType, CommentType, MatchType, HeartType
from server.app.mutations import RegisterUser
  
class Mutations(graphene.ObjectType):
  token_auth = graphql_jwt.ObtainJSONWebToken.Field()
  verify_token = graphql_jwt.Verify.Field()
  refresh_token = graphql_jwt.Refresh.Field()
  
  register_user = RegisterUser.Field()
  
class Query(graphene.ObjectType):
  
  whoami = graphene.Field(UserType)
  users = graphene.List(UserType)
  
  def resolve_whoami(self, info):
    user = info.context.user
    if user.is_anonymous:
      raise Exception('Not logged in')
    return user
  
  def resolve_users(self, info):
    return get_user_model().objects.all()

schema = graphene.Schema(query = Query, mutation = Mutations)