import React, { Component } from 'react'
import { InputNumber,Col,Card,Tooltip } from 'antd';
import cloneDeep from 'lodash.clonedeep';


import { QuestionCircleTwoTone } from '@ant-design/icons';

import PubSub from 'pubsub-js'


export default class ScoreCard extends Component {
    
    state = {
        textDatas: {}
    }

    componentDidMount(){
        this.setState({
            textDatas: {...this.props}
        })

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
