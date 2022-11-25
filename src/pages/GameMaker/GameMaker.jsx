import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
import cloneDeep from 'lodash.clonedeep';

import {Button,Row,Col} from 'antd'
 

//Pages
import GameScreen from './GameScreen/GameScreen'
import EditScreen from './EditScreen/EditScreen'
import RenderGameDone from './RenderGameDone/RenderGameDone'

//Phaser Game
import startGame from '../../PhaserGame'

import './GameMaker.less'

export default class GameMaker extends Component {

  state = {
    gameId: '',
    game: {},
    gameModifyDatas: {},
    username: '',

    height: window.innerHeight, 
    width: window.innerWidth,

    isRenderDone: false,
    gameUrl: ""
  }

  updateDimensions = () => {
    this.setState({
      height: window.innerHeight, 
      width: window.innerWidth
    });
  }

  componentDidMount(){
      window.addEventListener("resize", this.updateDimensions);

      this.setState({username: localStorage.getItem('username')})
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

        let curParent = this.state.gameModifyDatas[datas.values.parent]

        //移除掉多餘的key
        delete datas.values.darwerName
        delete datas.values.gameId
        delete datas.values.username
        delete datas.values.width

        let newGameModifyDatas
        if(curParent !== undefined){
          for(let i=0;i<curParent.items.length;i++){
            if(curParent.items[i].name === datas.name && datas.name !== ''){
              newGameModifyDatas = this.state.gameModifyDatas
              // console.log(datas,newGameModifyDatas);
              
              newGameModifyDatas[datas.values.parent].items[i] = cloneDeep(datas.values)
            }
          }
          this.setState({gameModifyDatas: newGameModifyDatas})
        }
      })

      //用來新增、刪除不需要的item項
      PubSub.subscribe("ChangeAllItemsDatas", (msg,datas)=>{
        let newGameModifyDatas = this.state.gameModifyDatas
        if(newGameModifyDatas[datas.parent] !== undefined){
          newGameModifyDatas[datas.parent].items = cloneDeep(datas.items)
          this.setState({gameModifyDatas: newGameModifyDatas})
        }
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
    // console.log("dd");
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
            
            gameModifyDatas = cloneDeep(response.data.gameDatas)
            // console.log("message: ",response.data.message );
            if(type === "default"){
              this.setState({gameModifyDatas})
              // console.log("dd",gameModifyDatas);
              PubSub.publishSync('backToDefaultDatas',gameModifyDatas)
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
    const {gameModifyDatas,gameId,isRenderDone,gameUrl,username} = this.state
    const {height,width} = this.state
    // console.log("gamedata: ", gameModifyDatas);
    return (
        
        <div className="container-fluid">
          {isRenderDone ? <RenderGameDone gameUrl={gameUrl}/> : <div/>}

          <GameScreen height={height} width={width}></GameScreen>

          <EditScreen username={username} width={width} gameModifyDatas={gameModifyDatas} gameId={gameId}></EditScreen>
        </div>
    )
  }
}
