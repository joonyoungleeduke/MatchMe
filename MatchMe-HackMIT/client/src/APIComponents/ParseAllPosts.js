import React from 'react'
import ParsePosts from "./ParsePosts";

async function ParseAllPosts (posts, setPostInfo, user_id) {

    async function setterPosts() {
        
        let data = await ParsePosts(posts, user_id);
        
        setPostInfo(data);
    }

    await setterPosts(); 

}

export default ParseAllPosts;


// const [posts, setPosts] = useState([]);
// const [matches, setMatches] = useState([]); 

// useEffect(() => {
//     postFetch({ limit:10 });
// }, []);    

// async function setterPosts(data) {
//     data = await ParsePosts(data);

//     let posts = data.filter(post => post.isMatch === false);
//     let matches = data.filter(post => post.isMatch === true);

//     setPosts(posts);
//     setMatches(matches);
// }

// async function postFetch(pagination) {
//     try {
//         var limit = pagination.limit; 
//         var id = localStorage.getItem("user_id");
//         const response = await axiosInstance.get('api/posts/interests/' + id.toString() + "/" + limit.toString() + "/");
        
//         const data = response.data;

//         await setterPosts(data);

//         return response.data; 
//     } catch (error) {
//         console.log(error);
//     }
// };