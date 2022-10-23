import React, { Component } from 'react'
import PubSub from 'pubsub-js'


import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Input,InputNumber, Tooltip, Space,Row,Col } from 'antd';

const ids = [0,1,2]
export default class GameoverMessage extends Component {
    
    state = {
        textDatas: {}
    }

    componentDidMount(){
        this.setState({
            textDatas: {...this.props}
        })
    }

    render() {
        
        const {description,score,message} = this.props.gameoverMessage
        


        const changeNumberValue = (event) => {
            const {textDatas} = this.state
            // console.log("v",event.target);
            textDatas.gameoverMessage.score[Number(event.target.id)] = Number(event.target.value)
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        };
        
        const changeTextValue = (event) => {
            const {textDatas} = this.state
            console.log(textDatas,  event.target.value);
            textDatas.gameoverMessage.message[Number(event.currentTarget.id)] = event.target.value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        }

        return (
            <div>
                <div className="card-header">
                    <Row>
                        <Col offset={23}>
                            <Tooltip title={description} placement="left">
                                <QuestionCircleTwoTone twoToneColor="#52c41a" style={{float: "right", fontSize: '24px'}} />
                            </Tooltip>
                        </Col>
                    </Row>
                    
                    {
                        ids.map((id)=>{
                            return (
                                <div key={id}>
                                    <Row>
                                        <Col span={12}>
                                            <Input value="當分數大於等於" disabled/>
                                        </Col>

                                        <Col span={12} onChange={changeNumberValue}>
                                            <InputNumber id={id} min={-100000} max={100000} controls={false} defaultValue={score[id]} />

                                        </Col>
                                        <Col span={24}>
                                            <Input id={id} placeholder={"訊息"} allowClear value={message[id]} onKeyDown={e => e.stopPropagation()} onChange={changeTextValue} />

                                        </Col>
                                    </Row>
                                    <br />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}
