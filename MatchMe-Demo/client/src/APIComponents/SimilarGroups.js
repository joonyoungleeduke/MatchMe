import React from "react";
import axiosInstance from "../User/axiosApi";

async function SimilarGroups(group_id) {
    try {
        const response = await axiosInstance.get('api/groups/similar/' + group_id.toString() + '/')
        console.log(response);
        return response.data; 

    } catch (error) {
        console.log(error);
    }
}


export default SimilarGroups;