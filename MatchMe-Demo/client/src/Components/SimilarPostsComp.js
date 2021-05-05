import React from 'react'
import { Card, Icon, Grid, Image, List} from 'semantic-ui-react'
import LabelWIm from "./LabelWIm";
import {BsFillLightningFill} from "react-icons/bs"
import {FaHandsHelping} from "react-icons/fa"

const SimilarPostsComp = (props) => {

    return(
        <Card>
            <Card.Content header='Similar Posts' />
            <Card.Content extra>
            <List.Content>
            <List selection vertical>
                    {props.posts.map(post => (
                    <List.Item as="a" href={"/post/" + post.id.toString()}>
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