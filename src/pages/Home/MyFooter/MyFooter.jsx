import React, { Component } from 'react'


import './MyFooter.css'

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;


export default class MyFooter extends Component {
  render() {
    return (
        // <div ></div>
        <Footer
          style={{
              textAlign: 'center',
          }}

          className="footer"
          >
              Phaser Game Maker ©2022
        </Footer>
    )
  }
}
