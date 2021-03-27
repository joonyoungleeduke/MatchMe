import React from "react";
import axiosInstance from "../User/axiosApi";

async function AllPostComments(post_id) {
    try {
        const response = await axiosInstance.get('api/posts/' + post_id.toString() + "/comments/");

        return response.data; 
    } catch (error) {
        console.log(error);
    }
};

export default AllPostComments;


// path('posts/<int:pk>/comments/', post_comments, name='posts-comments'),

