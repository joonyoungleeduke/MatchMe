import React, {useState, useEffect} from "react";
import GroupInfo from "../APIComponents/GroupInfo";
import GroupPosts from "../APIComponents/GroupPosts";
import ParsePosts from "../APIComponents/ParsePosts";

const IndGroup = (props) => { // props must include group id 
    const [group, setGroup] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getGroup();
        getPosts();
    }, {});

    async function getPosts() {
        let data = await GroupPosts(props.group_id);
        data = ParsePosts(data);

        data.then(data => {
            setPosts(data); 
        })

    }
    
    async function getGroup() {
        let data = GroupInfo(props.group_id);

        data.then(data => {
            setGroup(data);
        })
    }

    return (
        <div>
            {posts.map(post => {
                <div>
                    {post.author.first_name}
                    {post.author.last_name}
                    {post.profile.image}
                    {post.profile.bio}
                    {post.profile.ind_matches}
                    {post.profile.total_matches}
                </div>   
            })}
            <div>
                {group.name}
                {group.description}
                {group.image}
                {group.theme}
            </div>    
        </div>
    )
}

export default IndGroup; 



// import React, { Component, useState, useEffect } from "react";
// import { render } from "react-dom";
// import axiosInstance from "../User/axiosApi";
// import ParsePosts from "../APIComponents/ParsePosts";


// function Posts() {
//     const [posts, setPosts] = useState([]);
//     const [matches, setMatches] = useState([]); 

//     useEffect(() => {
//         postFetch({ limit:10 });
//     }, []);    

//     async function setterPosts(data) {
//         data = await ParsePosts(data);

//         let posts = data.filter(post => post.isMatch === false);
//         let matches = data.filter(post => post.isMatch === true);

//         setPosts(posts);
//         setMatches(matches);
//     }

//     async function postFetch(pagination) {
//         try {
//             var limit = pagination.limit; 
//             var id = localStorage.getItem("user_id");
//             const response = await axiosInstance.get('api/posts/interests/' + id.toString() + "/" + limit.toString() + "/");
            
//             const data = response.data;

//             await setterPosts(data);

//             return response.data; 
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div>
//             {/* <InfiniteScroll
//                 pageStart = {0}
//                 loadMore = {() => postFetch({ limit: posts.length + matches.length + 10 })}
//                 hasMore = {true || false}
//                 useWindow = {false}
//                 loader = {
//                     <div key="loading" className="loader">
//                         Loading...
//                     </div>
//                 }
//             >  */}
//                 {matches.map(match => ( // group.name, group.description, group.image, group.theme
//                     <div>
//                         <h1>MATCH POST</h1>
//                         {match.content}
//                         {match.hearts}
//                         {match.author.first_name}
//                         {match.author.last_name}
//                         <img src={match.profile.image} />
//                         {match.group.name}
//                         {match.group.description}
//                         {match.matches}
//                         {match.goal}
//                     </div>
//                 ))

//                 }
//                 {posts.map(post => (
//                     <div>
//                         <h1>REGULAR POST</h1>
//                         {post.content}
//                         {post.hearts}
//                         {post.author.first_name}
//                         {post.author.last_name}
//                         {post.group.name}
//                         {post.group.description}
//                     </div>
//                 ))}
//             {/* </InfiniteScroll> */}
//         </div>
//     );

// }

// export default Posts;
