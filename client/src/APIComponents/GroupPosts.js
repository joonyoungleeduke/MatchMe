import React from "react";
import axiosInstance from "../User/axiosApi";

function GroupPosts(group_id) {
    async function GroupPosts(group_id) {
        try {
            const response = await axiosInstance.get('api/groups/' + group_id.toString() + "/posts/");

            return response.data; 

        } catch (error) {
            console.log(error);
        }
    };

    return GroupPosts(group_id);

}


export default GroupPosts;