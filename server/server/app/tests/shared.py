from functools import wraps 
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