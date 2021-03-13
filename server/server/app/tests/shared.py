from functools import wraps 
from django.contrib.auth import get_user_model 
import json 

def trueIfException(func):
  @wraps(func)
  def wrapper(self, *args, **kwargs):
    try:
      func(self, *args, **kwargs)
      self.assertFalse(True)
    except:
      self.assertTrue(True)
  return wrapper 

def falseIfException(func): 
  @wraps(func)
  def wrapper(self, *args, **kwargs):
    try:
      func(self, *args, **kwargs)
      self.assertTrue(True)
    except:
      self.assertFalse(True)
      
  return wrapper   

def verify_resp_and_get_data(test_client_instance, resp):
  test_client_instance.assertResponseNoErrors(resp)
  content = json.loads(resp.content)
  content = content['data']
  return content 

def verify_attrs_in_dict(test_client_instance, dict, attrs):
  test_client_instance.assertTrue(all(attr in dict for attr in attrs))

def get_test_user_info():
  return {
    'username': 'rand',
    'password': 'randompw',
    'email': 'random@gmail.com'
  }

def get_test_users_info():
  
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

def create_user(user_info):
  return get_user_model().objects.create(username = user_info['username'], email = user_info['email'])

def create_users(user_infos):
  return [create_user(user_info) for user_info in user_infos]

def create_test_users():
  test_users_info = get_test_users_info()
  return create_users(test_users_info)