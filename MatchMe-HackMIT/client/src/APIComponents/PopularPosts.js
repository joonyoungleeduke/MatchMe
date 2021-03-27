import React from "react";
import axiosInstance from "../User/axiosApi";

async function PopularPosts() {
    try {
        const response = await axiosInstance.get('api/posts/trending/');

        return response.data; 

    } catch (error) {
        console.log(error);
    }
};

export default PopularPosts;
