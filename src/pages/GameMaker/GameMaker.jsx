import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
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

      let gameModifyDatas
      //get user data
      axios(
        {
          method: 'get',
          url: 'api1/getGameDatas',
          params: {
            gameId
          }
        }
      ).then(
        response => {
          
          gameModifyDatas = response.data
          this.setState({
            game: startGame(gameId,gameModifyDatas),
            gameModifyDatas
          })
        },
        error => {console.log(error);}
      )
      
      
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
