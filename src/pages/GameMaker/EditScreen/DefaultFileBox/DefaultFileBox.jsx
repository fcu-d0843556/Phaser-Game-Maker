import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import { Card,Col, Typography, List} from 'antd';
import { CheckCircleTwoTone, SmileTwoTone,MinusCircleTwoTone  } from '@ant-design/icons';


import './DefaultFileBox.css';

const { Meta } = Card;
const { Title} = Typography;

export default class DefaultFileBox extends Component {

    state = {

        //在載入遠端文件完成時，存入傳入的ImageSettings名字和title
        nowDrawerName: "",
        modifyTitle: "",

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
                nowDrawerName: datas.name,
                isLoading: false,
                modifyTitle: datas.modifyTitle
            })
        })
    }
    
    render() {
        const {defaultCardDatas,isLoading, selectedId, modifyTitle} = this.state
        // console.log("de",selectedId,modifyTitle);

        const selectDefaultCard = (id) => {
            return () => {
                const {selectedId,defaultCardDatas,nowDrawerName} = this.state
                let targetItem = defaultCardDatas.find((item)=>{
                    return item.defaultData.description === id
                })
                this.setState({
                    selectedId: selectedId === id ? "" : id,
                    selectedItem: selectedId === id ? undefined : targetItem
                })

                PubSub.publish("usingDefaultDatas", {
                    selectedName: nowDrawerName,
                    selectedItem: selectedId === id ? undefined : targetItem
                })
            }
        }

        return (
            <Col span={24} className='default-file-box'>
                <Card 
                    headStyle={{borderRadius: 0, background: "linear-gradient(0deg, rgb(246, 150, 83) 0%, rgb(255, 172, 112) 100%)"}}
                    title={<Title className='modify-card-card-tile' level={4}>{modifyTitle}</Title>}
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
                        
                        <List.Item >
                            <Card 
                                id={item.defaultData.description}
                                onClick={selectDefaultCard(item.defaultData.description)}
                                hoverable 
                                loading={isLoading}
                                headStyle={{background: selectedId === item.defaultData.description ? "linear-gradient(0deg, rgb(246, 150, 83) 0%, rgb(255, 172, 112) 100%)" : "linear-gradient(0deg, #538CF6 0%, #70A2FF 100%)"}}
                                cover={
                                    <img
                                        className='default-card-img'
                                        alt="..."
                                        src={item.img.src}
                                    />
                                }
                                extra={
                                    selectedId === item.defaultData.description ? 
                                        <CheckCircleTwoTone 
                                            twoToneColor="#f56a00" 
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
        )
    }
}
