import React, { Component }  from 'react'
import PubSub from 'pubsub-js'
import cloneDeep from 'lodash.clonedeep';

import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Input, Radio, Space,Tooltip, Divider,Typography } from 'antd';
import { Col,Card } from 'antd';
const { TextArea } = Input;
const { Title} = Typography;


export default class QuestionCard extends Component {
    
    state = {
        questionDatas: {}
    }

    componentDidMount(){
        this.setState({
            questionDatas: {...this.props}
        })

        PubSub.subscribe('backToDefaultDatas', (msg,gameModifyDatas)=> {
            const {questionDatas} = this.state
            if(gameModifyDatas[questionDatas.parent] !== undefined){
                for(let i=0;i<gameModifyDatas[questionDatas.parent].items.length;i++){
                    if(gameModifyDatas[questionDatas.parent].items[i].name === questionDatas.name){
                        this.setState({
                            questionDatas: cloneDeep(gameModifyDatas[questionDatas.parent].items[i])
                        })
                        break
                    }
                }
            }
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
        // console.log("question",this.props.question);
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
                    title={<Title level={4} style={{margin: 0}}>輸入題目：</Title>}
                    headStyle={{fontSize: 24}}
                    extra={
                        <Tooltip title={description} placement="left">
                            <QuestionCircleTwoTone twoToneColor="#f56a00" style={{float: "right", fontSize: '24px'}} />
                        </Tooltip>
                    }
                >
                    <TextArea rows={6} placeholder="題目的問題：" allowClear value={question} onKeyDown={e => e.stopPropagation()} onChange={this.changeValue("question")} />
                    <Divider style={{marginTop: 20}}></Divider>

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
