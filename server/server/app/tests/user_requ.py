class UserRequTestMixin:
  
  def get_user_info(self, test_client_instance, user_info):
    username = user_info.get('username', None)
    variables = {
      'username': username 
    }
    response = test_client_instance.execute(self._get_user_info_query(), variables)
    data = response.data
    return data 

  def get_users_info(self, test_client_instance):
    response = test_client_instance.execute(self._get_users_info_query())
    data = response.data 
    return data 

  def _get_user_info_query(self):
    
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
    
  def _get_users_info_query(self):
    
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
