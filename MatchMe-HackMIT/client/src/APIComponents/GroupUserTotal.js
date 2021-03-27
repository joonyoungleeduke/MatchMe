import React from "react";
import axiosInstance from "../User/axiosApi";

async function GroupUserTotal(group_id) {
    try {
        const response = await axiosInstance.get('api/groups/users/total/' + group_id.toString() + "/");

        return response.data; 

    } catch (error) {
        console.log(error);
    }

}

export default GroupUserTotal; 




    // path('groups/users/total/<int:pk>/', group_total_users, name='group-users-total'),
