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
      // console.log(game.scene);
      game.scene.stop(gameScene)
      game.scene.start(type)
      this.setState({
        gameScene: type
      })
    }
  }

  render() {
    const gameScenes = [
      {name: "Shooting"},
      {name: "Quiz"},
      {name: "PokeGetItem"},
      {name: "CatchFruit"},
      {name: "Cooking"},
      
    ]

    return (
        <div className="container-fluid">
          <GameScreen></GameScreen>
          <EditScreen></EditScreen>
          {
            gameScenes.map((gameSceneObj)=>{
              return <Button key={gameSceneObj.name} onClick={this.changeScene(gameSceneObj.name)} type="primary">{gameSceneObj.name} scene</Button>
            })
          }
        </div>
    )
  }
}
