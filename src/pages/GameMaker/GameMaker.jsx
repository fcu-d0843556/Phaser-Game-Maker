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

      //獲取server端的資料，可以獲取默認資料或使用者資料
      PubSub.subscribe("getGameData",(msg,type)=>{
        this.getGameData(type)
      })
      
      this.getGameData()

      //獲取遊戲的ID
      PubSub.subscribe("getGameId",(msg)=>{
        const {gameId} = this.state
        return gameId
      })

      //預覽變化後做的操作，存儲更改的資料
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
        
        this.setState({
          gameModifyDatas: {...gameModifyDatas, [parent]: {
            ...gameModifyDatas[parent],
            items: newItems
          }}
        })
      })

      //重開一次遊戲
      PubSub.subscribe("refreshGame", (msg)=>{
        const {game,gameId,gameModifyDatas} = this.state
        game.scene.stop()
        game.scene.start(gameId,gameModifyDatas)
      })

      //發佈遊戲
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

  getGameData = (type) => {
    console.log("dd");
        const {gameId} = this.props.location.state
        let gameModifyDatas
        //get user data
        axios(
          {
            method: 'get',
            url: 'api1/getGameDatas',
            params: {
              gameId,
              username: localStorage.getItem('username'),
              userMode: "modify",
              actionType: type
            }
          }
        ).then(
          response => {
            
            gameModifyDatas = response.data.gameDatas
            console.log("message: ",response.data.message );
            if(type === "default"){
              this.setState({gameModifyDatas})
              PubSub.publish("refreshGame")
            }else{
              this.setState({
                game: startGame(gameId,gameModifyDatas,"modifyGame"),
                gameModifyDatas
              })
            }
            
          },
          error => {console.log(error);}
        )
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
