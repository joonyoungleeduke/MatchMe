from server.app.tests import shared 

def _get_user_info_query():
  
  return '''
    query UserInfo($username: String!) {
      userInfo(username: $username) {
        id 
        username 
        email 
        profile {
          owner {
            id 
            username
            email 
          }
        } 
      }
    }
  '''
  
def _get_users_info_query():
  
  return '''
    query UsersInfo {
      usersInfo {
        id 
        username 
        email 
        profile {
          owner {
            id 
            username
            email
          }
        }
      }
    }
  '''
  
def get_user_info(test_client_instance, user_info):
  username = user_info.get('username', None)
  variables = {
    'username': username 
  }
  response = test_client_instance.execute(_get_user_info_query(), variables)
  data = response.data
  return data 

def get_users_info(test_client_instance):
  response = test_client_instance.execute(_get_users_info_query())
  data = response.data 
  return data 