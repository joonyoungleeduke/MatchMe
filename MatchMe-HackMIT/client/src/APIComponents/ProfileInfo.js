import React from "react";
import axiosInstance from "../User/axiosApi";

function ProfileInfo(user_id) {
    async function ProfileInfo(user_id) {
        try {
            const response = await axiosInstance.get('api/users/' + user_id.toString() + "/profile/");

            return response.data; 

        } catch (error) {
            console.log(error);
        }
    };

    return ProfileInfo(user_id);

}


export default ProfileInfo;