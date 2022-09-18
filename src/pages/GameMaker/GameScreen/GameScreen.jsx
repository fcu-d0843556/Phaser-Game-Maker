import React, { Component } from 'react'

import './GameScreen.css'

export default class GameScreen extends Component {

  render() {
    return (
        <div className="phone-style">
            <div className="phone" id="phaser-container"></div>
        </div>
    )
  }
}
