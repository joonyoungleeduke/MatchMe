import React from "react";
import GroupInfo from "../APIComponents/GroupInfo";
import UserInfo from "../APIComponents/UserInfo";
import ProfileInfo from "../APIComponents/ProfileInfo";
import AllPostComments from "../APIComponents/AllPostComments";
import ParseComments from "../APIComponents/ParseComments";
import CheckMatch from "../APIComponents/CheckMatch";
import CheckHeart from "../APIComponents/CheckHeart";

async function ParsePosts(data, user_id) {
    for (let idx in data) {

        data[idx].group = await GroupInfo(data[idx].group);
        data[idx]['user_id'] = data[idx].author; 

        if (data[idx].isMatch) {
            data[idx]['matched'] = await CheckMatch(data[idx].id, user_id);
        }
    
        data[idx]['hearted'] = await CheckHeart(data[idx].id, user_id); 


        data[idx]['profile'] = await ProfileInfo(data[idx].user_id);
        let comments = await AllPostComments(data[idx].id);
        data[idx]['comments'] = await ParseComments(comments);
        data[idx].author = await UserInfo(data[idx].user_id);
    }

    return data; 
}

export default ParsePosts;