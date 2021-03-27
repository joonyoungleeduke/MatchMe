import React from "react";
import UserInfo from "../APIComponents/UserInfo";
import PostInfo from "../APIComponents/PostInfo";
import ProfileInfo from "./ProfileInfo";

async function ParseComments(data) {
    for (let idx in data) {
        data[idx]['post_id'] = data[idx].post; 
        data[idx].post = await PostInfo(data[idx].post_id);
        data[idx]['user_id'] = data[idx].author;
        data[idx]['profile'] = await ProfileInfo(data[idx].user_id);
        data[idx].author = await UserInfo(data[idx].user_id);
    }

    return data; 
}

export default ParseComments;