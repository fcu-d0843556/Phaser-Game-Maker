import React, { Component } from 'react'


import './MyFooter.css'

import { Layout } from 'antd';
const { Footer } = Layout;


export default class MyFooter extends Component {
  render() {
    return (
        //render 最後footer的部分 
        <Footer
          style={{
              textAlign: 'center',
          }}

          className="phaser-game-maker-footer"
        >
              ©2022 Web Game Maker 
        </Footer>
    )
  }
}
