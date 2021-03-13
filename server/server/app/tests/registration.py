from server.app.tests import shared 

class RegistrationTestMixin(shared.VerificationTestMixin):

  def register_and_verify_user(self, test_client_instance, user_info):
    username = user_info.get('username', None)
    password = user_info.get('password', None)
    email = user_info.get('email', None)
    response = test_client_instance.query(
      self._get_registration_query(),
      op_name='registerUser',
      variables={
        'username': username,
        'password': password,
        'email': email
      }
    )
    data = self.verify_resp_and_get_data(test_client_instance, response)
    test_client_instance.assertTrue('registerUser' in data)
    regUserBody = data['registerUser'] 
    self.verify_attrs_in_dict(test_client_instance, regUserBody, ('user', 'profile'))
    user_obj, prof_obj = regUserBody['user'], regUserBody['profile']
    user_id, username, email = user_obj['id'], user_obj['username'], user_obj['email']
    prof_owner_obj = prof_obj['owner']
    owner_id, owner_username, owner_email = prof_owner_obj['id'], prof_owner_obj['username'], prof_owner_obj['email']
    test_client_instance.assertEqual([user_id, username, email], [owner_id, owner_username, owner_email])
    
    return regUserBody
  
  def _get_registration_query(self):
    
    return '''
        mutation registerUser($username: String!, $password: String!, $email: String) {
          registerUser(username: $username, password: $password, email: $email) {
            user {
              id
              username
              email 
            }
            profile {
              owner {
                id
                username
                email
              }
            }
            token
            refreshToken
          }
        }
    '''