from server.app.tests import login, registration

def register_and_login(test_client_instance, user_info):
  registration.register_and_verify_user(test_client_instance, user_info)
  return login.login_verify_and_get_info(test_client_instance, user_info)