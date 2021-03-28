import React, {Component, useState} from 'react'
import {Navbar, Button, Nav,} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { Icon, Search} from 'semantic-ui-react'
import {BiPaperPlane} from "react-icons/bi"
import {FaUserAlt} from "react-icons/fa"
import {TiHome} from "react-icons/ti"
import {FaHandsHelping} from "react-icons/fa"
import axiosInstance from "../User/axiosApi";
import SearchResults from "../APIComponents/SearchResults";
import _ from "lodash";
import DropDown from "./DropDown";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search'
import { fade, makeStyles } from '@material-ui/core/styles'
import AllGroups from "../APIComponents/AllGroups";

const initialState = {
  loading: false, 
  results: [], 
  value: '',
}

const LandingNav = (props) => {
  async function handleLogout() {
    try {
      const response = await axiosInstance.post('logout/', {
        "refresh_token": localStorage.getItem("refresh_token")
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      axiosInstance.defaults.headers['Authorization'] = null; 
      return response; 
    }
    catch (e) {
      console.log(e);
    }
  }

  async function getGroups() {
    let results = await AllGroups(); 
    return results; 
  }

  const [all_groups, setAllGroups] = useState([]);

  async function parseOptions(groups) {
    let arr = Array();
    for (let idx in groups) {
      arr.push({
        key: groups[idx].name,
        text: groups[idx].name,
        value: groups[idx].name,
        image: {avatar:true, src: groups[idx].image},
      })
    }
    setAllGroups(arr);
  }


  React.useEffect(() => {
    let data = getGroups();
    data.then((data) => {
      parseOptions(data)
    })
  }, []);

  return (
    <div>
    <Navbar bg="primary" variant="dark" fixed="top"
    >

    <div className="mx-auto" style={{display: "flex", justifyContent:"center", paddingTop: 10}}>
        <div style={{paddingTop: 10}}>
            <FaHandsHelping size={30} color="white"/>
        </div>
        <LinkContainer to="/">
            <Nav.Link >
                <Navbar.Brand href="#home" style={{fontSize: 23}}className="pr-2">MatchMe</Navbar.Brand>
            </Nav.Link >
        </LinkContainer>
    </div>

    </Navbar>
    <div style={{paddingTop: 120}}></div>
  </div>
  )

}

export default LandingNav;