from server.app.tests import login, registration

class CombinedUtilsTestMixin(registration.RegistrationTestMixin, login.LoginTestMixin):
  def register_and_login(test_client_instance, user_info):
    self.register_and_verify_user(test_client_instance, user_info)
    return self.login_verify_and_get_info(test_client_instance, user_info)