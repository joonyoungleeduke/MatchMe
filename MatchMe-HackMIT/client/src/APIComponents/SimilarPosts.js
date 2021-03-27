import React from "react";
import axiosInstance from "../User/axiosApi";

async function SimilarPosts(group_id, post_id) {
    try {
        const response = await axiosInstance.get('api/posts/similar/' + group_id + '/' + post_id + '/')
        console.log(response);
        return response.data; 

    } catch (error) {
        console.log(error);
    }
}


export default SimilarPosts;