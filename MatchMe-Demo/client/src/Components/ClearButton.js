import React from 'react'

const ClearButton = (props) => {
    return (
        <div className="cbutton" style={{
            paddingRight: 3, paddingLeft: 3, paddingTop: 5, paddingBottom: 5,
            borderRadius: "50%", alignItems: "center"}}>
            {props.children}
        </div>
    );
}

export default ClearButton;