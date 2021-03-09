from server.app.tests import registration, login, shared 
from graphene_django.utils.testing import GraphQLTestCase

class UserRegistrationTest(GraphQLTestCase):
  
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
  
class UserLoginTest(GraphQLTestCase):
  
  user_info = shared.get_test_user_info()
  
  def test_single_user(self):
    registered_info = registration.register_and_verify_user(self, self.user_info)
    reg_user_info = registered_info['user']
    login_info = login.login_verify_and_get_info(self, reg_user_info)
    reg_username, reg_password = reg_user_info['username'], reg_user_info['password']
    login_user_info = login_info['user']
    login_username, login_password = login_user_info['username'], login_user_info['password']
    self.assertEqual([reg_username, reg_password], [login_username, login_password])