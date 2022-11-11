import React, { Component } from 'react'
import { Image, Layout, List,Card, Space, Typography } from 'antd'
import { StarFilled } from '@ant-design/icons';

import './IntroFeatureBox.less'

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default class IntroFeatureBox extends Component {
    render() {

        // 三個圖標顯示的模板和文字內容
        const data = [
            {
                title: (
                    <Space className='feature-icon-background'>
                        <Image src="/icon/documentIcon.svg" preview={false} />
                    </Space>
                ),
                content: ( 
                    <Typography>
                        <Title level={3} style={{margin: "16px auto 24px auto"}}>多種可選擇的遊戲類型</Title>
                        <Paragraph>
                            <Text>我們提供了多種不同玩法的遊戲類型</Text>
                        </Paragraph>
                        <Paragraph>
                            <Text>您可以選擇自己感興趣的遊戲主題後，開始進行遊戲製作</Text>
                        </Paragraph>
                    </Typography>
                )
            },
            {
                title: (
                    <Space className='feature-icon-background'>
                        <Image src="/icon/rocketIcon.svg" preview={false} />
                    </Space>
                ),
                content: ( 
                    <Typography>
                        <Title level={3} style={{margin: "16px auto 24px auto"}}>簡單又快速的製作遊戲</Title>
                        <Paragraph style={{color: "black"}}>
                            <Text>您只要經過一些遊戲數值的修改、上傳您的圖片</Text>
                        </Paragraph>
                        <Paragraph>
                            <Text>透過簡單好上手的製作界面就可以創造出屬於您的獨特遊戲</Text>    
                        </Paragraph>
                    </Typography>
                )
            },
            {
                title: (
                    <Space className='feature-icon-background'>
                        <Image src="/icon/responsiveIcon.svg" preview={false} />
                    </Space>
                ),
                content: ( 
                    <Typography>
                        <Title level={3} style={{margin: "16px auto 24px auto"}}>多裝置製作、遊玩遊戲</Title>
                        <Paragraph>
                            <Text>我們的遊戲網站支援手機、電腦等裝置</Text>
                        </Paragraph>
                        <Paragraph>
                            <Text>您可以在所有裝置上製作遊戲，也能遊玩製作出來的遊戲</Text>
                        </Paragraph>
                    </Typography>
                )
            }
        ]

        return (
            // 特色區塊
            <Content className='feature-box' >
                <Title className='feature-title' style={{marginBottom: "64px"}}>特 色</Title>
                <List
                    //根據裝置大小調整顯示圖標方式 ，響應式設計
                    grid={{
                        gutter: 32,
                        xs: 1,
                        sm: 1,
                        md: 3,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={data}
                    renderItem={item => (
                    // render出 3個圖標
                    <List.Item style={{ marginBottom: "32px" }}>
                        <Card 
                            style={{background: "#F7E9DF"}} 
                            headStyle={{borderBottom: "none"}}
                            bordered={false}  
                            title={item.title}
                            bodyStyle={{padding: "0 24px"}}
                        >
                            {item.content}
                        </Card>
                    </List.Item>
                    )}
                />
            </Content>
        )
    }
}
