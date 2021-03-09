from server.app.tests import registration, shared 
from graphene_django.utils.testing import GraphQLTestCase

class UserAuthTest(GraphQLTestCase):
  
  user_info = shared.get_test_user_info()
  
  def test_single_user(self):
    registration.register_and_verify_user(self, self.user_info)
  
  @shared.trueIfException
  def test_same_user_caught(self):
    registration.register_and_verify_user(self, self.user_info)
    registration.register_and_verify_user(self, self. user_info)
  
  def test_single_user_no_email(self):
    self.generic_user_no_attr(self.user_info, 'email')
  
  @shared.trueIfException
  def test_single_user_no_username(self):
    self.generic_user_no_attr(self.user_info, 'username')
    self.assertTrue(False)
    
  def generic_user_no_attr(self, user_info, attr):
    del user_info[attr]
    registration.register_and_verify_user(self, self.user_info)