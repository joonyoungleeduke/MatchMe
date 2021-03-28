import React, {useState} from 'react'
import {Comment, Header, Image, List} from 'semantic-ui-react'

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
              <Comment.Text>
                <p>{comment.content}</p>
                <div className="row" style={{marginTop: 20, width: "100%", display: seeReply ? "" : "none"}} >
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
              
              </Comment.Actions>
            </Comment.Content>
          </Comment>
                ))}
      </Comment.Group>
    </Comment.Group>

  </div>
  )
}

export default Comments