import React from "react";
import axiosInstance from "../User/axiosApi";

async function RemoveHeart(post_id, user_id) {
    try {
        const response = await axiosInstance.post('api/heart/remove/' + post_id.toString() + '/' + user_id.toString() + '/')
        
        return response; 

    } catch (error) {
        console.log(error);
    }
};

export default RemoveHeart;



//     path('heart/remove/<int:post_id>/<int:user_id>', heart_remove, name='heart-remove'),
//     path('match/remove/<int:post_id>/<int:user_id>', match_remove, name='match-remove'),
// ]