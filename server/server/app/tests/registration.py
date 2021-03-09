import json

def _get_registration_query():
  
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
        }
      }
  '''

def register_and_verify_user(test_client_instance, user_info):
  username = user_info.get('username', None)
  password = user_info.get('password', None)
  email = user_info.get('email', None)
  response = test_client_instance.query(
    _get_registration_query(),
    op_name='registerUser',
    variables={
      'username': username,
      'password': password,
      'email': email
    }
  )
  test_client_instance.assertResponseNoErrors(response)
  content = json.loads(response.content)
  content = content['data']
  test_client_instance.assertTrue('registerUser' in content)
  
  regUserBody = content['registerUser'] 
  
  test_client_instance.assertTrue('user' in regUserBody)
  test_client_instance.assertTrue('profile' in regUserBody)
  user_obj, prof_obj = regUserBody['user'], regUserBody['profile']
  user_id, username, email = user_obj['id'], user_obj['username'], user_obj['email']
  prof_owner_obj = prof_obj['owner']
  owner_id, owner_username, owner_email = prof_owner_obj['id'], prof_owner_obj['username'], prof_owner_obj['email']
  test_client_instance.assertEqual([user_id, username, email], [owner_id, owner_username, owner_email])