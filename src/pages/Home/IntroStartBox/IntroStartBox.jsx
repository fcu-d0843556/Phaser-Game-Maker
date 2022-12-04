import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button,Layout } from 'antd'
import { Typography } from 'antd'

import './IntroStartBox.less'

const { Header } = Layout;
const { Title, Paragraph, Text } = Typography;

class IntroStartBox extends Component {

  clickEvent = () => {
    let username = localStorage.getItem("username")
    if(username === '' || username === 'null' || username === 'undefined' || username === null || username === undefined){
      this.props.history.push('/userAuth')
    }else{
      this.props.history.push('/selectGame')
    }
    
  }

  render() {
    return (
      // 歡迎區塊
        <Header className="intro-container">
            <Title  className="intro-container-text">歡迎來到 Phaser Game Maker！</Title>
            <Paragraph>
                <Text>在這個網站中，您可以製作出簡單又有趣的客製化遊戲！</Text>
            </Paragraph>

            <Button onClick={this.clickEvent} className="startbutton" type="primary" size="large">
              開 始 製 作 !
            </Button>
        </Header>
    )
  }
}

export default withRouter(IntroStartBox)