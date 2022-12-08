import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import { Card,Col, Typography, List,Collapse} from 'antd';
import { CheckCircleTwoTone, SmileTwoTone,MinusCircleTwoTone  } from '@ant-design/icons';


import './DefaultFileBox.css';

const { Meta } = Card;
const { Title} = Typography;
const { Panel } = Collapse;

export default class DefaultFileBox extends Component {

    state = {


        //所有的載入遠端文件
        isLoading: true,
        
        //選擇的物件和ID
        selectedId: "",

        activeTab: ""
    }

    render() {
        const {selectedId,activeTab} = this.state
        const {defaultFilesData} = this.props
        const defaultFileKeys = Object.keys(defaultFilesData)
        // console.log('get default', defaultFilesData,);

        const selectDefaultCard = (id) => {
            return () => {
                const {selectedId} = this.state
                const {defaultFilesData} = this.props
                const defaultFileKeys = Object.keys(defaultFilesData)
                let targetItem
                defaultFileKeys.forEach((key)=>{
                    if(targetItem === undefined){
                        targetItem = defaultFilesData[key].items.find((item)=>{
                            return item.description === id
                        })
                    }
                })

                this.setState({
                    selectedId: selectedId === id ? "" : id,
                    selectedItem: selectedId === id ? undefined : targetItem
                })
                PubSub.publish("usingDefaultDatas", {
                    selectedItem: selectedId === id ? undefined : targetItem
                })
            }
        }
        
        const changeTab = (key) => {
            this.setState({activeTab: key})
        }

        return (
            <Col span={24} className='default-file-box'>
                <Collapse className='modify-card-collapse' onChange={changeTab} accordion>
                    {
                        defaultFileKeys.map((key) => {
                            return (
                                <Panel style={{background: activeTab === key ? "linear-gradient(0deg, #F69653 0%, #FFAC70 100%)" : "#538CF6", padding: 0}} header={<Title level={4} style={{margin: 0}}>{defaultFilesData[key].title}</Title>} key={key}>
                                    <List
                                        grid={{ gutter: 0, 
                                            xs: 2,
                                            sm: 3,
                                            md: 3,
                                            lg: 2,
                                            xl: 3,
                                            xxl: 4, 
                                        }}
                                        dataSource={defaultFilesData[key].items}
                                        renderItem={item => {
                                            return (   
                                                <List.Item >
                                                    <Card 
                                                        id={item.description}
                                                        onClick={selectDefaultCard(item.description)}
                                                        hoverable 
                                                        // loading={isLoading}
                                                        headStyle={{background: selectedId === item.description ? "linear-gradient(0deg, rgb(246, 150, 83) 0%, rgb(255, 172, 112) 100%)" : "linear-gradient(0deg, #538CF6 0%, #70A2FF 100%)"}}
                                                        cover={
                                                            <img
                                                                className='default-card-img'
                                                                alt="..."
                                                                src={item.src}
                                                            />
                                                        }
                                                        extra={
                                                            selectedId === item.description ? 
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
                                                            title = {item.description}
                                                        />
                                                    </Card>
                                                </List.Item>
                                            )
                                        }}
                                    />
                                </Panel>
                            )
                        })
                    }
                </Collapse>
            </Col>
        )
    }
}
