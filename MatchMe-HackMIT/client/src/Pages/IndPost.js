import React, {useState, useEffect, Text} from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import ParsePost from "../APIComponents/ParsePost";
import PostInfo from "../APIComponents/PostInfo";
import {Grid, Container, Header, Image, Label, Menu, Progress, Form, Button, Divider} from "semantic-ui-react";
import Comments from "../Components/Comments";
import SubmitMatch from "../APIComponents/SubmitMatch";
import RemoveMatch from "../APIComponents/RemoveMatch";
import UserInfo from "../APIComponents/UserInfo";
import ProfileInfo from "../APIComponents/ProfileInfo";
import GroupSuggestions from "../APIComponents/GroupSuggestions";
import SuggestedGroups from "../Components/SuggestedGroups";
import SimilarPostsComp from "../Components/SimilarPostsComp";
import SimilarPosts from "../APIComponents/SimilarPosts";
import ParsePosts from "../APIComponents/ParsePosts";

const IndPost = (props) => {

    const [suggestions, setSuggestions] = useState([]);
    const [similarPosts, setSimilarPosts] = useState([]);

    const [showComments, setShowComments] = useState(false);
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});

    const [matched, setMatch] = React.useState(false);
        
    const post_id = props.postID;

    const user_id = localStorage.getItem('user_id');

    async function getUser(user_id) {
        let user = UserInfo(user_id);
    
        user.then(data => {
            setUser(data);
        })
    };
    
    async function getProfile(user_id) {
        let profile = ProfileInfo(user_id);
    
        profile.then(data => {
            setProfile(data);
        })
    }

    async function handleCreateMatch() {
        let response = await SubmitMatch({
            author: user_id, 
            match_post: post_id, 
        })

        console.log(user_id);
        console.log(post_id);

        if (response.status === 201) {
            setMatch(true);
        } else {
            console.log("unsuccessful match");
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

    async function getSuggestions(user_id) {
        let suggestions = GroupSuggestions(user_id);
        suggestions.then(data => {
            setSuggestions(data);
        })
    
    }
    


    async function getSimilarPosts(group_id) {
        let similars = await SimilarPosts(group_id, post_id); 
        similars = ParsePosts(similars);
        similars.then(data => {
            setSimilarPosts(data);
        })
    }



    const handleMatch = () => {
        if (matched) {
            handleRemoveMatch();
        } else {
            handleCreateMatch();
        }
    }



    const handleShowComments = () => {
        setShowComments(true);
    }

    const handleHideComments = () => {
        setShowComments(false);
    }

    useEffect(() => {
        getPost();
        getUser(user_id);
        getProfile(user_id);
        getSuggestions(user_id);
    }, {});

    async function getPost() {
        let data = await PostInfo(post_id);
        data = await ParsePost(data, user_id);
        setPost(data);
        setMatch(data.matched);
        getSimilarPosts(data.group.id);
    }
    if (post.isMatch) {
        return(
            <div>
                <NavBar />
                <Grid centered columns={2}>
                    <Grid.Column style={{left: -50}}>
                        <Container text>
                            <Label as='a' color='blue' ribbon>
                                {post.group.theme}
                            </Label>
                            <Header as ='h1' style={{fontSize: '5em'}}>
                                {post.group.name}
                            </Header>
                            <Header as='h1'>
                                Match {post.author.first_name}'s lead.
                            </Header>
                        </Container>
                    </Grid.Column>
                    <Grid.Row centered columns={4}>
                        <Grid.Column>
                            <Grid.Row>
                                <Menu attached='top' tabular fluid widths={2}>
                                    <Menu.Item
                                        name='action'
                                        active={!showComments}
                                        onClick={handleHideComments}
                                    >
                                    </Menu.Item>
                                    <Menu.Item
                                        name='comments'
                                        active={showComments}
                                        onClick={handleShowComments}
                                    >
                                    </Menu.Item>
                                </Menu>
                            </Grid.Row>
                            <Grid.Row fluid>
                                <Container text style={{display: showComments ? "none" : "", margin: "20px"}}>
                                            <h2 style={{fontWeight: "bold"}}>
                                                Here's what I did.
                                            </h2>
                                            <h5>
                                                {post.content}
                                            </h5>
                                            <br></br>
                                            <h3 style={{fontWeight: "bold"}}>
                                                Why should you care?
                                            </h3>
                                            <p>
                                                {post.reason}
                                            </p>
                                </Container>
                                <Container text style={{display: showComments ? "" : "none", margin: "20px"}}>
                                    <Comments comments={post.comments} visible={showComments} />
                                </Container>
                            </Grid.Row>
                        </Grid.Column>

                        <Grid.Column centered style={{marginLeft: "30px"}}>
                            <h5>
                                Contribute to {post.group.name}'s impact.
                            </h5>
                            <h5 style={{fontWeight: "bold"}}>
                                Help get to {post.goal} matches.
                            </h5>
                            <br></br>
                            <Progress percent={((post.matches / post.goal) * 100).toFixed(3)} color="blue"/>
                            <br></br>
                            {post.matched ? 

                                <Container text>
                                <Header as ='h1' style={{fontSize: '3em'}}>
                                    Thank you for contributing. 
                                </Header>
                                
                                </Container>

                                :

                                <Form>
                                    <Header>
                                        Enter your name to confirm.
                                    </Header>
                                    <Form.Input placeholder='First Name' />
                                    <Form.Input placeholder='Last Name' />
                                        
                                    <Form.Button
                                    onClick={handleMatch}
                                    fluid 
                                    basic 
                                    color='blue'
                                    icon='handshake outline'
                                    />                         
                                    
                                </Form>
                        }

    
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row centered columns={4} style={{marginTop: "10em"}}>
                        <Grid.Column>
                            <Container>
                                <Header as ='h1' style={{fontSize: '4em'}}>
                                    Take more action.
                                </Header>
                                <Header as='h1'>
                                </Header>
                            </Container>
                            <Grid.Row centered columns={2}>
                                <Grid.Column style={{padding: "10px"}}>
                                    <SuggestedGroups groups={suggestions} />
                                </Grid.Column>

                                <Grid.Column style={{padding: "10px"}}>
                                    <SimilarPostsComp posts={similarPosts} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        )
    } else {
        return(
            <div>
                under construction
            </div>
        )
    }

}

export default IndPost;