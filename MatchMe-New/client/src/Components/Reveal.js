import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

export default class Reveal extends Component {
  state = { activeIndex: 1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
          style={{color: "#a6a6a6"}}
        >
          <Icon name={this.props.iconName} />
          {this.props.labelName}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0} style={{width: "100%"}}>
          {this.props.children}
        </Accordion.Content>
      </Accordion>
    )
  }
}
