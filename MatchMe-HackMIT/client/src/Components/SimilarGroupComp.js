import React from 'react'
import { Card, Icon, Grid, Image, List} from 'semantic-ui-react'
import LabelWIm from "./LabelWIm";
import {BsFillLightningFill} from "react-icons/bs"
import {FaHandsHelping} from "react-icons/fa"
import {Link} from "react-router-dom";


const SimilarGroupComp = (props) => {
    return(
        <Card style={props.style}>
            <Card.Content header='Groups Like Us' />
            <Card.Content extra>
          <List.Content>
            <List selection vertical>
                {props.groups.map(group => (
                  <List.Item as={Link} to={"/group/" + group.id.toString()}>
                    <Image avatar src={group.image}/>
                    <List.Content>
                      <List.Header>
                        {group.name}
                      </List.Header>
                    </List.Content>
                  </List.Item>
                ))}
            </List>
          </List.Content>
            </Card.Content>
        </Card>
    );
}

export default SimilarGroupComp;