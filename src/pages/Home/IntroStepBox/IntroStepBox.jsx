import React, { Component } from 'react'
import { Layout, List,Card } from 'antd'
import { Image, Space, Typography } from 'antd'

import './IntroStepBox.less'

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default class IntroStepBox extends Component {
    render() {
        const {width} = this.props

        // 3個步驟圖標的顯示
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
                    </Typography>
                ),
                extra: (<Image src={ width < 768 ? "/icon/arrowDownIcon.svg" : "/icon/arrowRightIcon.svg"} style={{padding: width < 768 ? "20px 0 0 0" : "0"}} preview={false} />)
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
                ),
                extra: (<Image src={ width < 768 ? "/icon/arrowDownIcon.svg" : "/icon/arrowRightIcon.svg"} style={{padding: width < 768 ? "20px 0 0 0" : "0"}} preview={false} />)
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
            // 顯示製作流程區塊
            <Content className='step-box' >
                <Title className='step-title' style={{marginBottom: "66px", width: width >= 500 ? "400px" : "auto"}}>製 作 流 程</Title>
                
                <List
                    // 根據裝置大小調整畫面的顯示，響應式設計
                    grid={{
                        xs: 1,
                        sm: 1,
                        md: 3,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={data}
                    renderItem={item => (
                        // render出3個步驟圖標
                        <List.Item style={{ marginBottom: "32px" }}>
                            <Card 
                                style={{background: "#F7E9DF"}} 
                                headStyle={{borderBottom: "none", padding:"0px"}}
                                bordered={false}  
                                title={item.title}
                                bodyStyle={{padding: "0 24px"}}
                                extra={width >= 768 ? item.extra : ""}
                            >
                                {item.content}
                            </Card>
                            {
                                width < 768 ? item.extra : ""
                            }

                        </List.Item>
                    )}
                />
            </Content>
        )
    }
}
