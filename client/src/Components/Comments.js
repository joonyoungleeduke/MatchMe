import React, {useState} from 'react'
import {Comment, Form, Header,Card, Transition,Image, Icon, List} from 'semantic-ui-react'
import {Button } from "@material-ui/core"

const Comments = (props) => {
const [comment, setComment] = useState({});
const [reply, setReply] = useState({});
const [seeReply, setSeeReply] = React.useState(false);

const handleExpand = () => {
    setSeeReply(!seeReply);
};
return(
  <div>
    <Comment.Group minimal style={{display: props.visible ? "" : "none", width: "100%", marginBottom: 30, paddingLeft: 20, paddingRight: 20}}>
    <div style={{marginTop: 0}}>
      <Image avatar src={props.img} style={{top: 2}}/>
      <div style={{width: "88%", float: "right", marginBottom: 10}}>
      <input name="comment" type="text" className="form-control inputField" placeHolder="Add a comment..." onChange={() => {setComment()}}/>
      </div>
      </div>
      <Header as='h3' dividing>
        Comments
      </Header>

      <Comment.Group>
        {props.comments.map(comment => (
          <Comment style={{marginBottom: 10}}>
            <Comment.Avatar as='a' src={comment.profile.image} />
            <Comment.Content>
              <Comment.Author as='a'>{comment.author.first_name + " " + comment.author.last_name}</Comment.Author>
              {/* <Comment.Metadata>
                <span>Yesterday at 12:30AM</span>
              </Comment.Metadata> */}
              <Comment.Text>
                <p>{comment.content}</p>
                <div className="row" style={{marginTop: 20, width: "100%", display: seeReply ? "" : "none"}} >
                     {/* <Image avatar src={props.img} size='small'/> */}
                      <div style={{width: "100%", float: "right"}}>
                      <input name="reply" type="text" className="form-control inputField" placeHolder="Add a reply..." onChange={() => {setReply()}}/>
                      </div>
                    </div>
              </Comment.Text>
              <Comment.Actions>   
                <List>                        
                <List.Item onClick={handleExpand}>
                    <a>Reply</a>
                </List.Item>
                </List> 
                
                
                {/* () => {showNewComment()} */}
              </Comment.Actions>
            </Comment.Content>
          </Comment>
                ))}
      </Comment.Group>

      {/* <Form reply>
        <Form.TextArea />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form> */}
    </Comment.Group>

  </div>
  )
    }

{/* <Transition visible={props.match_state.showpost} animation='scale' duration={500}> */}


export default Comments

// class Comment(models.Model):

//     content = models.TextField(blank=False, default='')
    
//     post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
//     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')

//     created = models.DateTimeField(auto_now_add=True)
//     modified = models.DateTimeField(auto_now=True)

//     class Meta: 
//         ordering = ['created']
    
//     def __str__(self):
//         return f'Comment {self.content} by {self.author}'

// async function ParseComments(data) {
//   for (let idx in data) {
//       data[idx]['post_id'] = data[idx].post; 
//       data[idx].post = await PostInfo(data[idx].post_id);
//       data[idx]['user_id'] = data[idx].author;
//       data[idx]['profile'] = await ProfileInfo(data[idx].user_id);
//       data[idx].author = await UserInfo(data[idx].user_id);
//   }

//   return data; 
// }

// export default ParseComments;

