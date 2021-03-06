import React from 'react'
import { Card, Icon, Grid, List, Form, Button, Image, Modal, Transition} from 'semantic-ui-react'
import LabelWIm from "./LabelWIm";
import {BsFillLightningFill} from "react-icons/bs"
import {FaHandsHelping} from "react-icons/fa"
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton'

const BigProfileCard = (props) => {
    return(
        <Modal
                trigger={ 
                    <Card style={{textDecoration: "none"}}>
                    <Image src={props.src} wrapped ui={false}/>
                    
                <Card.Content>
                  <Card.Header  style={{fontSize: 25, marginBottom: 15, marginLeft: 5}}>{props.first_name + " " + props.last_name}</Card.Header>
                  <div style={{position: "absolute", right: 10, top: 345, zIndex: 3}}>
                  <IconButton  aria-label="edit" size="large">
                    <CreateIcon />
                  </IconButton>
                  </div>
                  <Card.Description style={{fontSize: 17}}>
                    <BsFillLightningFill size={18} style={{top: -10, marginRight: 7}}/>
                    Actions Inspired: {props.inspired} 
                  </Card.Description>
        
                  <Card.Description style={{fontSize: 17, marginBottom: 15}}>
                      <FaHandsHelping size={18} style={{top: -10, marginRight: 7}}/>
                       Actions Matched: {props.matched} 
                  </Card.Description>
                  <Card.Description>
                    {props.bio}
                  </Card.Description>
                </Card.Content>
              </Card>
        
          }
            // header='Edit Profile'
            // content={'hi'}
            // actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
          >
            <Modal.Header>Edit Profile</Modal.Header>
            <Modal.Content>
                <Grid>
                    <Grid.Column width={7}>

                   
                        <List verticalAlign="middle">
                            <List.Item>
                                <Image src={props.src} style={{width: 220, marginLeft: 70}}/>
                            </List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        <Form > 
                        {/* onSubmit={(e) => handleSubmit(e)} id="new-post-form" */}
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder={props.first_name} />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input placeholder={props.last_name} />
                        </Form.Field>
                        <Form.Field>
                            <label>Bio</label>
                            <Form.TextArea placeholder={props.bio} />
                        </Form.Field>
                            {/* onChange = {(e) => handleChange(e)} */}
                        </Form>
                        </Grid.Column>
                        

                </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                            <Button color="black" >Close</Button>
                            {/* onClick={() => props.handlePostChange({type: 'CLOSE_MODAL' })} */}
                            <Button positive type="submit" value="submit" form="new-post-form">Confirm</Button>
                    </Modal.Actions>

                </Modal>
       
  );
}

export default BigProfileCard;
