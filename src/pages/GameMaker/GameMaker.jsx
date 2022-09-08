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
          items: [
            {
              parent: "background",
              name: "background",
              modifyTitle: "遊 戲 背 景",
              img: {
                type: "png",
                src: "/img/Games/Common/background.png",
                position: {
                  x: 400,
                  y: 320
                },
                size: 100
              }
            }
          ]
        },
        timeText: {
          modifyTitle: "時 間 文 字 方 塊",
          name: "timeText",
          items: [
            {
              parent: "timeText",
              name: "timeText",
              modifyTitle: "時 間 文 字 方 塊",
              text: {
                modifyTitle: "時 間",
                description: "當接到、擊破道具時會出現的文字",
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
          
          
        },
        balloon: {
          modifyTitle: "氣 球",
          name: "balloon",
          items: [
            {
              parent: "balloon",
              name: "balloon1",
              modifyTitle: "氣 球 1",
              img: {
                src: "/img/Games/ShootingGame/balloon1.png",
                position: {
                  x: 400,
                  y: 320
                },
                size: 55
              },
              text: {
                modifyTitle: "氣 球 擊 破 文 字",
                description: "擊破氣球時會顯示出的文字",
                content: "祝你天天開心！",
              }
            },
            {
              parent: "balloon",
              name: "balloon2",
              modifyTitle: "氣 球 2",
              img: {
                src: "/img/Games/ShootingGame/balloon2.png",
                position: {
                  x: 400,
                  y: 320
                },
                size: 55
              },
              text: {
                modifyTitle: "氣 球 擊 破 文 字",
                description: "擊破氣球時會顯示出的文字",
                content: "祝你事事順利！",
              }
            }
          ]
        }
      }

      this.setState({
        game: startGame(gameId,gameModifyDatas),
        gameModifyDatas
      })
      
      PubSub.subscribe("setFormDatas", (msg,datas)=>{
        const {parent} = datas.values
        const {items} = this.state.gameModifyDatas[parent]
        console.log("data", datas);
        console.log(items);
        const newItems = items.map((itemObj)=>{
          if(itemObj.name === datas.values.name){
            return datas.values
          }else{
            return itemObj
          }
        })
        console.log("new", newItems);
        this.setState({
          gameModifyDatas: {...gameModifyDatas, [parent]: {
            ...gameModifyDatas[parent],
            items: newItems
          }}
        })
      })

      PubSub.subscribe("refreshGame", (msg)=>{
        const {game,gameId,gameModifyDatas} = this.state
        // console.log("gameModifyDatas",gameModifyDatas);
        game.scene.stop()
        game.scene.start(gameId,gameModifyDatas)

      })

  }

  render() {
    const {gameModifyDatas} = this.state
    console.log("game: ", gameModifyDatas);
    return (
        <div className="container-fluid">
          <GameScreen></GameScreen>
          {/* <EditScreen gameId={this.props.gameId}></EditScreen> */}
          <EditScreen gameModifyDatas={gameModifyDatas}></EditScreen>

        </div>
    )
  }
}
