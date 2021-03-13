from server.app.tests import registration, login, shared, combined_utils, user_requ 
from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase
from django.contrib.auth import get_user_model 
from copy import deepcopy

class UserRegistrationTest(GraphQLTestCase, registration.RegistrationTestMixin,
                            shared.UsersTestMixin, shared.VerificationTestMixin):
  
  def test_single_user(self):
    self.register_and_verify_user(self, self.user_info)
  
  @shared.ExceptionsTestUtils.trueIfException
  def test_same_user_caught(self):
    self.register_and_verify_user(self, self.user_info)
    self.register_and_verify_user(self, self. user_info)
  
  def test_single_user_no_email(self):
    self.generic_user_no_attr(self.user_info, 'email')
  
  @shared.ExceptionsTestUtils.trueIfException
  def test_single_user_no_username(self):
    self.generic_user_no_attr(self.user_info, 'username')

  @shared.ExceptionsTestUtils.trueIfException
  def test_single_user_no_password(self):
    self.generic_user_no_attr(self.user_info, 'password')
    
  def generic_user_no_attr(self, user_info, attr):
    user_info_copy = deepcopy(user_info)
    del user_info_copy[attr]
    self.register_and_verify_user(self, user_info_copy)
  
class UserLoginTest(GraphQLTestCase, registration.RegistrationTestMixin,
                    login.LoginTestMixin, shared.UsersTestMixin,
                    shared.VerificationTestMixin):
  
  def test_single_user(self):
    registered_info = self.register_and_verify_user(self, self.user_info)
    login_info = self.login_verify_and_get_info(self, self.user_info)
  
  @shared.ExceptionsTestUtils.trueIfException
  def test_single_nonexistent_user(self):
    self.login_verify_and_get_info(self, self.user_info)
  
  @shared.ExceptionsTestUtils.trueIfException
  def test_single_user_no_username(self):
    self.generic_user_no_attr(self.user_info, 'username')
    
  @shared.ExceptionsTestUtils.trueIfException
  def test_single_user_no_password(self):
    self.generic_user_no_attr(self.user_info, 'password')
  
  def generic_user_no_attr(self, user_info, attr):
    user_info_copy = deepcopy(user_info)
    del user_info_copy[attr]
    self.login_verify_and_get_info(self, user_info_copy)
    
class UserInfoTest(JSONWebTokenTestCase, shared.UsersTestMixin,
                    user_requ.UserRequTestMixin, shared.VerificationTestMixin):
    
  def authenticate(self):
    self.user = self.create_user(self.user_info)
    self.client.authenticate(self.user)
  
  def test_query_single_user_with_perm(self):
    self.authenticate()
    resp = self.get_user_info(self.client, self.user_info)
    userInfoObj = resp['userInfo']
    profileObj = userInfoObj['profile']
    userObj = profileObj['owner']
    res_username, res_email = userObj['username'], userObj['email']
    self.assertEqual([self.user_info['username'], self.user_info['email']], [res_username, res_email])
    
  @shared.ExceptionsTestUtils.trueIfException
  def test_query_single_user_no_perm(self):
    resp = self.get_user_info(self.client, self.user_info)
  
  def test_query_all_users_with_perm(self):
    self.authenticate()
    test_users = self.create_test_users()
    resp = self.get_users_info(self.client)
    usersInfo = resp['usersInfo']
    success = self.validate_users_info(self.user, test_users, usersInfo)
    self.assertTrue(success)
    
  def test_query_all_users_no_perm(self):
    test_users = self.create_test_users()
    resp = self.get_users_info(self.client)
  
  def validate_users_info(self, owner, created_users, received_users):
    received_usernames = [received_user['username'] for received_user in received_users]
    received_emails = [received_user['email'] for received_user in received_users]
    owner_username = owner.username 
    owner_email = owner.email 
    for created_user in created_users:
      c_username = created_user.username
      c_email = created_user.email
      not_owner = c_username != owner_username or c_email != owner_email
      not_received = not (c_username in received_usernames and c_email in received_emails)
      if not_owner and not_received:
        return False 
    return True 