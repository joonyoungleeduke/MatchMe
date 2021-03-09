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

  @shared.trueIfException
  def test_single_user_no_password(self):
    self.generic_user_no_attr(self.user_info, 'password')
    
  def generic_user_no_attr(self, user_info, attr):
    del user_info[attr]
    registration.register_and_verify_user(self, user_info)
  
class UserLoginTest(GraphQLTestCase):
  
  user_info = shared.get_test_user_info()
  
  def test_single_user(self):
    registered_info = registration.register_and_verify_user(self, self.user_info)
    login_info = login.login_verify_and_get_info(self, self.user_info)
  
  @shared.trueIfException
  def test_single_nonexistent_user(self):
    login.login_verify_and_get_info(self, self.user_info)
  
  @shared.trueIfException
  def test_single_user_no_username(self):
    self.generic_user_no_attr(self.user_info, 'username')
    
  @shared.trueIfException
  def test_single_user_no_password(self):
    self.generic_user_no_attr(self.user_info, 'password')
  
  def generic_user_no_attr(self, user_info, attr):
    del user_info[attr]
    login.login_verify_and_get_info(self, user_info)