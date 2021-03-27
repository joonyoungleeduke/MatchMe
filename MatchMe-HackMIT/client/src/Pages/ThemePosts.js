import React, {useState, useEffect} from 'react';
import ThemePosts from "../APIComponents/ThemePosts";
import NavBar from "../Components/NavBar";
import {Grid, Container, Header, Image, Label, Menu, Progress, Form, Button, Divider} from "semantic-ui-react";
import Posts from "../Components/Posts";
import ParsePosts from "../APIComponents/ParsePosts";

const ThemePost = (props) => {

    const theme = props.theme; 
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        let data = await ThemePosts(theme);
        data = ParsePosts(data);
        data.then((data) => {
            setPosts(data);
        })
    }

    useEffect(() => {
        getPosts(); 
    })

    return (
        <div>
        <NavBar />
        <Grid centered columns={2}>
            <Grid.Column >
                <Container text>
                    <Container textAlign="center">
                        <Header as='h1' style={{fontSize: '4em'}}>
                                {theme}
                        </Header>
                    </Container>
                    <Posts posts={posts} />
                </Container>
            </Grid.Column>
        </Grid>

    </div>


    )
}

export default ThemePost; 