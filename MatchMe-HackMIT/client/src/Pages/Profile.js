import React, {Component} from 'react'
import NavBar from "../Components/NavBar";
import axiosInstance from "../User/axiosApi";
import {Grid, Modal, Button} from 'semantic-ui-react'
import UserGroups from "../APIComponents/UserGroups";
import ProfileInfo from "../APIComponents/ProfileInfo";
import UserInfo from "../APIComponents/UserInfo";
import UserPosts from "../APIComponents/UserPosts";
import ParsePosts from "../APIComponents/ParsePosts";
import UserComments from "../APIComponents/UserComments";
import ParseComments from "../APIComponents/ParseComments";
import FeedCard from "../Components/FeedCard";
import BigProfileCard from "../Components/BigProfileCard";
import GroupsCard from "../Components/GroupsCard";

class Profile extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      groups: [], // group. name, description, image 
      user: {}, // user.first_name, user.last_name
      profile: {}, // profile. bio, image, ind_matches, total_matches 
      posts: [], // post. content, group, author, hearts, matches, isMatch, goal
      comments: [], // comment. content, post 
    };
  }

  componentDidMount() {
    const user_id = localStorage.getItem('user_id');
    this.setPosts(user_id);
    this.setUser(user_id); 
    this.setGroups(user_id);
    this.setProfile(user_id); 
    this.setComments(user_id);
  }

  async setPosts(user_id) {
    let posts = await UserPosts(user_id);
    posts = ParsePosts(posts);

    let obj = this.state 

    posts.then(data => {
      obj.posts = data; 
      this.setState(obj); 
    })
  };

  async setUser(user_id) {
    let user = UserInfo(user_id);

    let obj = this.state; 

    user.then(data => {
      obj.user = data; 
      this.setState(obj);
    })
  };

  async setGroups(user_id) {
    let groups = UserGroups(user_id);

    let obj = this.state; 

    groups.then(data => {
      obj.groups = data; 
      this.setState(obj);
    })
  }

  async setProfile(user_id) {
    let profile = ProfileInfo(user_id);

    let obj = this.state; 

    profile.then(data => {
      obj.profile = data; 
      this.setState(obj);
    })
  }

  async setComments(user_id) {
    let comments = await UserComments(user_id);
    comments = ParseComments(comments);

    let obj = this.state; 

    comments.then(data => {
      obj.comments = data; 
      this.setState(obj);
    })
  }


  async handleLogout() {
      try {
          const response = await axiosInstance.post('/blacklist/', {
              "refresh_token": localStorage.getItem("refresh_token")
          });
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          axiosInstance.defaults.headers['Authorization'] = null;
          return response;
      }
      catch (e) {
          console.log(e);
      }
  };



  render (){
    return (
      <div>
        <NavBar />
        <Grid centered >
            <Grid.Row>
                <Grid.Column centered width={9}>
                <div style={{marginLeft: 15, fontSize: 30, marginBottom:20}}>
                Recent Activity
                </div>
                <div style={{marginRight: 20}}>
                    {this.state.posts.map(post => (
                        <FeedCard isMatch={post.isMatch} post={post} img={this.state.profile.image} />
                    ))}
                </div>
                </Grid.Column>

                <Grid.Column width={4}>
              <BigProfileCard className="profCard" first_name={this.state.user.first_name} last_name={this.state.user.last_name} src={this.state.profile.image} 
              inspired={this.state.profile.total_matches} matched={this.state.profile.ind_matches} 
              groups={this.state.groups} bio={this.state.profile.bio}/>
                
                  <GroupsCard header="Groups" groups={this.state.groups} img={this.state.profile.image} />
                </Grid.Column>

            </Grid.Row>

        </Grid>
    
      </div>

    );
  }
}

export default Profile;
