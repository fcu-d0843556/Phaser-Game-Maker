import React, { Component } from 'react'

//Pages
import GameScreen from './GameScreen/GameScreen'
import EditScreen from './EditScreen/EditScreen'

export default class GameMaker extends Component {
  render() {
    return (
        <div className="container-fluid">
          <GameScreen></GameScreen>
          <EditScreen></EditScreen>
        </div>
    )
  }
}
