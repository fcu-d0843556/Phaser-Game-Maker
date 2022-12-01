import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import './GameScreen.css'

export default class GameScreen extends Component {

  state = {
    mobileModifyMode: "game"
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
    const {width,height} = this.props
    // console.log(width, height);
    return (
        <div>
          {
            width >= 845 ?
              
                <div className={height >= 850 ? "phone-style": ""}>
                  <div id="phaser-container"></div>
                </div>
              
            : 
              <div style={{visibility: mobileModifyMode === "game" ? "visible" : "hidden"}} 
                  className={width >= 440 && height >= 850 ? "phone-style game-style-top" : "" }>

                <div  
                  className={mobileModifyMode === "game" ? "game-style-top" : "" }
                  id="phaser-container"></div>

              </div>
          }
        </div>
    )
  }
}
