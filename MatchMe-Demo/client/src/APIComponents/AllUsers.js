import React from "react";
import axiosInstance from "../User/axiosApi";

function AllUsers() {
    async function AllUsers() {
        try {
            const response = await axiosInstance.get('api/users/');

            return response.data; 

        } catch (error) {
            console.log(error);
        }

    };

    return AllUsers();

}


export default AllUsers;


// path('groups/', groups_list, name='groups-list'),
