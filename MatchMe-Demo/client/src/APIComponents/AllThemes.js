import React from "react";
import axiosInstance from "../User/axiosApi";

async function AllThemes() {

    try {
        const response = await axiosInstance.get('api/themes/');

        return response.data; 

    } catch (error) {
        console.log(error);
    }

}


export default AllThemes;