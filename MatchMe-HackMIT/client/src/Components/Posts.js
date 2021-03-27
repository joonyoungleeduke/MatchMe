import React, { Component, useState, useEffect, useReducer } from "react";
import { render } from "react-dom";
import axiosInstance from "../User/axiosApi";
import ParsePosts from "../APIComponents/ParsePosts";
import {Nav} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FeedCard from "./FeedCard";
import { BiBorderNone } from "react-icons/bi";
import { Container } from "semantic-ui-react";

function Posts(props) {

    return (
        <div style={{ width: "100%", marginTop: 20}}>
            {props.posts.map(post => (
                // <FeedCard isMatch={post.isMatch} post={post} img={props.img}/>
                
                <FeedCard isMatch={post.isMatch} post={post}/>

            ))}
        </div>
    );

}

export default Posts;
