import React, { Component }  from 'react'
import PubSub from 'pubsub-js'

import { Input, Radio, Space } from 'antd';


export default class QuestionCard extends Component {
    
    state = {
        questionDatas: {}
    }

    componentDidMount(){
        console.log(this.props);
        this.setState({
            questionDatas: {...this.props}
        })
        
    }

    changeValue = (type,index) => {
        const {questionDatas} = this.state
        return (event) => {
            switch(type){
                case 'question':
                    questionDatas.question.question = event.target.value
                    break
                case 'content':
                    questionDatas.question.content[index].text = event.target.value
                    break
                case 'answer':
                    questionDatas.question.content.forEach((selection,selectionIndex)=>{
                        index === selectionIndex ? selection.answer = 'O' : selection.answer = 'X'
                    })
                    break
                default:
            }
            PubSub.publish("setFormDatas",{name: this.props.name, values: questionDatas})
        }
    }
  
    render() {
        const {modifyTitle,content,question} = this.props.question
        
        return (
            <div>

                <div className="card-header">
                    <div className="mb-3">
                        <label className="form-label modify-card-title">{modifyTitle}</label>
                        
                        <Input placeholder="輸入題目：" onChange={this.changeValue("question")} value={question}/>;
                        <br/><br/>

                        <Radio.Group >
                            <Space direction="vertical">
                                {
                                    content.map((selection,index)=>{
                                        return (
                                            <Radio value={(index+1)} key={(index+1)} onChange={this.changeValue("answer", index)}> 
                                                <input onChange={this.changeValue("content", index)} value={selection.text}/>
                                            </Radio>
                                        )
                                    })
                                }
                            </Space>
                        </Radio.Group>
                    </div>
                </div>
                
            </div>
        )
    }
}
