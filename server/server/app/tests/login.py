from server.app.tests import shared 

def _get_login_query():
  
  return '''
    mutation loginUser($username: String!, $password: String!) {
      loginUser(username: $username, password: $password) {
        user {
          id 
          username
          email
        }
        token
        refreshToken
      }
    }
  '''
  
def login_verify_and_get_info(test_client_instance, user_info):
  username = user_info.get('username', None)
  password = user_info.get('password', None)
  response = test_client_instance.query(
    _get_login_query(),
    op_name='loginUser',
    variables={
      'username': username,
      'password': password
    }
  )
  data = shared.verify_resp_and_get_data(test_client_instance, response)
  self.assertTrue('loginUser' in data)
  loginUserBody = data['loginUser']
  shared.verify_attrs_in_dict(test_client_instance, loginUserBody, ('user', 'token', 'refreshToken'))
  userBody = loginUserBody['user']
  shared.verify_attrs_in_dict(test_client_instance, userBody, ('id', 'username', 'email'))
  return loginUserBody