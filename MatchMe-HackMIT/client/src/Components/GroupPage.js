import React, {useState} from 'react'
import FeedCard from "../Components/FeedCard";
import NavBar from "./NavBar";
import { Card, Icon, Grid} from 'semantic-ui-react'
import {BsFillLightningFill} from "react-icons/bs"
import {FaHandsHelping} from "react-icons/fa"

const GroupPage = (props) => {
    const handleButton = () => {
        if (props.groupjoined) {
            return (
                <button className="ui disabled button" style={{marginLeft: 50}}>
                <i className="user icon"></i>
                Joined
            </button>
            );
        } else {
            return (
            <button className="ui active button" style={{marginLeft: 50}}>
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
            <img src={props.groupimage} style={{width:120, paddingRight: 30}}/>
            {props.name}
            </div>
            <div style={{position: "absolute", fontSize: 19, top: 60, right: 45, display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                <div style={{marginRight: 30}}>
                <BsFillLightningFill size={20} style={{top: -10, marginRight: 7}}/>
                Actions: {props.actionscount} 2100
                </div>
                <div>
                <FaHandsHelping size={20} style={{top: -10, marginRight: 7}}/>
                Matches: {props.matchescount} 7500
                </div>
            </div>
            <div style={{fontSize: 20, flex: 1, flexDirection: "row", marginLeft: "auto", justifyContent:"space-between"}}>
                {props.membercount} Members
                {handleButton()}
                <button className="ui primary button invite" style={{marginLeft: 10}}>
                    <i className="plus icon"></i>
                    Invite
                </button>
            </div>
            
            
        </Card>
        <Grid style={{marginLeft: 70, marginRight: 70}}>
            <Grid.Column width={10}>
            </Grid.Column>
            <Grid.Column width={4}>
                <Card style={{marginRight: "auto", zIndex: -5, marginLeft: "auto", marginBottom: 30, 
                    paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}>
                <div style={{position: "absolute", zIndex: -2, backgroundColor: "#2185d0", top: 0, width: "100%", height: 50, right: 0}}></div>
                <div style={{fontSize: 25, marginBottom: 10}}>
                    About Us
                </div>
                <div>
                    {props.groupinfo}
                    GROUP INFO GOES HERE
                    <div style={{height: 150}}></div>
                </div>
                </Card>
                <Card style={{marginRight: "auto", zIndex: -5, marginLeft: "auto", marginBottom: 10, 
                    paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}>
                <div style={{position: "absolute", zIndex: -2, backgroundColor: "#2185d0", top: 0, width: "100%", height: 50, right: 0}}></div>
                <div style={{fontSize: 25, marginBottom: 10}}>
                    Community Goals
                </div>
                <div>
                    {props.groupgoals}
                    GOALS GO HERE
                    <div style={{height: 250}}></div>
                </div>
                </Card>
            </Grid.Column>
        
        </Grid>
        </div>

    );
}

export default GroupPage;