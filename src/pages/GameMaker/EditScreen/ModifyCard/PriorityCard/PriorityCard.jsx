import React, { Component } from 'react'
import { Col,Card, Typography,Slider } from 'antd';

import PubSub from 'pubsub-js'

import './PriorityCard.less'
const { Paragraph, Title} = Typography;

export default class PriorityCard extends Component {
    
    state = {
        itemDatas: {}
    }

    componentDidMount(){
        this.setState({
            itemDatas: {...this.props}
        })
    }

    
  
    render() {
        const {modifyTitle, selected, content} = this.props.priority
        
        const marks = {
            1: {
                style: {color: '#FF170D',},
                label: <strong>{content[0]}</strong>,
            },
            2: {
                style: {color: '#ff5500'},
                label: content[1]
            },
            3: {
                style: {color: '#E8750C'},
                label: content[2]
            },
            4: {
                style: {color: '#ff5500'},
                label: content[3]
            },
            5: {
                style: {color: '#FF170D',},
                label: <strong>{content[4]}</strong>,
            },
        };

        const changeValue = (value) => {
            
            const {itemDatas} = this.state
            // console.log("be",itemDatas.priority);
            itemDatas.priority.selected = value
            // console.log("af",itemDatas.priority);
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: itemDatas})
        };
        
        // ,modifyTitle,inputType
        return (
            <div>
                <Col span={24}>
                    <Card 
                        // title={<Title className='modify-card-card-tile' level={4}>{modifyTitle}</Title>}
                        bordered={false}
                    >
                        <Slider min={1}
                                max={5}
                                onAfterChange={changeValue}
                                marks={marks} 
                                step={null} 
                                value={selected} 
                                style={{color: "blue"}}
                        />
                    </Card>
                </Col>
            </div>
        )
    }
}
