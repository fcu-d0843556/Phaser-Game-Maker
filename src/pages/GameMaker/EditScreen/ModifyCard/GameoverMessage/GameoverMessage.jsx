import React, { Component } from 'react'
import PubSub from 'pubsub-js'


import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Input,InputNumber, Tooltip , Row} from 'antd';
import { Col,Divider,Card } from 'antd';

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
        
        const {description,score,message,modifyTitle} = this.props.gameoverMessage
        


        const changeNumberValue = (event) => {
            const {textDatas} = this.state
            // console.log("v",event.target);
            textDatas.gameoverMessage.score[Number(event.target.id)] = Number(event.target.value)
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        };
        
        const changeTextValue = (event) => {
            const {textDatas} = this.state
            // console.log(textDatas,  event.target.value);
            textDatas.gameoverMessage.message[Number(event.currentTarget.id)] = event.target.value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        }

        return (
            <Col span={24}>
                <Card 
                    title={modifyTitle}
                    headStyle={{fontSize: 24}}
                    bordered={false}
                    extra={
                        <Tooltip title={description} placement="left">
                            <QuestionCircleTwoTone twoToneColor="#52c41a" style={{float: "right", fontSize: '24px'}} />
                        </Tooltip>
                    }              
                >

                    {
                        ids.map((id)=>{
                            return (
                                <div key={id}>
                                    <Row>
                                        <Col span={id===2 ? 24 : 12} >
                                            <Input value={id===2 ? "當分數低於以上兩種情況時" : "當分數超過"}  disabled/>
                                        </Col>

                                        {
                                            id === 2 ?
                                                <div></div>
                                            :
                                                <Col span={12} onChange={changeNumberValue}>
                                                    <InputNumber id={id} min={0} max={100000} controls={false} value={score[id]} />
                                                </Col>

                                        }
                                        
                                        <Col span={24}>
                                            <Input id={id} placeholder={"訊息"} allowClear value={message[id]} onKeyDown={e => e.stopPropagation()} onChange={changeTextValue} />
                                        </Col>
                                    </Row>
                                    <br />
                                </div>
                            )
                        })
                    }
                </Card>
            </Col>
        )
    }
}
