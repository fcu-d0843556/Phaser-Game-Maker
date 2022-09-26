import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
import {Button} from 'antd'
 

//Pages
import GameScreen from './GameScreen/GameScreen'
import EditScreen from './EditScreen/EditScreen'
import RenderGameDone from './RenderGameDone/RenderGameDone'

//Phaser Game
import startGame from '../../PhaserGame'

export default class GameMaker extends Component {

  state = {
    gameId: '',
    game: {},
    gameModifyDatas: {},

    isRenderDone: false,
    gameUrl: ""
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

        this.setState({isRenderDone: false})

        const {gameId,gameModifyDatas} = this.state
        const username = localStorage.getItem('username')


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
            this.setState({
              isRenderDone: true,
              gameUrl: response.data.gameUrl
            })
            // console.log("response",response.data);
          },
          error => {console.log("error",error);}
        )

      })
  }

  render() {
    const {gameModifyDatas,gameId,isRenderDone,gameUrl} = this.state
    // console.log("game: ", gameModifyDatas);
    return (
        <div className="container-fluid">
          {isRenderDone ? <RenderGameDone gameUrl={gameUrl}/> : <div/>}
          <GameScreen></GameScreen>
          <EditScreen gameModifyDatas={gameModifyDatas} gameId={gameId}></EditScreen>
        </div>
    )
  }
}
