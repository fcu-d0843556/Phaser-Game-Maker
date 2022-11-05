import React, { Component } from 'react'
import { Image, Layout, List,Card, Space, Typography } from 'antd'
import { RocketTwoTone, CopyTwoTone, MobileTwoTone, DesktopOutlined } from '@ant-design/icons';

// import img from './img/phonestyle.svg'
import './IntroFeatureBox.less'

const { Content } = Layout;
const { Title } = Typography;

export default class IntroFeatureBox extends Component {
    render() {
        const data = [
            {
                title: (
                    <Space className='feature-icon-background'>
                        <Image src="/icon/rocketIcon.svg" preview={false} />
                    </Space>
                ),
                content: ( 
                    <div>
                        <p>Use our already complete game</p>
                        <p>..............</p>
                    </div>
                )
            },
            {
                title: (
                    <Space className='feature-icon-background'>
                        <Image src="/icon/rocketIcon.svg" preview={false} />
                    </Space>
                ),
                content: ( 
                    <div>
                        <p>Change game's data to your own style !</p>
                        <p>we use very simple way to let you create games </p>
                    </div>
                )
            },
            {
                title: (
                    <Space className='feature-icon-background'>
                        <Image src="/icon/responsiveIcon.svg" preview={false} />
                    </Space>
                ),
                content: ( 
                    <div>
                        <p>Give your friend this game !</p>
                        <p>Enjoy !</p>
                    </div>
                )
            }
        ]

        return (
            <Content className='feature-box' >
                <h1 style={{marginBottom: "50px"}}>特 色</h1>
                <List
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
                    <List.Item>
                        <Card style={{background: "#F7E9DF",}} 
                        bordered={false}  title={item.title}>{item.content}</Card>
                    </List.Item>
                    )}
                />
            </Content>
        )
    }
}
