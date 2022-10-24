import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { Card,Col,Divider} from 'antd';
import { List } from 'antd';

import './DefaultFileBox.css';
import axios from 'axios';

export default class DefaultFileBox extends Component {

    state = {
        defaultCardDatas: [],
        isLoading: true
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
        const {defaultCardDatas,isLoading} = this.state

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
                                <Card hoverable loading={isLoading}>
                                    <img src={item.img.src} className=" item-img-size" alt="..."/>
                                    <h5 className="card-title">{item.defaultData.description}</h5>
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
