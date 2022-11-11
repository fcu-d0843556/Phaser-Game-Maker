import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {List,Collapse} from 'antd'

//Pages
import GetItemMessage from './GetItemMessage/GetItemMessage'
import ImageSettings from './ImageSettings/ImageSettings'
import QuestionCard from './QuestionCard/QuestionCard'
import ScoreCard from './ScoreCard/ScoreCard'
import PriorityCard from './PriorityCard/PriorityCard'
import GameoverMessage from './GameoverMessage/GameoverMessage'

import './ModifyCard.css'

const { Panel } = Collapse;

export default class ModifyCard extends Component {

  state = {
    activeTab: ""
  }

  render() {

    const {modifyTitle,img,text,name,question,score,priority,gameoverMessage} = this.props
    const {activeTab} = this.state

    const changeTab = (key) => {
      this.setState({activeTab: key})
    }

    return (
        <Collapse onChange={changeTab} className='' style={{background: "#538CF6"}} accordion >
            {
              img ? 
                  
                  <Panel style={{background: activeTab === "圖片管理" ? "#F69653" : "#538CF6"}} header="圖片管理" key="圖片管理">
                    
                      <ImageSettings {...this.props}></ImageSettings>
                    
                  </Panel>
                
              : 
                <div></div>
            }

            {
              text ? 
                  <Panel style={{background: activeTab === text.modifyTitle ? "#F69653" : "#538CF6"}} header={text.modifyTitle} key={text.modifyTitle}>
                    <GetItemMessage {...this.props}></GetItemMessage>
                  </Panel>
              :
              <div></div>
            }

            {       
              priority ? 
                <Panel style={{background: activeTab === priority.modifyTitle ? "#F69653" : "#538CF6"}} header={priority.modifyTitle} key={priority.modifyTitle}>
                  <PriorityCard {...this.props}></PriorityCard>
                </Panel>
              :
              <div></div>
            }

            {
              score ? 
                <Panel style={{background: activeTab === score.modifyTitle ? "#F69653" : "#538CF6"}} header={score.modifyTitle} key={score.modifyTitle}>
                  <ScoreCard {...this.props}></ScoreCard> 
                </Panel>
              :
              <div></div>
            } 

            {
              gameoverMessage ?
                <Panel style={{background: activeTab === gameoverMessage.modifyTitle ? "#F69653" : "#538CF6"}} header={gameoverMessage.modifyTitle} key={gameoverMessage.modifyTitle}>
                  <GameoverMessage {...this.props}></GameoverMessage>
                </Panel>
              :
                <div></div>
            }

            {
              question ? 
                <Panel style={{background: activeTab === question.modifyTitle ? "#F69653" : "#538CF6"}} header={question.modifyTitle} key={question.modifyTitle}>
                  <QuestionCard {...this.props}></QuestionCard>
                </Panel>
              :
              <div></div>
            }
        </Collapse>
    )
  }
}
