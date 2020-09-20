import React from "react";
import axiosInstance from "../User/axiosApi";

function PostInfo(post_id) {
    async function PostInfo(post_id) {
        try {
            const response = await axiosInstance.get('api/posts/' + post_id.toString() + "/");

            return response.data; 

        } catch (error) {
            console.log(error);
        }
    };

    return PostInfo(post_id);

}


export default PostInfo;