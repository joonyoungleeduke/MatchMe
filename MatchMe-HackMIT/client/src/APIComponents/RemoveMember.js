import React from "react";
import axiosInstance from "../User/axiosApi";

async function RemoveMember(group_id, user_id) {
    try {
        const response = await axiosInstance.put('api/groups/' + group_id.toString() + '/remove_user/' + user_id.toString() + '/');

        return response; 

    } catch (error) {
        console.log(error);
    }
};

export default RemoveMember;




    // path('groups/<int:pk>/add_user/<int:user_id>/', add_member, name='add-member'),
