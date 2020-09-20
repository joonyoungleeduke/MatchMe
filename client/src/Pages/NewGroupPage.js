import React, {useState, useEffect} from 'react';
import ThemePosts from "../APIComponents/ThemePosts";
import NavBar from "../Components/NavBar";
import {Grid, Container, Header, Image, Label, Menu, Progress, Form, Button, Divider} from "semantic-ui-react";
import NewGroup from "../Components/NewGroup";

const NewGroupPage = (props) => {
    return (
        <div>
            <NavBar />
            <Grid centered columns={2}>
                <Grid.Column >
                    <Container text>
                        <NewGroup /> 
                    </Container>
                </Grid.Column>
            </Grid>
    </div>


    )
}

export default NewGroupPage; 