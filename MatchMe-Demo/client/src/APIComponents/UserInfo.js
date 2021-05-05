import React from "react";
import axiosInstance from "../User/axiosApi";

function UserInfo(user_id) {
    async function UserInfo(user_id) {
        try {
            const response = await axiosInstance.get('api/users/' + user_id.toString() + "/");

            return response.data; 

        } catch (error) {
            console.log(error);
        }
    };

    return UserInfo(user_id);

}


export default UserInfo;