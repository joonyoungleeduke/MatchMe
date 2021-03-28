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