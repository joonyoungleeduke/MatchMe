import React from "react";
import GroupInfo from "../APIComponents/GroupInfo";
import UserInfo from "../APIComponents/UserInfo";
import ProfileInfo from "../APIComponents/ProfileInfo";
import AllPostComments from "../APIComponents/AllPostComments";
import ParseComments from "../APIComponents/ParseComments";
import CheckMatch from "../APIComponents/CheckMatch";
import CheckHeart from "../APIComponents/CheckHeart";

async function ParsePost(post, user_id) {

    if (post.isMatch) {
        post['matched'] = await CheckMatch(post.id, user_id);
    }

    post['hearted'] = await CheckHeart(post.id, user_id); 

    post.group = await GroupInfo(post.group);    
    post['user_id'] = post.author; 
    post['profile'] = await ProfileInfo(post.user_id);
    let comments = await AllPostComments(post.id);
    post['comments'] = await ParseComments(comments);
    post.author = await UserInfo(post.user_id);

    return post; 
}

export default ParsePost;