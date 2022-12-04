import React, { Component } from 'react'
import { InputNumber,Col,Card,Tooltip } from 'antd';
import cloneDeep from 'lodash.clonedeep';


import { QuestionCircleTwoTone } from '@ant-design/icons';

import PubSub from 'pubsub-js'


export default class ScoreCard extends Component {
    
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
        const changeValue = (value) => {
            const {textDatas} = this.state
            textDatas.score.content = value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        };
        
        const {content,modifyTitle,max,min} = this.props.score

        return (
            <Col span={24}>
                <Card 
                    
                >
                    <InputNumber 
                        min={min} max={max} 
                        value={content} 
                        onChange={changeValue}
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
                        addonAfter="分"
                    />

                    <Tooltip title={`請填入 ${min} 到 ${max} 之間的數字`} placement="left">
                        <QuestionCircleTwoTone twoToneColor="#f56a00" style={{float: "right", fontSize: '24px'}} />
                    </Tooltip>
                </Card>
            </Col>
        )
    }
}
