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

    // fields = ['id', 'content', 'group', 'author']
    // optional_fields = ['hearts', 'matches', 'isMatch', 'goal']

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
                            // value = {form.group}
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

// import React, { Component } from "react";
// import axiosInstance from "../User/axiosApi";
// import { withRouter } from "react-router-dom";
// import {FaHandsHelping} from "react-icons/fa"

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {username: "", password: ""};

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({[event.target.name]: event.target.value});
//     }
    

//     async handleSubmit(event) {
//         event.preventDefault();
//         try {
//             const response = await axiosInstance.post('api/auth/token/obtain/', {
//                 username: this.state.username,
//                 password: this.state.password
//             });
//             axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;

//             localStorage.setItem('access_token', response.data.access);
//             localStorage.setItem('refresh_token', response.data.refresh);

//             const response2 = await axiosInstance.get('api/auth/user/id/');

//             localStorage.setItem('user_id', response2.data);

//             if (response.status === 200) {
//                 this.props.history.push("/feed");
//             }
        
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     }

//     render() {
//         return (
//                 <div className="container justify-content-center align-items-center"> 
//                 <div class="row justify-content-center">
//                     <h2 style={{marginBottom: 30}}>Welcome Back</h2>
//                     <div class="col-md-9" style={styles.login_form}>
//                         <form onSubmit={this.handleSubmit}>
//                             <div class="form-group">
//                                 <input name="username" type="username" className="form-control inputField" placeholder="Username" onChange={this.handleChange} value={this.state.username} 
//                                 />
//                             </div>
//                             <div class="form-group">
//                                 <input name="password" type="password" className="form-control inputField" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
//                             </div>
//                             <button type="submit" className="btn btn-primary btn-block" >Log In</button>
//                         </form>
//                     </div>
//                 </div>
//                 </div>     
            
//         )
//     }
// }

// const styles = {
//     login_form: {
//         "box-shadow": "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);"
//     },
// };


// export default withRouter(Login);