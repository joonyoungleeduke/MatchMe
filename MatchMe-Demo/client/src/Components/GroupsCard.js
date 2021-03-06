import React from 'react'
import { Card, Image, List} from 'semantic-ui-react'
import {Link} from "react-router-dom";

const GroupsCard = (props) => {
    return (
      <Card style={{textDecoration: "none"}}>
        <Card.Content>
          <Card.Header>{props.header}</Card.Header>
        </Card.Content>
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

export default GroupsCard;