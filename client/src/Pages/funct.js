import React, { Component } from "react";
import axiosInstance from "../User/axiosApi";

    export async function handleSubmit(event) {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        event.preventDefault();
        try {
            const response = await axiosInstance.post('api/auth/token/obtain/', {
                username: username,
                password: password
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