from server.app.tests import registration, shared 
from graphene_django.utils.testing import GraphQLTestCase

class UserAuthTest(GraphQLTestCase):
  
  def test_registration(self):
    user_info = shared.get_test_user_info()
    registration.register_and_verify_user(self, user_info)