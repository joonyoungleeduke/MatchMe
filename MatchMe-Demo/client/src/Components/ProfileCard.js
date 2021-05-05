import React from 'react'
import { Card, Icon, Grid, Image} from 'semantic-ui-react'
import LabelWIm from "./LabelWIm";
import {BsFillLightningFill} from "react-icons/bs"
import {FaHandsHelping} from "react-icons/fa"


const ProfileCard = (props) => {
    return(
        <Card >
            <Image src={props.src} wrapped ui={false}/>
            
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          
          <Card.Description>
            <BsFillLightningFill size={18} style={{top: -10, marginRight: 7}}/>
              Inspired: {props.inspired} 
          </Card.Description>

          <Card.Description>
              <FaHandsHelping size={18} style={{top: -10, marginRight: 7}}/>
                Matched: {props.matched} 
          </Card.Description>
        </Card.Content>
      </Card>
  );
}

export default ProfileCard;

const style = {
  circle: {
    
  }
}