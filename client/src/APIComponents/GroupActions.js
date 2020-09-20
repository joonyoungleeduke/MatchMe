import React from "react";
import axiosInstance from "../User/axiosApi";

async function GroupActions(group_id) {
    try {
        const response = await axiosInstance.get('api/groups/actions/' + group_id.toString() + "/");

        return response.data; 

    } catch (error) {
        console.log(error);
    }

}

export default GroupActions; 





// function GroupInfo(group_id) {
//     async function groupDetailFetch(group_id) {
//         try {
//             const response = await axiosInstance.get('api/groups/' + group_id.toString() + "/");

//             return response.data; 

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return groupDetailFetch(group_id);

// }


// export default GroupInfo;


// path('groups/actions/<int:pk>/', group_action_total, name='group-action-total'),
// path('groups/matches/<int:pk>/', group_match_total, name='group-match-total'),
