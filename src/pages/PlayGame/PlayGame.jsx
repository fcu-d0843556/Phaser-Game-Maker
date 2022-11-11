import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import qs from 'qs'
import axios from 'axios';
import {FullscreenOutlined,RetweetOutlined} from '@ant-design/icons';
import {Button,Layout} from 'antd';

//Pages
// import GameScreen from '../GameMaker/GameScreen/GameScreen'

//Phaser Game
import startGame from '../../PhaserGame'


import './PlayGame.less'

const { Footer } = Layout;

export default class RenderGame extends Component {

  state = {
    game: {},
    gameId: "",
    gameModifyDatas: {}
  }

  componentDidMount(){
    const {search} = this.props.location;
    const {gameId, username} = qs.parse(search.slice(1))

    console.log(gameId,username);

    axios({
      method: 'get',
      url: "/api1/getGameDatas",
      params: {
        gameId,
        username,
        userMode: "play"
      }
    }).then(
      response => {
        if(!response.data.notFound){
          this.setState({
            game: startGame(gameId,response.data.gameDatas,"playGame"),
            gameId: gameId,
            gameModifyDatas: response.data.gameDatas
          })
          PubSub.publishSync("playGameMode", true);
        }else{
          alert(response.data.message)
        }
        
        // console.log("message: ",response.data.message );
        // console.log(response.data.notFound);
        // console.log("res", response);
      },
      error => {
        console.log("err", error);
      }
    )
  }

  componentWillUnmount(){
    PubSub.publishSync("playGameMode", false);
  }

  fullScreen = () => {
    const getScreen = document.getElementById("phaser-play-screen")
    console.log(getScreen);
    if (getScreen.requestFullscreen) {
      getScreen.requestFullscreen();
    }
  }

  restartGame = () => {
    const {game,gameId,gameModifyDatas} = this.state

    game.scene.stop()
    game.scene.start(gameId,gameModifyDatas)
  }

  render() {
    
    return (
        <div style={{background: "#F7E9DF"}}>
          {/* 遊戲生成位置 */}
          <div id="phaser-play-screen"></div>

          <div className='playgame-floating-button-space' style={{bottom: 15}}>
            <Button className='playgame-floating-button playgame-full-screen-button' onClick={this.fullScreen}>
              <FullscreenOutlined className='playgame-floating-button-icon'/>
            </Button>
          </div>

          <div className='playgame-floating-button-space' style={{bottom: 65}}>
            <Button className='playgame-floating-button playgame-restart-button' onClick={this.restartGame}>
              <RetweetOutlined className='playgame-floating-button-icon' />
            </Button>
          </div>
        </div>


    )
  }
}
