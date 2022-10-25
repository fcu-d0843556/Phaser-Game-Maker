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
    showCard: undefined
  }
  
  componentDidMount(){
    const {name,parent} = this.props
    this.setState({
      showCard: this.props.showCard
    })

    PubSub.subscribe('changeCard', (msg,keyFilter)=>{
      if(keyFilter.keyword === name) {
        this.setState({
          showCard: true
        })
      }else if(keyFilter.parent === parent){
        this.setState({
          showCard: false
        })
      }
    })
  }

  render() {

    const {modifyTitle,img,text,name,question,score,priority,gameoverMessage} = this.props
    const {showCard} = this.state

    return (
        <Collapse accordion >
            {
              img ? 
                  
                  <Panel header="圖片管理" key="圖片管理">
                    
                      <ImageSettings {...this.props}></ImageSettings>
                    
                  </Panel>
                
              : 
                <div></div>
            }

            {
              text ? 
                  <Panel header={text.modifyTitle} key={text.modifyTitle}>
                    <GetItemMessage {...this.props}></GetItemMessage>
                  </Panel>
              :
              <div></div>
            }

            {       
              priority ? 
                <Panel header={priority.modifyTitle} key={priority.modifyTitle}>
                  <PriorityCard {...this.props}></PriorityCard>
                </Panel>
              :
              <div></div>
            }

            {
              score ? 
                <Panel header={score.modifyTitle} key={score.modifyTitle}>
                  <ScoreCard {...this.props}></ScoreCard> 
                </Panel>
              :
              <div></div>
            } 

            {
              gameoverMessage ?
                <Panel header={gameoverMessage.modifyTitle} key={gameoverMessage.modifyTitle}>
                  <GameoverMessage {...this.props}></GameoverMessage>
                </Panel>
              :
                <div></div>
            }

            {
              question ? 
                <Panel header={question.modifyTitle} key={question.modifyTitle}>
                  <QuestionCard {...this.props}></QuestionCard>
                </Panel>
              :
              <div></div>
            }
        </Collapse>
    )
  }
}
