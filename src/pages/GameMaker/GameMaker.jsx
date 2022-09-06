import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button} from 'antd'
 

//Pages
import GameScreen from './GameScreen/GameScreen'
import EditScreen from './EditScreen/EditScreen'

import startGame from '../../PhaserGame'

export default class GameMaker extends Component {

  state = {
    gameId: '',
    game: {},
    gameModifyDatas: {},
  }

  componentDidMount(){
      const {gameId} = this.props.location.state
      this.setState({gameId}) 

    
      //get user data

      //result get background object
      const gameModifyDatas = {
        background: {
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
        timeText: {
          modifyTitle: "時 間 文 字 方 塊",
          description: "當接到、擊破道具時會出現的文字",
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
        },
        balloon: {
          modifyTitle: "時 間 文 字 方 塊",
          name: "balloon",
          items: [
            {
              modifyTitle: "氣 球 1",
              name: "balloon1",
              text: "祝你天天開心！",
              src: "src/assets/balloon1.png",
              size: 55
            },
            {
              modifyTitle: "氣 球 2",
              name: "balloon2",
              text: "祝你事事順利！",
              src: "src/assets/balloon2.png",
              size: 55
            }
          ]
        },gun: {
          modifyTitle: "舉 槍 的 圖 片",
          name: "gun",
          type: "png",
          src: "/img/Games/ShootingGame/gun.png",
          position: {
            x: 200,
            y: 210
          },
          size: 50
        },
      }

      this.setState({
        game: startGame(gameId,gameModifyDatas),
        gameModifyDatas
      })
      
      PubSub.subscribe("setFormDatas", (msg,datas)=>{
        this.setState({
          gameModifyDatas: {...gameModifyDatas, [datas.name]: datas.values}
        })
      })
  }

  render() {
    const {gameModifyDatas} = this.state
    // console.log(gameModifyDatas);
    return (
        <div className="container-fluid">
          <GameScreen></GameScreen>
          {/* <EditScreen gameId={this.props.gameId}></EditScreen> */}
          <EditScreen gameModifyDatas={gameModifyDatas}></EditScreen>

        </div>
    )
  }
}
