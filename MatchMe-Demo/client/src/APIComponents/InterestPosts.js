import React from "react";
import axiosInstance from "../User/axiosApi";

async function InterestPosts(user_id, limit) {
    try {
        const response = await axiosInstance.get('api/posts/interests/' + user_id.toString() + "/" + limit.toString() + "/");

        return response.data; 

    } catch (error) {
        console.log(error);
    }
};

export default InterestPosts;


//         var limit = pagination.limit; 
//         var id = localStorage.getItem("user_id");
//         const response = await axiosInstance.get('api/posts/interests/' + id.toString() + "/" + limit.toString() + "/");