import React, { Component } from 'react'
import PubSub from 'pubsub-js'

//Pages
import GetItemMessage from './GetItemMessage/GetItemMessage'
import ImageSettings from './ImageSettings/ImageSettings'
import QuestionCard from './QuestionCard/QuestionCard'

import './ModifyCard.css'

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

    const {modifyTitle,img,text,name,question} = this.props
    const {showCard} = this.state
    
    return (
        <div name={name} className="card text-center modify-card" style={{display: showCard ? 'block': 'none'}}>
            <div className="card-header">
              {
                  <div className="mb-3">
                    <label className="form-label modify-card-title">{modifyTitle}</label>
                  </div>
              }
            </div> 

            {
              img ? 
                <div>
                  <ImageSettings {...this.props}></ImageSettings>
                </div>
              : 
                <div></div>
            }
            
            {
              text ? 
                <GetItemMessage {...this.props}></GetItemMessage>
              :
                <div></div>
            }

            {
              question ? 
                <QuestionCard {...this.props}></QuestionCard>
              :
                <div></div>
            }
        </div>
    )
  }
}
