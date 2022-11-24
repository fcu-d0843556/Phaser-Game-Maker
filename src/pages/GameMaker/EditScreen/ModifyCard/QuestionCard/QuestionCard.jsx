import React, { Component }  from 'react'
import PubSub from 'pubsub-js'

import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Input, Radio, Space,Tooltip } from 'antd';
import { Col,Card } from 'antd';


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
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: questionDatas})
        }
    }
  
    render() {
        const {modifyTitle,content,question,description} = this.props.question
        console.log(this.props.question);
        const selected = content.find((selection)=>{ return selection.answer === 'O' })

        const changeTextValue = (index) => {
            return (event) => {
                const {questionDatas} = this.state
                questionDatas.question.content[index].text = event.target.value
                PubSub.publishSync("setFormDatas",{name: this.props.name, values: questionDatas})
            }
        }

        return (
            <Col span={24}>
                <Card 
                    title="輸入題目："
                    headStyle={{fontSize: 24}}
                    extra={
                        <Tooltip title={description} placement="left">
                            <QuestionCircleTwoTone twoToneColor="#f56a00" style={{float: "right", fontSize: '24px'}} />
                        </Tooltip>
                    }
                >
                    <Input placeholder="題目的問題：" onChange={this.changeValue("question")} value={question}/>
                    <br/><br/>

                    <Radio.Group value={selected.id}>
                        <Space direction="vertical">
                            {
                                content.map((selection,index)=>{
                                    return (
                                        <Radio value={(index+1)} key={(index+1)} onChange={this.changeValue("answer", index)}> 
                                            <Input placeholder={modifyTitle} allowClear value={selection.text} onKeyDown={e => e.stopPropagation()} onChange={changeTextValue(index)} />
                                        </Radio>
                                    )
                                })
                            }
                        </Space>
                    </Radio.Group>
                </Card>
            </Col>
        )
    }
}
