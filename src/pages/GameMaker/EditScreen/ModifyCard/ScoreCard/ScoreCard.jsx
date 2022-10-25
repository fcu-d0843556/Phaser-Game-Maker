import React, { Component } from 'react'
import { InputNumber } from 'antd';
import { Col,Divider,Card } from 'antd';

import PubSub from 'pubsub-js'


export default class ScoreCard extends Component {
    
    state = {
        textDatas: {}
    }

    componentDidMount(){
        this.setState({
            textDatas: {...this.props}
        })
    }

  
    render() {
        const changeValue = (value) => {
            const {textDatas} = this.state
            textDatas.score.content = value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        };
        
        const {content,modifyTitle} = this.props.score
        // ,modifyTitle,inputType
        return (
            <Col span={24}>
                <Card 
                    title={modifyTitle}
                    headStyle={{fontSize: 24}}
                >
                    <InputNumber min={-100000} max={100000} value={content} onChange={changeValue} />
                </Card>
            </Col>
        )
    }
}
