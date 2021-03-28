import React, { Component, useState, useEffect } from "react";
import axiosInstance from "../User/axiosApi";
import { Modal, Card, Form, Image, List, Transition, Button, Popup, TextArea, Input, Header } from 'semantic-ui-react';
import AllThemes from "../APIComponents/AllThemes";

const NewGroup = (props) => {
    const[form, setForm] = useState({
        theme: 'null',
        name: "",
        description: '',
    });

    const [all_themes, setAllThemes] = useState([]);

    async function getThemes() {
        let results = await AllThemes(); 
        let result = setThemes(results);
        result.then((data) => {
            setAllThemes(data); 
        })
    }

    async function setThemes(results) {
        let arr = Array(); 
        for (let idx in results) {
            arr.push(results[idx]);
        }
        return arr; 
    }

    useEffect(() => {
        getThemes();
    }, []);   

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('api/groups/create/', {
                name: form.name,
                description: form.description,
                theme: form.theme, 
            });

            if (response.status === 200) {
                console.log('hi')
            }

            console.log(response);

            return response;
        } catch (error) {
            console.log(error.stack);
        }
    };

    const handleChange = (e, { value })  => {
        const obj = {...form};
        obj.content = value; 
        setForm(obj); 
    }

    const handleSelectChange = (e, { value }) => {
        const obj = {...form};
        obj.group = value; 
        console.log(obj);
        setForm(obj);
    }

    return (
        <div>
                <Header as='h1' style={{fontSize: '4em'}}>
                    New Group
                </Header>
                <Form onSubmit={(e) => handleSubmit(e)} id="new-group-form">
                    <Form.Group widths='equal'>
                        {console.log(all_themes)}
                        <Form.Select
                            required 
                            fluid 
                            name='theme'
                            options={all_themes}
                            placeholder="What is your group's focus?"
                            onChange = {handleSelectChange}
                        />
                    </Form.Group>

                    <Form.Field control={Input} required name='name'  placeholder="What is your group's name?" onChange = {handleChange}/>

                    <Form.Field 
                        required 
                        control={TextArea}
                        name='description'
                        placeholder='What is your group about?'
                        onChange = {handleChange}
                    />

                    <Button positive type="submit" value="submit" form="new-group-form">Create</Button>
                </Form>
        </div>
    );
}

export default NewGroup;