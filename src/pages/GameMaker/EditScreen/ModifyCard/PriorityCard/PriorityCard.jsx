import React, { Component } from 'react'
import { Col,Card,Slider } from 'antd';
import cloneDeep from 'lodash.clonedeep';

import PubSub from 'pubsub-js'

import './PriorityCard.less'

export default class PriorityCard extends Component {
    
    state = {
        itemDatas: {},
        pubsubList: []
    }

    componentDidMount(){
        let {pubsubList} = this.state

        this.setState({
            itemDatas: {...this.props}
        })

        pubsubList.push(
            PubSub.subscribe('backToDefaultDatas', (msg,gameModifyDatas)=> {
                const {itemDatas} = this.state
                if(gameModifyDatas[itemDatas.parent] !== undefined){
                    for(let i=0;i<gameModifyDatas[itemDatas.parent].items.length;i++){
                        if(gameModifyDatas[itemDatas.parent].items[i].name === itemDatas.name){
                            this.setState({
                                itemDatas: cloneDeep(gameModifyDatas[itemDatas.parent].items[i])
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
