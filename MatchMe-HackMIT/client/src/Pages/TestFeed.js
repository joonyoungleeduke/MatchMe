import React, {Component} from 'react'
import NavBar from "../Components/NavBar";
import axiosInstance from "../User/axiosApi";
import { Icon} from 'semantic-ui-react'
import * as Color from "../Components/Color";
import Posts from "../Components/Posts";

class TestFeed extends Component {
  constructor() {
    super();
}

  render (){
    return (
        <div>
            <NavBar />
            <Posts />
        </div>
    );
  }
}

export default TestFeed;
