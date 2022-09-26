import React, { Component } from 'react'

//Pages
import GameScreen from '../GameMaker/GameScreen/GameScreen'


export default class RenderGame extends Component {
  render() {
    return (
        <div className="container-fluid">
            <GameScreen></GameScreen>
        </div>
    )
  }
}
