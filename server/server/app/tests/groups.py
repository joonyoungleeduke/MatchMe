from server.app.tests import shared 

class GroupsTestMixin(shared.VerificationTestMixin):
  
  def new_group(self, test_client_instance, group_info):
    group_name = group_info.get('name', None)
    group_description = group_info.get('description', None)
    group_theme = group_info.get('theme', None)
    response = test_client_instance.query(
      self._get_new_group_query(),
      op_name='newGroup',
      variables={
        'name': group_name,
        'description': group_description,
        'theme': group_theme,
      }
    )
  
  def _get_new_group_query(self):
    
    return '''
      mutation newGroup($name: String!, $description: String!, $theme: String!) {
        newGroup(name: $name, description: $description, theme: $theme) {
          id
          name
          description
          theme
          owner {
            id 
            username
            email
          }
          members {
            id 
            username 
            email
          }
          posts {
            id
            title 
            body
            targetMatches
            group {
              id 
              name
              description
              theme 
            }
          }
        }
      }
  
    '''