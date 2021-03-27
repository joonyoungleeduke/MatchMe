import React from "react";
import ParseComments from "./ParseComments";

async function ParseAllComments(comments, setCommentInfo) {

    async function setterComments() {
        let data = await ParseComments(comments);

        setCommentInfo(data);
    }

    await setterComments(); 

}

export default ParseAllComments;


// async function ParseAllPosts (posts, setPostInfo) {

//     async function setterPosts() {
//         let data = await ParsePosts(posts);

//         setPostInfo(data);
//     }

//     await setterPosts(); 

// }

// export default ParseAllPosts;

