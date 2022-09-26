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
          // console.log("data",response.data );
          this.setState({
            game: startGame(gameId,gameModifyDatas),
            gameModifyDatas
          })
        },
        error => {console.log(error);}
      )
      
      PubSub.subscribe("getGameId",(msg)=>{
        const {gameId} = this.state
        return gameId
      })

      PubSub.subscribe("setFormDatas", (msg,datas)=>{
        const {parent} = datas.values
        const {items} = this.state.gameModifyDatas[parent]
        const {gameModifyDatas} = this.state

        const newItems = items.map((itemObj)=>{
          if(itemObj.name === datas.values.name){
            return datas.values
          }else{
            return itemObj
          }
        })
        
        // console.log("new", newItems,gameModifyDatas);
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

      PubSub.subscribe("publishGame", (msg)=>{
        console.log("let's publishGame!");

        const {gameId,gameModifyDatas} = this.state
        const username = localStorage.getItem('username')
        console.log(gameId,gameModifyDatas);
        console.log("username",username);
        axios({
          method: 'post',
          url: '/api1/publishGame',
          params: {
            gameId,
            gameModifyDatas,
            username
          }
        }).then(
          response => {
            console.log(response);
          },
          error => {console.log(error);}
        )
        // console.log("gameModifyDatas",gameModifyDatas);
        // game.scene.stop()
        // game.scene.start(gameId,gameModifyDatas)
      })
  }

  render() {
    const {gameModifyDatas,gameId} = this.state
    // console.log("game: ", gameModifyDatas);
    return (
        <div className="container-fluid">
          <GameScreen></GameScreen>
          {/* <EditScreen gameId={this.props.gameId}></EditScreen> */}
          <EditScreen gameModifyDatas={gameModifyDatas} gameId={gameId}></EditScreen>
        </div>
    )
  }
}
