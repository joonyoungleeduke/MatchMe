import React from "react";
import axiosInstance from "../User/axiosApi";

async function SubmitMatch(data) {
    try {
        const response = await axiosInstance.post('api/match/create/', {
            author: data.author, 
            match_post: data.match_post, 
        })
        
        return response; 

    } catch (error) {
        console.log(error);
    }
};

export default SubmitMatch;

// path('posts/<int:pk>/comments/', post_comments, name='posts-comments'),
// path('posts/<int:pk>/comments/create/', comments_create, name='comments-create'),
// path('comments/<int:pk>/update/', comments_update, name='comments-update'), # necessitated change in server/urls.py
// path('heart/create/', heart_create, name='heart-create'),
// path('match/create/', match_create, name='match-create'),




    // async handleSubmit(event) {
    //     event.preventDefault();
    //     try {
    //         const response = await axiosInstance.post('api/auth/register/', {
    //             username: this.state.username,
    //             email: this.state.email,
    //             password: this.state.password,
    //             first_name: this.state.first_name,
    //             last_name: this.state.last_name
    //         });
    //         if (response.status === 200) {
    //             this.props.history.push("/login");
    //         }

    //         return response;
    //     } catch (error) {
    //         console.log(error.stack);
    //         this.setState({
    //             errors:error.response.data
    //         });
    //     }
    // }
