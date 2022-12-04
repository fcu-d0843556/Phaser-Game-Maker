import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
import cloneDeep from 'lodash.clonedeep';

import {message} from 'antd'
 

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
    gameUrl: "",
    pubsubList: []
  }

  updateDimensions = () => {
    this.setState({
      height: window.innerHeight, 
      width: window.innerWidth
    });
  }

  componentDidMount(){
      let {pubsubList} = this.state
      window.addEventListener("resize", this.updateDimensions);
      let username = localStorage.getItem('username')
      if(username === '' || username === 'null' || username === 'undefined' || username === null || username === undefined){
        message.warning('請登入！')
        this.props.history.push('/userAuth')
      }else{
        this.setState({username: username})
        const {gameId} = this.props.location.state
        this.setState({gameId}) 


        //獲取server端的資料，可以獲取默認資料或使用者資料
        pubsubList.push(
          PubSub.subscribe("getGameData",(msg,type)=>{
            this.getGameData(type)
          })
        )
        
        this.getGameData()

        //獲取遊戲的ID
        pubsubList.push(
          PubSub.subscribe("getGameId",(msg)=>{
            const {gameId} = this.state
            return gameId
          })
        )

        //預覽變化後做的操作，存儲更改的資料
        pubsubList.push(
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
        )

        //用來新增、刪除不需要的item項
        pubsubList.push(
          PubSub.subscribe("ChangeAllItemsDatas", (msg,datas)=>{
            let newGameModifyDatas = this.state.gameModifyDatas
            if(newGameModifyDatas[datas.parent] !== undefined){
              newGameModifyDatas[datas.parent].items = cloneDeep(datas.items)
              this.setState({gameModifyDatas: newGameModifyDatas})
            }
          })
        )

        //重開一次遊戲
        pubsubList.push(
            PubSub.subscribe("refreshGame", (msg)=>{
              const {game,gameId,gameModifyDatas} = this.state
              game.scene.stop()
              game.scene.start(gameId,gameModifyDatas)
            })
          )

          //發佈遊戲
        pubsubList.push(
          PubSub.subscribe("publishGame", (msg)=>{

            this.setState({isRenderDone: false})
            const {gameId,gameModifyDatas} = this.state
            // console.log("save",gameModifyDatas,gameId);
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
        )

        this.setState({pubsubList})
      }
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateDimensions)
    const {pubsubList} = this.state
    for(let i=0;i< pubsubList.length;i++){
      PubSub.unsubscribe(pubsubList[i])
    }
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
            // console.log("message: ",response.data.gameDatas );
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
    // console.log("gamedata: ", gameId);
    return (
        
        <div className="container-fluid">
          {isRenderDone ? <RenderGameDone gameUrl={gameUrl}/> : <div/>}

          <GameScreen height={height} width={width}></GameScreen>

          <EditScreen username={username} width={width} gameModifyDatas={gameModifyDatas} gameId={gameId}></EditScreen>
        </div>
    )
  }
}
