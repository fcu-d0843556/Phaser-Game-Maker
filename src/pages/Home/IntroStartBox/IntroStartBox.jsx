import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons';

import './IntroStartBox.css'

class IntroStartBox extends Component {

  clickEvent = () => {
    if(localStorage.getItem("username") !== ""){
      this.props.history.push('/selectGame')
    }else{
      this.props.history.push('/userAuth')
    }
    
  }

  render() {
    return (
        <header className="intro-container">
            <h1 className="intro-container-text">HELLO!</h1>
            <p>In this website, you can make your own games!</p>
            <Button onClick={this.clickEvent} className="startbutton" type="primary" size="large">
              Let's Start !
            </Button>
        </header>
    )
  }
}

export default withRouter(IntroStartBox)