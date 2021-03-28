import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile"
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Posts from "./Components/Posts";
import Landing from "./Pages/Landing";
import IndPost from "./Pages/IndPost";
import GroupPage from "./Pages/GroupPage";
import IndProfile from "./Pages/IndProfile";
import ThemePosts from "./Pages/ThemePosts";
import NewGroupPage from "./Pages/NewGroupPage";

export default function Routes() {
  return (
    <Switch>
      <Route exact path={"/login"} component={Login}/>

      <Route exact path={"/register"} component={Register}/>

      <Route exact path="/feed">
        <Home />
      </Route>

      <Route exact path="/">
        <Landing />
      </Route>  

      <Route exact path="/posts">
        <Posts />
      </Route>

      <Route path="/post/:id" render={(props) => (
        <IndPost postID={props.match.params.id}/>
      )}/>

      <Route path="/group/:id" render={(props) => (
        <GroupPage groupID={props.match.params.id}/>
      )}/>

      <Route exact path="/profile">
        <Profile/>
      </Route>

      <Route path='/profile/:id' render={(props) => (
        <IndProfile userID={props.match.params.id}/>
      )}/>

      <Route path='/theme/:str' render={(props) => (
        <ThemePosts theme={props.match.params.str}/>
      )}/>

      <Route exact path='/create/group'>
        <NewGroupPage />
      </Route>

    </Switch>
  );
}