from functools import wraps 

def get_test_user_info():
  return {
    'username': 'rand',
    'password': 'randompw',
    'email': 'random@gmail.com'
  }
  
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