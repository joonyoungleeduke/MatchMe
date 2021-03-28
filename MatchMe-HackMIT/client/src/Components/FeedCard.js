import React from 'react'
import {Button, Icon, Label, Card, Image, List, Container, Popup, Header} from 'semantic-ui-react';
import Comments from "../Components/Comments";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SubmitHeart from "../APIComponents/SubmitHeart";
import SubmitMatch from "../APIComponents/SubmitMatch";
import RemoveHeart from "../APIComponents/RemoveHeart";
import RemoveMatch from "../APIComponents/RemoveMatch";

const FeedCard = (props) => {

    const [seeComments, setSeeComments] = React.useState(false);
    const [hearted, setHeart] = React.useState(props.post.hearted);
    const [matched, setMatch] = React.useState(props.post.isMatch ? props.post.matched : false);
    const [hearts, setHearts] = React.useState(props.post.hearts > 0 ? props.post.hearts : 0)
    const [comments, setComments] = React.useState(props.post.comments > 0 ? props.post.comments : 0)

    const handleExpand = () => {
        setSeeComments(!seeComments);
    };

    const post_id = props.post.id; 
    const user_id = localStorage.getItem('user_id'); 

    async function handleCreateMatch() {
        let response = await SubmitMatch({
            author: user_id, 
            match_post: post_id, 
        })

        if (response.status === 201) {
            setMatch(true);
        } else {
            console.log("unsuccessful match");
            console.log(response.status);
        }
    }

    async function handleCreateHeart() {

        let response = await SubmitHeart({
            author: user_id, 
            post: post_id, 
        })

        if (response.status === 201) {
            setHeart(true);
            setHearts(hearts + 1);
        } else {
            console.log("unsuccessful heart");
            console.log(response.status);
        }

    }

    async function handleRemoveMatch() {
        let response = await RemoveMatch(post_id, user_id);

        if (response.status === 204) {
            setMatch(false); 
        } else {
            console.log('unsuccessful unmatch');
            console.log(response.status);
        }
    }

    async function handleRemoveHeart() {
        let response = await RemoveHeart(post_id, user_id);

        if (response.status === 204) {
            setHeart(false); 
            setHearts(hearts-1)
        } else {
            console.log('unsuccessful unmatch');
            console.log(response.status);
        }
    }

    const handleMatch = () => {
        if (matched) {
            handleRemoveMatch();
        } else {
            handleCreateMatch();
        }
    }

    const handleHeart = () => {
        if (hearted) {
            handleRemoveHeart();
        } else {
            handleCreateHeart(); 
        }
    }

    if (props.isMatch) {
        return (
            <Container style={{padding: "10px", marginBottom: 30}}>
                <Card 
                    style={{width: "100%", padding:"20px", textDecoration: "none"}}
                    centered
                >
                    
                    <Card.Header horizontal style={{paddingLeft:"15px"}}>
                        <List horizontal>
                            <List.Item>
                                <h1 style={{fontWeight: 'bold', color: "black", textDecoration: "none"}}>
                                    {props.post.group.name}
                                </h1>
                            </List.Item>
                        </List>
                        <Label
                            as='a' 
                            color='blue'
                            style={{float:'right'}}
                            href={'/theme/' + props.post.group.theme}
                        >
                            {props.post.group.theme}
                        </Label>

                    </Card.Header>
                    
                    <Card.Content>
                        <Header as='h2'>
                            {props.post.title}
                        </Header>
                        <LinkContainer to={'/post/' + props.post.id}>
                    <Nav.Link >
                        <Header as='h4'>
                            I want {props.post.goal} of you to join me.
                        </Header>
                        <Header>
                            <Button 
                                as={Link} 
                                labelPosition='right'
                                to={'/post/' + props.post.id}
                                >
                                <Button color='blue' 
                                    >
                                    <Icon name='handshake outline' size='large' />
                                    Match
                                </Button>
                                <Label color='blue' basic pointing='left'>
                                    {props.post.matches > 0 ? props.post.matches : 0}
                                </Label>
                            </Button>
                        </Header>
                        <small style={{color: "black"}}>
                            {hearts} likes | {comments} comments
                        </small>
                    </Nav.Link>
                </LinkContainer>
                </Card.Content>   
                    <Card.Content extra>
                        <List horizontal selection style={{marginLeft: 5}}>
                        <Popup content='Like' basic trigger={
                            <List.Item
                                onClick={handleHeart}
                            >

                                <List.Icon 
                                name={hearted ? "heart" : "heart outline"}
                                size="large"
                                label={{as: 'a', corner: 'left', value: props.post.hearts}}
                                >

                                </List.Icon>

                            </List.Item>
                        } />
                        <Popup content='Comment' basic trigger={
                            <List.Item onClick={handleExpand}>
                                <List.Icon 
                                
                                name={seeComments ? "comments" : 'comments outline'}
                                
                                size='large' />
                            </List.Item>
                        } />


                                <List.Item
                                    float="right"
                                >
                                    <Image avatar src={props.post.profile.image} size="small" />
                                    <List.Content>
                                        <List.Header 
                                            as='a'
                                            href={"/profile/" + props.post.author.id}
                                        
                                        >
                                            {props.post.author.first_name + " " + props.post.author.last_name}
                                        </List.Header>
                                        <List.Description as='a' style={{fontSize: 13}}>
                                            {"Posted in " + props.post.group.name}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>

                        </List>
                        
                    </Card.Content>                    

                    <Comments comments={props.post.comments} img={props.img} visible={seeComments}/>
                </Card>
            </Container>
        )
    } else {
        return (

            <Container style={{margin: "10px", marginBottom: 30}}>
                <Card 
                    style={{width: "100%", padding:"20px"}}
                    centered
                >
                    
                    <Card.Header horizontal style={{paddingLeft:"15px"}}>
                        <List horizontal>
                            <List.Item>
                                <h1 style={{fontWeight: 'bold'}}>
                                    {props.post.group.name}

                                </h1>
                            </List.Item>
                        </List>
                        <Label
                            as='a' 
                            color='blue'
                            style={{float:'right'}}
                            href={'/theme/' + props.post.group.theme}
                        >
                            {props.post.group.theme}
                        </Label>

                    </Card.Header>

                    <Card.Content>
                        <Header as='h4'>
                            {props.post.title}
                        </Header>
                        <small>
                            {hearts} likes | {comments} comments
                        </small>

                    </Card.Content>

                    <Card.Content extra>
                        <List horizontal selection style={{marginLeft: 5}}>
                        <Popup content='Like' basic trigger={
                            <List.Item
                                onClick={handleHeart}
                            >

                                <List.Icon 
                                name={hearted ? "heart" : "heart outline"}
                                size="large"
                                label={{as: 'a', corner: 'left', value: props.post.hearts}}
                                >

                                </List.Icon>

                            </List.Item>
                        } />
                        <Popup content='Comment' basic trigger={
                            <List.Item onClick={handleExpand}>
                                <List.Icon 
                                
                                name={seeComments ? "comments" : 'comments outline'}
                                
                                size='large' />
                            </List.Item>
                        } />

                                <List.Item
                                    float="right"
                                >
                                    <Image avatar src={props.post.profile.image} size="small" />
                                    <List.Content>
                                        <List.Header 
                                            as='a'
                                            href={"/profile/" + props.post.author.id}
                                        >
                                            {props.post.author.first_name + " " + props.post.author.last_name}
                                        </List.Header>
                                        <List.Description as='a'>
                                            {"Posted in " + props.post.group.name}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                        </List>
                        
                    </Card.Content>                    
                    <Comments comments={props.post.comments} img={props.img} visible={seeComments}/>
                </Card>

                

            </Container>



        )
    }
}

const styles = {
    card: {
        width: "100%",
        
    },
}

export default FeedCard;
