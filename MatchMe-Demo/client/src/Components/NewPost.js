import React, { Component, useState, useEffect } from "react";
import axiosInstance from "../User/axiosApi";
import { Modal, Card, Form, Image, List, Transition, Button, Popup, TextArea, Input } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import {AiFillPicture, AiFillPropertySafety} from "react-icons/ai";
import {FiLink} from "react-icons/fi";
import {BsFillCameraVideoFill} from "react-icons/bs"
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

const NewPost = (props) => {

    const[options, setOptions] = useState([]);
    const[form, setForm] = useState({
        group: "",
        title: "",
        description: ""
    });
    const [match_form, setMatchForm] = useState({
        group: "", 
        title: "",
        description: "",
        isMatch: true, 
        goal: 10, 
    })

    useEffect(() => {
        console.log(match_form);
    }, [match_form])

    useEffect(() => {
        parseOptions()
    }, []);   

    async function parseOptions() {

        var groups = await groupsFetch();

        var options_arr = new Array();  

        for (let idx in groups) { 
            options_arr.push({
                text: groups[idx].name, 
                value: groups[idx].id,
            });
        }

        console.log(options_arr);

        setOptions(options_arr);
    };

    async function groupsFetch() {
        try {
            var id = localStorage.getItem("user_id");
            const response = await axiosInstance.get('api/groups/user/' + id.toString() + "/");

            return response.data;

        } catch (error) {
            console.log(error);
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('api/posts/create/', {
                group: form.group,
                title: form.title,
                description: form.description,
            });

            if (response.status === 200) {
                props.handlePostChange({type: 'CLOSE_MODAL'})
            }

            console.log(response);

            return response;
        } catch (error) {
            console.log(error.stack);
        }
    };

    async function handleMatchSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('api/posts/create/', {
                group: match_form.group, 
                title: match_form.title,
                description: match_form.description,
                isMatch: match_form.isMatch, 
                goal: match_form.goal, 
            });

            if (response.status == 200) {
                props.handleMatchPostChange({type: 'CLOSE_MODAL'})
            }

            console.log(response);

            return response; 


        } catch (error) {
            console.log(error.stack);
        }
    }

    const handleTitleChange = (e, { value })  => {
        setForm({
            ...form,
            title: value,
        })
    }

    const handleDescChange = (e, {value}) => {
        setForm({
            ...form,
            description: value,
        })
    }

    const handleGroupSelectChange = (e, { value }) => {
        setForm({
            ...form,
            group: value,
        })
    }

    const handleMatchSelectChange = (e, { value }) => {
        setMatchForm({
            ...match_form,
            group: value,
        })
    }

    const handleMatchTitleChange = (e, { value })  => {
        setMatchForm({
            ...match_form, 
            title: value,
        }) 
    }

    const handleMatchDescChange = (e, { value })  => {
        setMatchForm({
            ...match_form,
            description: value,
        }) 
    }

    const handleGoalChange = (e, value) => {
        setMatchForm({
            ...match_form,
            goal: value,
        })
    }

    const handleBlur = () => {
        if (match_form.goal < 0) {
            handleGoalChange('', 0);
        } else if (match_form.goal > 1000) {
            handleGoalChange('', 1000);
        }
    }

    const handleGoalInputChange = (event) => {
        handleGoalChange('', event.target.value === '' ? '' : Number(event.target.value));
    }

    return (
        <div>
            <Card style={styles.card} >
                <List selection horizontal verticalAlign='middle'>
                    <List.Item onClick={() => props.handlePostChange({type: 'OPEN_MODAL' })} style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <Image avatar>
                            <List.Icon name="edit outline" size="large" />
                        </Image>
                        <List.Content style={{}}>
                                <h5>Talk to the World!</h5>
                        </List.Content>
                    </List.Item>
                    <List.Item onClick={() => props.handleMatchPostChange({type: 'OPEN_MODAL'})}>
                        <Image avatar>
                            <List.Icon name="bullhorn" size="large" />
                        </Image>                        
                        <List.Content style={{}}>
                                <h5>Initiate Action!</h5>
                        </List.Content>
                    </List.Item>
                </List>
                <List selection horizontal>
                <Popup content='Link' basic trigger={
                    <List.Item>
                        <List.Content>
                            <FiLink size = {30} className="attachButton"/>
                        </List.Content>
                    </List.Item>
                } />
                <Popup content='Image/Video' trigger={
                    <List.Item>
                        <List.Content>
                            <AiFillPicture size={35} className="attachButton"/>
                        </List.Content>
                    </List.Item>
                } />
                <Popup content='Event' trigger={
                    <List.Item>
                        <List.Content>
                            <Image size="tiny" className="attachButton">
                                <List.Icon name = "map pin" size="large" />
                            </Image>
                        </List.Content>
                    </List.Item>
                } />
                </List>
            </Card>

            <Transition visible={props.state.showpost} animation='scale' duration={500}>
                <Modal 
                    dimmer={props.state.dimmer}
                    open={props.state.showpost}
                    onClose = {() => props.handlePostChange({ type: 'CLOSE_MODAL' })}
                >
                    <Modal.Header>
                        New Post
                    </Modal.Header>

                    <Modal.Content>
                        <List verticalAlign="middle">
                            <List.Item>
                                <Image avatar src={props.profile.image} />
                                <List.Content>
                                    {props.name}
                                </List.Content>
                            </List.Item>
                        </List>
                        <Form onSubmit={(e) => handleSubmit(e)} id="new-post-form">
                            <Form.Group widths='equal'>
                                <Form.Select
                                    required 
                                    fluid 
                                    name='group'
                                    options={options}
                                    placeholder='What group do you want to share to?'
                                    onChange = {handleGroupSelectChange}
                                />
                            </Form.Group>

                            <Form.Field control={Input} required name='title'  placeholder="What is the quick version?" onChange = {handleTitleChange}/>

                            <Form.Field 
                                required 
                                control={TextArea}
                                name='description'
                                placeholder='Tell us more.'
                                onChange = {handleDescChange}
                            />

                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                            <Button color="black" onClick={() => props.handlePostChange({type: 'CLOSE_MODAL' })}>Close</Button>
                            <Button positive type="submit" value="submit" form="new-post-form">Post</Button>
                    </Modal.Actions>

                </Modal>
            </Transition>

            <Transition visible={props.match_state.showpost} animation='scale' duration={500}>
                <Modal 
                    closeIcon
                    dimmer={props.match_state.dimmer}
                    open={props.match_state.showpost}
                    onClose = {() => props.handleMatchPostChange({ type: 'CLOSE_MODAL' })}
                >
                    <Modal.Header>
                        New Action
                    </Modal.Header>

                    <Modal.Content>
                        <List verticalAlign="middle">
                            <List.Item>
                                <Image avatar src={props.profile.image} />
                                <List.Content>
                                    {props.name}
                                </List.Content>
                            </List.Item>
                        </List>
                        <Form onSubmit={(e) => handleMatchSubmit(e)} id="new-post-form">
                            <Form.Group widths='equal'>
                                <Form.Select
                                    fluid 
                                    name='group'
                                    options={options}
                                    placeholder='What group did you want to share to?'
                                    onChange = {handleMatchSelectChange}
                                />
                            </Form.Group>
                            <Form.Field control={Input} required name='title'  placeholder="What action did you take?" onChange = {handleMatchTitleChange}/>

                            <Form.Field 
                                required 
                                control={TextArea}
                                name='description'
                                placeholder='Tell us your reason for taking it.'
                                onChange = {handleMatchDescChange}
                            />

                            <Form.Group style={styles.slider}>
                                <Typography id="goal-slider">
                                    Match Goal 
                                </Typography>
                                <Grid container spacing = {2} alignItems="center">
                                    <Grid item xs>
                                        <Slider 
                                        value={typeof match_form.goal === 'number' ? match_form.goal : 0}
                                        name="goal"
                                        min={10}
                                        max={1000}
                                        step={10}
                                        valueLabelDisplay="off"
                                        onChange={handleGoalChange}
                                        />    
                                    </Grid>
                                    <Grid item>
                                        <Input 
                                            styles={styles.input}
                                            value={match_form.goal}
                                            margin="dense"
                                            onChange={handleGoalInputChange}
                                            onBlur={handleBlur}
                                            inputProps={{
                                                step: 10, 
                                                min: 0, 
                                                max: 1000, 
                                                type: 'number',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Form.Group>

                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                            <Button color="black" onClick={() => props.handleMatchPostChange({type: 'CLOSE_MODAL' })}>Close</Button>
                            <Button positive type="submit" value="submit" form="new-post-form">Post</Button>
                    </Modal.Actions>

                </Modal>
            </Transition>

        </div>
    );
}


const styles = {
    card: {
        padding: 10,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    slider: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    input: {
        width: 42, 
    }
}


export default NewPost;