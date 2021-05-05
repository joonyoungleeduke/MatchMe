import React from 'react'
import { Card, Icon, Grid, Image, List} from 'semantic-ui-react'
import LabelWIm from "./LabelWIm";
import {BsFillLightningFill} from "react-icons/bs"
import {FaHandsHelping} from "react-icons/fa"

const SuggestedGroups = (props) => {
    return(
        <Card>
            <Card.Content header='Suggested Groups' />
            <Card.Content extra>
            <List.Content>
            <List selection vertical>
                  {props.groups.map(group => (
                    <List.Item as="a" href={"/group/" + group.id.toString()}>
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

export default SuggestedGroups;