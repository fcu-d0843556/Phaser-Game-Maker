import React, { Component } from 'react'

//Pages
import GameScreen from './GameScreen/GameScreen'
import EditScreen from './EditScreen/EditScreen'

import startGame from '../../PhaserGame'

export default class GameMaker extends Component {

  componentDidMount(){
    console.log('11');
    startGame()
  }

  render() {
    return (
        <div className="container-fluid">
          <GameScreen></GameScreen>
          <EditScreen></EditScreen>
        </div>
    )
  }
}
