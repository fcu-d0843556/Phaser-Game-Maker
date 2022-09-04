import React, { Component } from 'react'
import {Button} from 'antd'

//Pages
import GameScreen from './GameScreen/GameScreen'
import EditScreen from './EditScreen/EditScreen'

import startGame from '../../PhaserGame'

export default class GameMaker extends Component {

  state = {
    game: {}
  }

  componentDidMount(){
    this.setState({
      game: startGame()
    })
  }

  changeScene = () => {
      const {game} = this.state
      console.log(game.scene);
      game.scene.start('shooting')
  }

  render() {
    return (
        <div className="container-fluid">
          <GameScreen></GameScreen>
          <EditScreen></EditScreen>
          <Button onClick={this.changeScene} type="primary">next scene</Button>
        </div>
    )
  }
}
