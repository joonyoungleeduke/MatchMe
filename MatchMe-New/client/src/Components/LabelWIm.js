import React from 'react'
import { Label } from 'semantic-ui-react'

const LabelWIm = (props) => (
  <div>
    <Label as='a' image size="large" 
      style={{paddingRight: 15, paddingLeft: 15, paddingTop: 10, paddingBottom: 10}}>
        <img src={props.src} />
        {props.username}
    </Label>
  </div>
)

export default LabelWIm