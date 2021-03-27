import React from "react";
import axiosInstance from "../User/axiosApi";

function UserComments(user_id) {
    async function UserComments(user_id) {
        try {
            const response = await axiosInstance.get('api/users/' + user_id.toString() + "/comments/");

            return response.data; 

        } catch (error) {
            console.log(error);
        }
    };

    return UserComments(user_id);

}


export default UserComments;
