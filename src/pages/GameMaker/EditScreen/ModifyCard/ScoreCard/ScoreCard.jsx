import React, { Component } from 'react'
import { InputNumber } from 'antd';
import { Col,Card } from 'antd';

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
        
        const {content,modifyTitle,max,min} = this.props.score

        return (
            <Col span={24}>
                <Card 

                >
                    <InputNumber 
                        min={min} max={max} 
                        value={content} 
                        onChange={changeValue}
                        formatter={(value) => `${value}分`}
                        parser={(value) => value.replace('分', '')}
                    />
                </Card>
            </Col>
        )
    }
}
