import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import './GameScreen.css'

export default class GameScreen extends Component {

  state = {
    mobileModifyMode: "modify"
  }

  componentDidMount(){
    PubSub.subscribe("setMobileModifyMode", (msg, mobileModifyMode) => {
      this.setState({
        mobileModifyMode
      })
    })
  }

  render() {
    const {mobileModifyMode} = this.state
    const {width} = this.props
    console.log(mobileModifyMode);
    return (
        <div>
          {
            width >= 576 ?
              <div className="phone-style">
                <div className="phone" id="phaser-container"></div>
              </div>
            : 
              <div style={{visibility: mobileModifyMode === "game" ? "visible" : "hidden", zIndex: 1}} className="phone-style">
                <div className="phone" id="phaser-container"></div>
              </div>
          }
        </div>
    )
  }
}
