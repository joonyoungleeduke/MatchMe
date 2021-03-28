import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DropDown = (props) => {

    return (
      <Dropdown
        text={props.text}
        selection
        search
        style={{width: 250}}
      >
        <Dropdown.Menu style={{marginBottom: 5}}>
          <Dropdown.Divider />
          <Dropdown.Menu scrolling>
            {props.options.map((option) => (
              <Dropdown.Item key={option.value} {...option} />
            ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    );
}
    

export default DropDown;