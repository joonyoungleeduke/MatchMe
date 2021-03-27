import React from 'react'
import { Card, Icon, Grid, Image, List} from 'semantic-ui-react'
import LabelWIm from "./LabelWIm";
import {BsFillLightningFill} from "react-icons/bs"
import {FaHandsHelping} from "react-icons/fa"
import {Link} from "react-router-dom";


const SimilarPostsComp = (props) => {
    return(
        <Card>
            <Card.Content header='Similar Posts' />
            <Card.Content extra>
            <List.Content>
           <List selection vertical>
                 {props.posts.map(post => (
                   <List.Item as={Link} to={"/post/" + post.id.toString()}>
                     <Image avatar src={post.profile.image}/>
                     <List.Content>
                       <List.Header>
                           {post.author.first_name + " " + post.author.last_name}
                       </List.Header>
                       <List.Description>
                           {"Posted in " + post.group.name}
                       </List.Description>
                     </List.Content>
                   </List.Item>
                 ))};
             </List>
         </List.Content>
            </Card.Content>
        </Card>
    );
}

export default SimilarPostsComp;

{/* <Container text>
<Card 
    style={{width: "100%"}}
    Centered
>
    <Card.Content>
        <Card.Header>
            <List horizontal selection relaxed>
                <List.Item>
                    <Image avatar src={props.post.profile.image} size="small" />
                    <List.Content>
                        <List.Header as='a'>
                            {props.post.author.first_name + " " + props.post.author.last_name}
                        </List.Header>
                        <List.Description as='a'>
                            {"Posted in " + props.post.group.name}
                        </List.Description>
                    </List.Content>
                </List.Item>
            </List> */}