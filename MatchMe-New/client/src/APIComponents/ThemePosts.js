import React from "react";
import axiosInstance from "../User/axiosApi";

async function ThemePosts(theme) {
    try {
        const response = await axiosInstance.get('api/posts/theme/' + theme + '/');

        return response.data; 

    } catch (error) {
        console.log(error);
    }
};

export default ThemePosts;

