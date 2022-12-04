import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import cloneDeep from 'lodash.clonedeep';


import { Input,InputNumber,Row, Typography} from 'antd';
import { Col,Card } from 'antd';

const ids = [0,1,2]
export default class GameoverMessage extends Component {
    
    state = {
        textDatas: {},
        pubsubList: []
    }

    componentDidMount(){
        this.setState({
            textDatas: {...this.props}
        })
        let {pubsubList} = this.state

        pubsubList.push(
            PubSub.subscribe('backToDefaultDatas', (msg,gameModifyDatas)=> {
                const {textDatas} = this.state
                if(gameModifyDatas[textDatas.parent] !== undefined){
                    for(let i=0;i<gameModifyDatas[textDatas.parent].items.length;i++){
                        if(gameModifyDatas[textDatas.parent].items[i].name === textDatas.name){
                            this.setState({
                                textDatas: cloneDeep(gameModifyDatas[textDatas.parent].items[i])
                            })
                            break
                        }
                    }
                }
            })
        )
    }

    componentWillUnmount(){
        const {pubsubList} = this.state
        for(let i=0;i< pubsubList.length;i++){
            PubSub.unsubscribe(pubsubList[i])
        }
    }

    render() {
        
        const {score,message} = this.props.gameoverMessage
        const changeNumberValue = (event) => {
            const {textDatas} = this.state
            textDatas.gameoverMessage.score[Number(event.target.id)] = Number(event.target.value)
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        };
        
        const changeTextValue = (event) => {
            const {textDatas} = this.state
            textDatas.gameoverMessage.message[Number(event.currentTarget.id)] = event.target.value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        }

        return (
            <Col span={24}>
                <Card 
                    bordered={false}       
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
                                                    <InputNumber 
                                                        id={id} 
                                                        min={0} 
                                                        max={100000} 
                                                        controls={false} 
                                                        value={score[id]} 
                                                        formatter={(value) => {
                                                            if(value === ''){
                                                                return 0
                                                            }else{
                                                                return value
                                                            }
                                                        }}
                                                        parser={(value) => {
                                                            if(value === ''){
                                                                return 0
                                                            }else{
                                                                return value
                                                            }
                                                        }}
                                                    />
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
