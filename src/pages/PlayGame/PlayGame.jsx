import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import qs from 'qs'
import axios from 'axios';
import {FullscreenOutlined,RetweetOutlined} from '@ant-design/icons';
import {Button} from 'antd';//Pages
import Phaser from "phaser"


//Pages
// import GameScreen from '../GameMaker/GameScreen/GameScreen'

//Phaser Game
import startGame from '../../PhaserGame'

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
          PubSub.publish("playGameMode", true);
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
    PubSub.publish("playGameMode", false);
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
        // <div className="container-fluid">
            // {/* <div className="phone-style"> */}
            // {/* </div> */}
        // </div>
        <div>
          
          <div id="phaser-play-screen"></div>

          <div className="card-footer text-muted fixed-bottom" style={{backgroundColor: "rgba(0, 0, 0, 0.664)"}}>
              
              <Button onClick={this.fullScreen} type='primary'>
                Full Screen
                <FullscreenOutlined />
              </Button>

              <Button onClick={this.restartGame} style={{float: "right"}}>
                Replay
                <RetweetOutlined />
              </Button>
          </div>
        </div>


    )
  }
}
