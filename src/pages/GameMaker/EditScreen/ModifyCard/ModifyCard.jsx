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
    // console.log(this.props);
    return (
        <Collapse accordion >
            {/* <div name={name} className="card text-center modify-card" > */}
            

            {
              img ? 
                
                  <Panel header="圖片管理" key={name}>
                    
                      <ImageSettings {...this.props}></ImageSettings>
                    
                  </Panel>
                
              : 
                <div></div>
            }

            {
              text ? 
                  <Panel header={text.modifyTitle} key={text.modifyTitle}>
                    <List.Item><GetItemMessage {...this.props}></GetItemMessage></List.Item>
                  </Panel>
              :
              <div></div>
            }
{/*             
            {
              priority ? 
                <List.Item>
                  <PriorityCard {...this.props}></PriorityCard>
                </List.Item>
              :
              <div></div>
            }
            
            {
              score ? 
              
                <List.Item><ScoreCard {...this.props}></ScoreCard></List.Item>
              :
              <div></div>
            }

            {
              question ? 
                <List.Item><QuestionCard {...this.props}></QuestionCard></List.Item>
              :
              <div></div>
            }

            {
              gameoverMessage ?
                <List.Item><GameoverMessage {...this.props}></GameoverMessage></List.Item>
              :
                <div></div>
            } */}
        {/* </div> */}
        </Collapse>
    )
  }
}
