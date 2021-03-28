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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



function searchReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState 
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query}
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results }
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection }
    
    default: 
      throw new Error() 
  }
}

const LandingNav = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useReducer(searchReducer, initialState)
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
 
    <div class="mx-auto" style={{display: "flex", justifyContent:"center", paddingTop: 10}}>
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


{/* <button onClick={this.handleLogout}>Logout</button> */}

export default LandingNav;