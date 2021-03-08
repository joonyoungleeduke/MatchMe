import graphene 
from graphene_django import DjangoObjectType

from server.app.types import UserType, GroupType, PostType, CommentType, MatchType, HeartType
from server.app.mutations import RegisterUser

class Query(graphene.ObjectType):
  login = graphene.Field(
    UserType,
    username = graphene.String()
  )
  register = graphene.Field(
    UserType,
    username = graphene.String()
  )
  
class Mutations(graphene.ObjectType):
  register_user = RegisterUser.Field()

schema = graphene.Schema(query = Query, mutation = Mutations)