import graphene 
from graphene_django import DjangoObjectType
import graphql_jwt

from server.app.types import UserType, UserProfileType, GroupType, PostType, CommentType, MatchType, HeartType
from server.app.mutations import RegisterUser

class Query(graphene.ObjectType):
  whoami = graphene.Field(UserType)
  
  def resolve_whoami(self, info):
    user = info.context.user 
    if user.is_anonymous:
      raise Exception('Authentication Failure: You must be signed in.')
    return user 
  
class Mutations(graphene.ObjectType):
  token_auth = graphql_jwt.ObtainJSONWebToken.Field()
  verify_token = graphql_jwt.Verify.Field()
  refresh_token = graphql_jwt.Refresh.Field()
  
  register_user = RegisterUser.Field()

schema = graphene.Schema(query = Query, mutation = Mutations)