import React from "react";
import axiosInstance from "../User/axiosApi";

function GroupInfo(group_id) {
    async function groupDetailFetch(group_id) {
        try {
            const response = await axiosInstance.get('api/groups/' + group_id.toString() + "/");

            return response.data; 

        } catch (error) {
            console.log(error);
        }
    };

    return groupDetailFetch(group_id);

}


export default GroupInfo;