import React, { Component } from 'react'
import {Button} from 'antd'

//Pages
import GameScreen from './GameScreen/GameScreen'
import EditScreen from './EditScreen/EditScreen'

import startGame from '../../PhaserGame'

export default class GameMaker extends Component {

  state = {
    game: {},
    gameScene: "Quiz"
  }

  componentDidMount(){
    this.setState({
      game: startGame()
    })
  }

  changeScene = (type) => {
    return () => {
      const {game,gameScene} = this.state
      console.log(game.scene);
      game.scene.stop(gameScene)
      game.scene.start(type)
      this.setState({
        gameScene: type
      })
    }
  }

  render() {
    return (
        <div className="container-fluid">
          <GameScreen></GameScreen>
          <EditScreen></EditScreen>
          <Button onClick={this.changeScene('Shooting')} type="primary">shooting scene</Button>
          <Button onClick={this.changeScene('Quiz')} type="primary">quiz scene</Button>
          <Button onClick={this.changeScene('PokeGetItem')} type="primary">PokeGetItem scene</Button>
        </div>
    )
  }
}
