from server.app.tests import shared 

class LoginTestMixin(shared.VerificationTestMixin):
    
  def login_verify_and_get_info(self, test_client_instance, user_info):
    username = user_info.get('username', None)
    password = user_info.get('password', None)
    response = test_client_instance.query(
      self._get_login_query(),
      op_name='tokenAuth',
      variables={
        'username': username,
        'password': password
      }
    )
    data = self.verify_resp_and_get_data(test_client_instance, response)
    test_client_instance.assertTrue('tokenAuth' in data)
    token_auth_body = data['tokenAuth']
    self.verify_attrs_in_dict(test_client_instance, token_auth_body, ('token', 'payload', 'refreshExpiresIn'))
    return token_auth_body
  
  def _get_login_query(self):
    
    return '''
      mutation tokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
          token
          payload
          refreshExpiresIn
        }
      }
    '''