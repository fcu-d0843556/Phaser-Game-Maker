import React, { Component } from 'react'
import PubSub from 'pubsub-js'



import { CheckCircleTwoTone, SmileTwoTone,MinusCircleTwoTone  } from '@ant-design/icons';

import { Card,Col,Divider} from 'antd';
import { List } from 'antd';

import './DefaultFileBox.css';
import axios from 'axios';

const { Meta } = Card;

export default class DefaultFileBox extends Component {

    state = {
        defaultCardDatas: [],
        isLoading: true,

        selectedId: ""
    }

    componentDidMount(){
        PubSub.subscribeOnce('saveDefaultCardDatas', (msg,datas)=>{
            this.setState({
                defaultCardDatas: datas,
                isLoading: false
            })
        })
    }
    
    render() {
        const {defaultCardDatas,isLoading, selectedId} = this.state
        // console.log("de",defaultCardDatas);

        const selectDefaultCard = (id) => {
            return () => {
                const {selectedId} = this.state
                this.setState({
                    selectedId: selectedId === id ? "" : id
                })
            }
        }

        return (
            <div style={{backgroundColor: "lightpink"}}>

                <Col span={24}>
                    <Card 
                        title= { "- 預設圖片"}
                        headStyle={{fontSize: 24}}
                    >
                    
                    <List
                        grid={{ gutter: 16, 
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 1,
                            xl: 2,
                            xxl: 3, 
                        }}
                        dataSource={defaultCardDatas}
                        renderItem={item => (
                            
                            <List.Item>
                                <Card 
                                    id={item.defaultData.description}
                                    onClick={selectDefaultCard(item.defaultData.description)}
                                    hoverable 
                                    loading={isLoading}
                                    cover={
                                        <img
                                          alt="..."
                                          src={item.img.src}
                                        />
                                    }
                                    extra={
                                        selectedId === item.defaultData.description ? 
                                            <CheckCircleTwoTone 
                                                twoToneColor="#52c41a" 
                                                style={{
                                                    fontSize: '32px'
                                                }} 
                                            />
                                        :
                                            <MinusCircleTwoTone 
                                                twoToneColor="#a0a0a0"
                                                style={{
                                                    fontSize: '32px'
                                                }} 
                                            />
                                    }
                                >
                                    <Meta
                                        title = {item.defaultData.description}
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />

                    </Card>
                </Col>
            </div>
        )
    }
}
