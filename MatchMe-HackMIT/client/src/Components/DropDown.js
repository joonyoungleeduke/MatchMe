import React, { useEffect, useState } from 'react'
import { Dropdown, Input } from 'semantic-ui-react'

const DropDown = (props) => {

    // async function setterOptions() {
    //   let arr = await parseOptions();
    //   setOptions(arr);
    // }

    return (
        <Dropdown
        text={props.text}
        selection
        search
        style={{width: 250}}
      >
        <Dropdown.Menu style={{marginBottom: 5}}>
          <Dropdown.Divider />
          {/* <Dropdown.Header icon='tags' content='Tag Label' /> */}
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