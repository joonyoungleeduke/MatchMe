import React, { Component } from "react";
import axiosInstance from "../User/axiosApi";
import { withRouter } from "react-router-dom";
import {FaHandsHelping} from "react-icons/fa"
import {Modal, Image, Button, Icon} from "semantic-ui-react"
import InterestCard from "../Components/InterestCard"


class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            password: "",
            email:"",
            open: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setOpen = this.setOpen.bind(this);
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    setOpen(event) {
        this.setState({[event.target.name]: !event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response1 = await axiosInstance.post('api/auth/register/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name
            });
            const response = await axiosInstance.post('api/auth/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });

            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;

            localStorage.setItem('username', this.state.username);
            localStorage.setItem('password', this.state.password);

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            const response2 = await axiosInstance.get('api/auth/user/id/');

            localStorage.setItem('user_id', response2.data);

            if (response2.status === 200) {
                this.props.func(false);
                this.props.func1(true);
            }
            return response2;
        } catch (error) {
            console.log(error.stack);
            this.setState({
                errors:error.response.data
            });
        }
    }

    render() {
        return (
            <div className="container justify-content-center align-items-center">
                <div className="row justify-content-center">
                    <h3 style={{marginBottom: 40, marginTop: 20}}>Find Your Community.</h3>
                    <div className="col-md-9" style={styles.register_form}>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="username" name="username" className="form-control" placeholder="Username" onChange={this.handleChange} value={this.state.username}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="first_name" className="form-control" placeholder="First Name" onChange={this.handleChange} value={this.state.first_name}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="last_name" className="form-control" placeholder="Last Name" onChange={this.handleChange} value={this.state.last_name}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="email" className="form-control" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
                            </div>
                            <button type="submit" value="submit" className="btn btn-primary btn-block" >Register</button>
                        </form>
                    </div>
                </div>

            </div>    
        )
    }
}

const styles = {
    register_form: {
        "box-shadow": "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);"
    },
};

export default withRouter(Register);