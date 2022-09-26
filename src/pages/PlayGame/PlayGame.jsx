import React, { Component } from 'react'
import qs from 'qs'
import axios from 'axios';

//Pages
import GameScreen from '../GameMaker/GameScreen/GameScreen'

//Phaser Game
import startGame from '../../PhaserGame'

export default class RenderGame extends Component {

  state = {
    game: {},
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
            game: startGame(gameId,response.data.gameDatas),
          })
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

  render() {
    
    return (
        <div className="container-fluid">
            <GameScreen></GameScreen>
        </div>
    )
  }
}
