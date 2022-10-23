import React, { Component } from 'react'
import { Slider } from 'antd';
import { Col,Divider,Card } from 'antd';

import PubSub from 'pubsub-js'


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
        // console.log(this.props);
        const {modifyTitle, selected, content} = this.props.priority
        
        const marks = {
            1: {
                style: {color: '#f50',},
                label: <strong>{content[0]}</strong>,
            },
            2: content[1],
            3: content[2],
            4: content[3],
            5: {
                style: {color: '#f50',},
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
                        title={modifyTitle}
                        headStyle={{fontSize: 24}}
                    >
                        <Slider min={1}
                                max={5}
                                onAfterChange={changeValue}
                                marks={marks} 
                                step={null} 
                                defaultValue={selected} />
                    </Card>
                </Col>
            </div>
        )
    }
}
