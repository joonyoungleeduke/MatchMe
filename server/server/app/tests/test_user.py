import json 
from graphene_django.utils.testing import GraphQLTestCase

class UserAuthTest(GraphQLTestCase):
  
  def get_registration_query(self):
    
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
  
  def test_registration(self):
    response = self.query(
      self.get_registration_query(),
      op_name='registerUser',
      variables={
        'username': 'rand',
        'password': 'randompw',
        'email': 'random@gmail.com'
      }
    )
    self.assertResponseNoErrors(response)
    content = json.loads(response.content)
    content = content['data']
    self.assertTrue('registerUser' in content)
    
    regUserBody = content['registerUser'] 
    
    self.assertTrue('user' in regUserBody)
    self.assertTrue('profile' in regUserBody)
    user_obj, prof_obj = regUserBody['user'], regUserBody['profile']
    user_id, username, email = user_obj['id'], user_obj['username'], user_obj['email']
    prof_owner_obj = prof_obj['owner']
    owner_id, owner_username, owner_email = prof_owner_obj['id'], prof_owner_obj['username'], prof_owner_obj['email']
    self.assertEqual([user_id, username, email], [owner_id, owner_username, owner_email])