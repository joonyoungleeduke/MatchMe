import React from "react";
import axiosInstance from "../User/axiosApi";

function UserPosts(user_id) {
    async function UserPosts(user_id) {
        try {
            const response = await axiosInstance.get('api/users/' + user_id.toString() + "/posts/");

            return response.data; 

        } catch (error) {
            console.log(error);
        }
    };

    return UserPosts(user_id);

}


export default UserPosts;
