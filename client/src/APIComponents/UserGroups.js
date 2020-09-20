import React from "react";
import axiosInstance from "../User/axiosApi";

function UserGroups(user_id) {
    async function UserGroups(user_id) {
        try {
            const response = await axiosInstance.get('api/groups/user/' + user_id.toString() + "/");

            return response.data; 

        } catch (error) {
            console.log(error);
        }
    };

    return UserGroups(user_id);

}


export default UserGroups;
