import React, {useState} from 'react'
import { Card, Icon, Grid, List, Form, Button, Image, Modal, Transition} from 'semantic-ui-react'

const InterestCard = (props) => {
    const [select, setSelect] = useState(false);

    return (
        <div className="col interest" onClick={() => {setSelect(!select)}} style={{textAlign: "center", backgroundColor: select ? "lightgray" : "none"}} >
            {props.name}
            <img src={props.src} style={{width: 110, borderRadius: "5%", marginTop: 5}} />
    </div>
    );
}
export default InterestCard;