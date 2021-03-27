import React from "react";
import axiosInstance from "../User/axiosApi";

async function AllGroups() {

    try {
        const response = await axiosInstance.get('api/groups/');

        return response.data; 

    } catch (error) {
        console.log(error);
    }

}


export default AllGroups;


// path('groups/', groups_list, name='groups-list'),
