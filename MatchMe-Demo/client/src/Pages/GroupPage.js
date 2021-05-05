import React, {useState, useEffect} from 'react'
import NavBar from "../Components/NavBar";
import { Card, Icon, Grid} from 'semantic-ui-react'
import {BsFillLightningFill} from "react-icons/bs"
import {FaHandsHelping} from "react-icons/fa"
import GroupInfo from "../APIComponents/GroupInfo";
import GroupPosts from "../APIComponents/GroupPosts";
import ParsePosts from "../APIComponents/ParsePosts";
import ParseGroup from "../APIComponents/ParseGroup";
import Posts from "../Components/Posts";
import AddMember from "../APIComponents/AddMember";
import RemoveMember from "../APIComponents/RemoveMember";
import UserGroups from "../APIComponents/UserGroups";
import ParseAllPosts from "../APIComponents/ParseAllPosts";
import SimilarGroups from "../APIComponents/SimilarGroups";
import SimilarGroupComp from "../Components/SimilarGroupComp";

const GroupPage = (props) => {

    const [group, setGroup] = useState({});
    const [posts, setPosts] = useState([]);
    const [similarGroups, setSimilarGroups] = useState([]);
    const [membercount, setMembercount] = useState(1); 
    const [joined, setJoined] = useState(false);

    const group_id = props.groupID;
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        getGroup();
        getPosts();
        handleMemberStatus();
        getSimilarGroups(); 
    }, []);

    async function getSimilarGroups() {
        let groups = await SimilarGroups(group_id);
        setSimilarGroups(groups);
    }

    async function getPosts() {
        let data = await GroupPosts(group_id);
        await ParseAllPosts(data, setPosts, user_id);
    }

    async function handleMemberStatus() {
        let status = await checkMemberStatus(group_id);
        setJoined(status); 
    }

    async function checkMemberStatus(group_id) {
        let data = await UserGroups(user_id);

        console.log(data);

        for (let idx in data) {
            if (data[idx].id.toString() === group_id.toString()) {
                return true; 
            }
        }

        return false; 
        
    }
    
    async function getGroup() {
        let data = await GroupInfo(group_id);
        data = ParseGroup(data);

        data.then(data => {
            setGroup(data);
            setMembercount(data.total_users)
        })
    }

    async function handleAddMember() {
        let response = await AddMember(group_id, user_id);
        console.log(response.status);
        if (response.status === 201) {
            setJoined(true);
            setMembercount(membercount + 1);
        }
    }

    async function handleRemoveMember() {
        let response = await RemoveMember(group_id, user_id);
        console.log(response.status);
        if (response.status === 201) {
            setJoined(false); 
            setMembercount(membercount - 1);
        }
    }


    const handleButton = () => {
        if (joined) {
            return (
                <button 
                    className="ui button" 
                    style={{marginLeft: 50}}
                    onClick={handleRemoveMember}
                    >
                <i className="user icon"></i>
                Joined
            </button>
            );
        } else {
            return (
            <button 
                className="ui active button" 
                style={{marginLeft: 50}}
                onClick={handleAddMember}
                >
                <i className="user icon"></i>
                Join
            </button>
            );
        }
    }

    return (
        <div>
            <NavBar />
            
            <Card style={{width: "65%", marginRight: "auto", marginLeft: "auto", marginBottom: 40, 
            paddingTop: 30, paddingBottom: 30, paddingLeft: 40, paddingRight: 40}}>
                <div style={{fontSize: 40, marginTop: 5}}>
                <img src={group.image} style={{width:120, paddingRight: 30}}/>
                {group.name}
                </div>
                <div style={{position: "absolute", fontSize: 19, top: 60, right: 45, display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                    <div style={{marginRight: 30}}>
                    <BsFillLightningFill size={20} style={{top: -10, marginRight: 7}}/>
                    Actions: {group.actions} 
                    </div>
                    <div>
                    <FaHandsHelping size={20} style={{top: -10, marginRight: 7}}/>
                    Matches: {group.matches} 
                    </div>
                </div>
                <div style={{fontSize: 20, flex: 1, flexDirection: "row", marginLeft: "auto", justifyContent:"space-between"}}>
                    {membercount} Members
                    {handleButton()}
                    <button className="ui primary button invite" style={{marginLeft: 10}}>
                        <i className="plus icon"></i>
                        Invite
                    </button>
                </div>
                
                
            </Card>
            <Grid centered>
                <Grid.Column width={7} style={{marginRight: 32}}>

                    <Posts  posts={posts} img={props.image}/>

                </Grid.Column>
                <Grid.Column width={3}>
                    <Card style={{zIndex: -5, marginLeft: "auto", marginBottom: 30, marginTop: 30,
                        paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}>
                    <div style={{position: "absolute", zIndex: -2, backgroundColor: "#2185d0", top: 0, width: "100%", height: 50, right: 0}}></div>
                    <div style={{fontSize: 25, marginBottom: 10, color: 'white'}}>
                        About Us
                    </div>
                    <div>
                        {group.description}
                        <div style={{height: 50}}></div>
                    </div>
                    </Card>


                    <SimilarGroupComp 
                            groups={similarGroups} 
                            style={{fontSize: 20, 
                                    marginBottom: 10, 
                                    color:'white',
                                    marginLeft: "auto",
                                }}
                    />
                </Grid.Column>
            
            </Grid>
        </div>

    );
}

export default GroupPage;