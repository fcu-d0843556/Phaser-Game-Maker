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

        //在載入遠端文件完成時，存入傳入的ImageSettings名字和parent
        nowDrawerName: "",
        nowDrawerParent: "",

        //所有的載入遠端文件
        defaultCardDatas: [],
        isLoading: true,
        
        //選擇的物件和ID
        selectedItem: {},
        selectedId: ""
    }

    componentDidMount(){
        PubSub.subscribeOnce('saveDefaultCardDatas', (msg,datas)=>{
            this.setState({
                defaultCardDatas: datas.items,
                nowDrawerParent: datas.parent,
                nowDrawerName: datas.name,
                isLoading: false
            })
        })
    }
    
    render() {
        const {defaultCardDatas,isLoading, selectedId} = this.state
        // console.log("de",defaultCardDatas);

        const selectDefaultCard = (id) => {
            return () => {
                const {selectedId,defaultCardDatas,nowDrawerName,nowDrawerParent} = this.state
                let targetItem = defaultCardDatas.find((item)=>{
                    return item.defaultData.description === id
                })
                console.log("find: ",selectedId , id);
                this.setState({
                    selectedId: selectedId === id ? "" : id,
                    selectedItem: selectedId === id ? undefined : targetItem
                })

                PubSub.publish("usingDefaultDatas", {
                    selectedName: nowDrawerName,
                    selectedParent: nowDrawerParent,
                    selectedItem: selectedId === id ? undefined : targetItem
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
