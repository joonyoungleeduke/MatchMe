import React, {useState, useEffect, useReducer} from 'react'
import FeedCard from "../Components/FeedCard";
import NavBar from "../Components/NavBar";
import { Card, Icon, Grid, Segment, Button, Container} from 'semantic-ui-react'
import GroupsCard from "../Components/GroupsCard";
import ProfileCard from "../Components/ProfileCard"
import NewPost from "../Components/NewPost";
import SuggestedGroups from '../Components/SuggestedGroups';
import {Nav} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import GroupPosts from "../APIComponents/GroupPosts";
import UserGroups from "../APIComponents/UserGroups";
import UserInfo from "../APIComponents/UserInfo";
import ProfileInfo from "../APIComponents/ProfileInfo";
import GroupSuggestions from "../APIComponents/GroupSuggestions";
import InterestPosts from "../APIComponents/InterestPosts";
import SpecificPosts from "../APIComponents/SpecificPosts";
import Posts from "../Components/Posts";
import ParseAllPosts from "../APIComponents/ParseAllPosts";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function postReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL' :
      return { showpost: true, dimmer: action.dimmer }
    case 'CLOSE_MODAL' : 
      return { showpost: false }
    default: 
      throw new Error(); 
  }
}


const Home = (props) => {

  function updatePosts() {
      getPosts(user_id, limit);
  }

  const [explore, setExplore] = useState(true);
  const [posts, setPosts] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);

  const [state, handlePost] = React.useReducer(postReducer, {
    showpost: false, 
    dimmer: undefined,
  })

  function handlePostChange(state) {
    handlePost(state);
  }

  const [match_state, handleMatchPost] = React.useReducer(postReducer, {
    showpost: false, 
    dimmer: undefined, 
  })

  function handleMatchPostChange(state) {
    handleMatchPost(state);
  }


  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [groups, setGroups] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // group suggestions 

  const user_id = localStorage.getItem('user_id');

  const limit = 10; // limit on # posts 

  useEffect(() => {
      getPosts(user_id, limit);
      getExplorePosts(user_id, limit);
      getGroups(user_id);
      getUser(user_id);
      getProfile(user_id);
      getSuggestions(user_id);
  }, []);

  async function getSuggestions(user_id) {
    let suggestions = GroupSuggestions(user_id);
    suggestions.then(data => {
      setSuggestions(data);
    })

  }

  const handleToggle = (event) => {
    setExplore(!explore);
  }

  async function getPosts(user_id, limit) {
    let posts = await SpecificPosts(user_id, limit);
    await ParseAllPosts(posts, setPosts, user_id); 
  }

  async function getExplorePosts(user_id, limit) {
    let posts = await InterestPosts(user_id, limit);
    await ParseAllPosts(posts, setExplorePosts, user_id);
    }
  

  async function getGroups(user_id) {
    let groups = UserGroups(user_id);
    groups.then(data => {
      setGroups(data);
    })
  }

  async function getUser(user_id) {
    let user = UserInfo(user_id);

    user.then(data => {
      setUser(data);
    })
  };

  async function getProfile(user_id) {
    let profile = ProfileInfo(user_id);

    profile.then(data => {
      setProfile(data);
    })
  }

    return (
      <div>
          <NavBar/>

          <Grid centered>
            <Grid.Row>
                <Grid.Column width={3} >
                  <LinkContainer to="/profile">
                  <Nav.Link >
                      <ProfileCard className="profCard" name={user.first_name + " " + user.last_name} src={profile.image ? profile.image : "../Images/default.png"} 
                      inspired={profile.total_matches} matched={profile.ind_matches} 
                      groups={groups} />
                      </Nav.Link>
                    </LinkContainer>

                    <GroupsCard header="Your Groups" name={props.name} src={props.src} inspired={props.inspired} matched={props.matched} groups={groups} img={profile.image}/>

                </Grid.Column>



                  <Grid.Column centered width={5}>

                    <NewPost name = {user.first_name + " " + user.last_name} profile = {profile} match_state = {match_state} state={ state } handlePostChange={handlePostChange} handleMatchPostChange={handleMatchPostChange} />

                    <Posts posts={explore ? explorePosts : explorePosts} curr_user={user.id} updatePosts={updatePosts} img={profile.image} />

                  </Grid.Column>


                  <Grid.Column width={3}>

                    <SuggestedGroups groups={suggestions} img={profile.image}/>



                  </Grid.Column>

              </Grid.Row>

          </Grid>

      </div>

    );
}

export default Home;


const styles = {
  filter: {
    margin: "10px",
    height: "auto",
    top: "auto",
    left: 'auto',
    bottom: 'auto', 
    right: 'auto',
  },
}

// .modal {
//   height: auto;
//   top: auto;
//   left: auto; 
//   bottom: auto; 
//   right: auto;
// }