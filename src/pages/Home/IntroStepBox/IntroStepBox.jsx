import React, { Component } from 'react'
import { Layout, List,Card } from 'antd'
import { Image, Space, Typography } from 'antd'

import './IntroStepBox.less'

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default class IntroStepBox extends Component {
    render() {
        const data = [
            {
                title: (
                    <Space className='step-icon-background'>
                        <Image src="/icon/selectIcon.svg" preview={false} />
                    </Space>
                ),
                content: ( 
                    <Typography>
                        <Title level={2} style={{margin: "16px auto 24px auto"}}>選擇遊戲!</Title>
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
                    <Space className='step-icon-background'>
                        <Image src="/icon/modifyIcon.svg" preview={false} />
                    </Space>
                ),
                content: ( 
                    <Typography>
                        <Title level={2} style={{margin: "16px auto 24px auto"}}>進行修改!</Title>

                    </Typography>
                )
            },
            {
                title: (
                    <Space className='step-icon-background'>
                        <Image src="/icon/shareIcon.svg" preview={false} />
                    </Space>
                ),
                content: ( 
                    <Typography>
                        <Title level={2} style={{margin: "16px auto 24px auto"}}>分享出去!</Title>

                    </Typography>
                )
            }
        ]

        return (
            <Content className='step-box' >
                <Title style={{marginBottom: "66px"}}>製 作 流 程</Title>
                
                <List
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
                        <List.Item style={{ marginBottom: "32px" }}>
                            {/* F7E9DF */}
                            <Card 
                                style={{background: "#"}} 
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
