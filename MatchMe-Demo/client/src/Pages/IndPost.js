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
            <div
                style={{
                    width: '100%',
                    height: '100vh'
                }}
            >
                <NavBar />

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        gap: "5%"
                    }}
                >
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

                    <div
                        style={{
                            display: 'flex',
                            gap: '5%',
                            alignItems: 'flex-start'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                gap: '10px',
                                maxWidth: '600px'
                            }}
                        >
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

                            <Container text style={{display: showComments ? "none" : "", margin: "20px"}}>
                                                    <h2 style={{fontWeight: "bold"}}>
                                                        Here's what I did.
                                                    </h2>
                                                    <h5>
                                                        {post.title}
                                                    </h5>
                                                    <br></br>
                                                    <h3 style={{fontWeight: "bold"}}>
                                                        Why should you care?
                                                    </h3>
                                                    <p>
                                                        {post.description}
                                                    </p>
                                        </Container>
                            <Container text style={{display: showComments ? "" : "none", margin: "20px"}}>
                                <Comments comments={post.comments} visible={showComments} />
                            </Container>

                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                gap: '10px',
                                maxWidth: '300px'
                            }}
                        >
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

                                        <h1 style={{fontSize: '2em'}}>
                                            Thank you for contributing. 
                                        </h1>
                                        
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

            

                        </div>


                    </div>


                </div>

                    <Grid.Row 
                        centered 
                        style={{marginTop: "10em",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                                }}
                    >
                        <Grid.Column>
                            <Container style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Header as ='h1' style={{fontSize: '4em'}}>
                                    Take more action.
                                </Header>
                                <Header as='h1'>
                                </Header>
                            </Container>
                            <Grid.Row centered style={{
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}>
                                <Grid.Column style={{padding: "10px"}}>
                                    <SuggestedGroups groups={suggestions} />
                                </Grid.Column>

                                <Grid.Column style={{padding: "10px"}}>
                                    <SimilarPostsComp posts={similarPosts} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>

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