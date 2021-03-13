from functools import wraps 
from django.contrib.auth import get_user_model 
import json  
from graphql_jwt.testcases import JSONWebTokenTestCase

class ExceptionsTestUtils:
  
  @staticmethod
  def trueIfException(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
      try:
        func(self, *args, **kwargs)
        self.assertFalse(True)
      except:
        self.assertTrue(True)
    return wrapper 

  @staticmethod 
  def falseIfException(func): 
    @wraps(func)
    def wrapper(self, *args, **kwargs):
      try:
        func(self, *args, **kwargs)
        self.assertTrue(True)
      except:
        self.assertFalse(True)
        
    return wrapper   

class VerificationTestMixin:
  
  def verify_resp_and_get_data(self, test_client_instance, resp):
    test_client_instance.assertResponseNoErrors(resp)
    content = json.loads(resp.content)
    content = content['data']
    return content 

  def verify_attrs_in_dict(self, test_client_instance, dict, attrs):
    test_client_instance.assertTrue(all(attr in dict for attr in attrs))

class UsersTestMixin:
  
  user_info = {
    'username': 'rand',
    'password': 'randompw',
    'email': 'random@gmail.com',
  }
  
  def create_test_users(self):
    test_users_info = self.get_test_users_info()
    return self.create_users(test_users_info)
  
  def create_users(self, user_infos):
    return [self.create_user(user_info) for user_info in user_infos]

  def create_user(self, user_info):
    return get_user_model().objects.create(username = user_info['username'], email = user_info['email'])
  
  def get_test_users_info(self):
    
    letters = "abcdefghijklmnopqrstuvwxyz"
    password = "simplepw"
    users = []
    
    for letter in letters:
      user = {
        'username': letter,
        'password': password,
        'email': f'{letter}@gmail.com',
      }
      
      users.append(user)
    
    return users  
  
class JWTAuthMixin(UsersTestMixin, JSONWebTokenTestCase):
  
  def authenticate(self):
    self.user = self.create_user(self.user_info)
    self.client.authenticate(self.user)
    return self.user 