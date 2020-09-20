import React from "react";
import axiosInstance from "../User/axiosApi";

function GroupSuggestions(user_id) {
    async function GroupSuggestions(user_id) {
        try {
            const response = await axiosInstance.get('api/groups/user/' + user_id.toString() + "/suggestions/");

            return response.data; 

        } catch (error) {
            console.log(error);
        }

    };

    return GroupSuggestions(user_id);

}


export default GroupSuggestions;



    // path('groups/user/<int:pk>/suggestions', groups_suggestion, name='group-suggestions'),
