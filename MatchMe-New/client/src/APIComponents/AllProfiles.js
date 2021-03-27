import React from "react";
import axiosInstance from "../User/axiosApi";

function AllProfiles() {
    async function AllProfiles() {
        try {
            const response = await axiosInstance.get('api/users/profiles/');

            return response.data; 

        } catch (error) {
            console.log(error);
        }

    };

    return AllProfiles();

}


export default AllProfiles;


// path('groups/', groups_list, name='groups-list'),
