from server.app.tests import shared 

class PostTestMixin(shared.VerificationTestMixin):
  
  def new_post(self, test_client_instance, post_info): 
    post_title = post_info.get('title', None)
    post_body = post_info.get('body', None)
    target_matches = post_info.get('target_matches', None)
    group = post_info.get('group', None)
    response = test_client_instance.query(
      self._get_post_query(),
      op_name='newPost',
      variables={
        'postTitle': post_title,
        'postBody': post_body,
        'targetMatches': target_matches,
        'group': group,
      }
    )
    data = self.verify_resp_and_get_data(response)
  
  def _get_new_post_query(self):
    
    return '''
      mutation newPost($postTitle: String!, $postBody: String!) {
        newPost(postTitle: $postTitle, postBody: $postBody) {
          id 
          title 
          body 
          targetMatches
          owner {
            id 
            username
            email 
          }
          group {
            id 
            name
            description
            theme
            posts {
              id
              title
              body
              targetMatches 
            }
          }
          matches {
            id 
            owner
            post 
          }
          hearts {
            id 
            owner 
            post 
          }
        }
      }
  
    '''