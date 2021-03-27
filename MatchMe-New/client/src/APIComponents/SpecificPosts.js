import React from "react";
import axiosInstance from "../User/axiosApi";
import { ListItemSecondaryAction, ListItemText } from "@material-ui/core";

async function SpecificPosts(user_id, limit) {
    try {
        const response = await axiosInstance.get('api/posts/specific/' + user_id.toString() + "/" + limit.toString() + "/");

        return response.data; 

    } catch (error) {
        console.log(error);
    }
};

export default SpecificPosts;



    // path('posts/specific/<int:pk>/<int:limit>/', posts_specific, name='posts-specific'),
