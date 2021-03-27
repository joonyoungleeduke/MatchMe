import React, { Component } from "react";
import axiosInstance from "../User/axiosApi";
import { withRouter } from "react-router-dom";
import {FaHandsHelping} from "react-icons/fa"


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('api/auth/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            const response2 = await axiosInstance.get('api/auth/user/id/');

            localStorage.setItem('user_id', response2.data);

            if (response.status === 200) {
                this.props.history.push("/feed");
            }
        
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
                <div className="container justify-content-center align-items-center"> 
                <div class="row justify-content-center">
                    <h2 style={{marginBottom: 30}}>Welcome Back</h2>
                    <div class="col-md-9" style={styles.login_form}>
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <input name="username" type="username" className="form-control inputField" placeholder="Username" onChange={this.handleChange} value={this.state.username} 
                                />
                            </div>
                            <div class="form-group">
                                <input name="password" type="password" className="form-control inputField" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" >Log In</button>
                        </form>
                    </div>
                </div>
                </div>     
            
        )
    }
}

const styles = {
    login_form: {
        "box-shadow": "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);"
    },
};


export default withRouter(Login);