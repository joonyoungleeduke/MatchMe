import React from "react";
import axiosInstance from "../User/axiosApi";

async function CheckMatch(post_id, user_id) {
    try {
        const response = await axiosInstance.get('api/posts/' + post_id.toString() + "/matched/" + user_id.toString() + '/');

        return response.data; 

    } catch (error) {
        console.log(error);
    }

}

export default CheckMatch; 




//     path('posts/<int:pk>/hearted/<int:user_id>', post_hearted, name='heart-check'),
//     path('posts/<int:pk>/matched/<int:user_id>', post_matched, name='match-check'),
// ]