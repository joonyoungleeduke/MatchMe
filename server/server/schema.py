import graphene 
from graphene_django import DjangoObjectType

from server.app.types import UserType, GroupType, PostType, CommentType, MatchType, HeartType

class Query(graphene.ObjectType):
  login = graphene.Field(
    UserType,
    username = graphene.String()
  )
  register = graphene.Field(
    UserType,
    username = graphene.String()
  )

schema = graphene.Schema(query = Query)