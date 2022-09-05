import React, { Component } from 'react'
import {Button} from 'antd'
 

//Pages
import GameScreen from './GameScreen/GameScreen'
import EditScreen from './EditScreen/EditScreen'

import startGame from '../../PhaserGame'

export default class GameMaker extends Component {

  state = {
    game: {},
    gameModifyDatas: [],
  }

  componentDidMount(){
    const {gameId} = this.props.location.state

    //get user data

    //result get background object
    const gameModifyDatas = [
      {
        modifyTitle: "遊 戲 背 景",
        name: "background",
        type: "png",
        src: "/img/Games/Common/background.png",
        position: {
          x: 400,
          y: 320
        },
        size: 100
      },
      {
        modifyTitle: "時 間 文 字 方 塊",
        name: "timeText",
        text: {
          content: "time",
          style: {
            fontSize: 32,
            fill: "#000"
          },
          x: 16,
          y: 54
        }
      }
      
    ]

    this.setState({
      game: startGame(gameId,gameModifyDatas),
      gameModifyDatas
    })
  }

  render() {
    const {gameModifyDatas} = this.state

    return (
        <div className="container-fluid">
          <GameScreen></GameScreen>
          <EditScreen gameModifyDatas={gameModifyDatas}></EditScreen>
        </div>
    )
  }
}
