from server.app.tests import registration, login, shared, combined_utils, user_requ 

class GroupCreationTest(shared.JWTAuthAndUsersMixin):
  
  def test_create_group_auth(self):
    self.assertTrue(False)