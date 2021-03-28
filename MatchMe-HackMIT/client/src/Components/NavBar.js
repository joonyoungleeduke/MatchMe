import React, {useState} from 'react'
import {Navbar, Nav,} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import {BiPaperPlane} from "react-icons/bi"
import {FaUserAlt} from "react-icons/fa"
import {TiHome} from "react-icons/ti"
import {FaHandsHelping} from "react-icons/fa"
import axiosInstance from "../User/axiosApi";
import _ from "lodash";
import DropDown from "./DropDown";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search'
import { fade, makeStyles } from '@material-ui/core/styles'
import AllGroups from "../APIComponents/AllGroups";
import AllThemes from "../APIComponents/AllThemes";

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

const NavBar = (props) => {
  const classes = useStyles();

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


  const [all_themes, setAllThemes] = useState([]);

  const [all_groups, setAllGroups] = useState([]);

  async function getThemes() {
    let results = await AllThemes(); 
    return results; 
  }

  async function parseThemes(themes) {
    let arr = Array();
    for (let idx in themes) {
      arr.push({
        key: themes[idx],
        text: themes[idx],
        value: themes[idx],
        href: '/theme/' + themes[idx],
      })
    }
    console.log(arr);
    setAllThemes(arr);  
  }

  async function parseOptions(groups) {
    let arr = Array();
    for (let idx in groups) {
      arr.push({
        key: groups[idx].name,
        text: groups[idx].name,
        value: groups[idx].name,
        image: {avatar:true, src: groups[idx].image},
        href: '/group/' + groups[idx].id.toString(),
      })
    }
    setAllGroups(arr);
  }

  function groupPostReducer(state, action) {
    switch (action.type) {
      case 'OPEN_MODAL' :
        return { showpost: true, dimmer: action.dimmer }
      case 'CLOSE_MODAL' : 
        return { showpost: false }
      default: 
        throw new Error(); 
    }
  }
  
  const [group_state, handleGroupPost] = React.useReducer(groupPostReducer, {
    showpost: false, 
    dimmer: undefined, 
  })

  function handleGroupPostChange(state) {
    handleGroupPost(state);
  }

  React.useEffect(() => {
    let data = getGroups();
    data.then((data) => {
      parseOptions(data)
    })
    let data2 = getThemes();
    data2.then((data) => {
      parseThemes(data); 
    })
  }, []);

  return (
    <div>
    <Navbar bg="primary" variant="dark" fixed="top">
    <div style={{marginLeft: 10}}>
        <FaHandsHelping size={30} color="white"/>
      </div>
    <LinkContainer to="/feed" >
    <Nav.Link >
      <Navbar.Brand href="#home" style={{fontSize: 23}}className="pr-2">MatchMe</Navbar.Brand>
      </Nav.Link >
    </LinkContainer>
      <div style={{marginRight: 20}}>

      <DropDown options={all_groups} text={'Groups'} />

      </div>

      <div style={{marginRight: 20}}>

      <DropDown options={all_themes} text={'Tags'} />

      </div>

      <div style={{width: 500}}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search', color: 'white'}}
        />
      </div>


      </div>


      <Nav className="ml-auto">

        <LinkContainer to="/feed">
          <Nav.Link >
            <div style={{ textAlign: "center", marginBottom: 2}}>
              <TiHome size={25}/>
            </div>
            Home
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/create/group">
          <Nav.Link >
            <div style={{ textAlign: "center", marginBottom: 2}}>
              <BiPaperPlane size={25}/>
            </div>
          New Group
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/feed">
          <Nav.Link >
            <div style={{ textAlign: "center", marginBottom: 2}}>
              <BiPaperPlane size={25}/>
            </div>
            Message
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/profile" >
        <Nav.Link>
            <div style={{ textAlign: "center", marginBottom: 2}}>
              <FaUserAlt style={{fontSize: 25}}/>
            </div>
            Profile
          </Nav.Link>
      </LinkContainer>
      </Nav>
    </Navbar>
    <div style={{paddingTop: 120}}></div>
  </div>
  )

}

export default NavBar;