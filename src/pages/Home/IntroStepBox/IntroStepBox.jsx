import React, { Component } from 'react'
import { Layout, List,Card } from 'antd'

import './IntroStepBox.less'

const { Content } = Layout;

export default class IntroStepBox extends Component {
    render() {
        const data = [
            {
                title: (<h1>Choose!</h1>),
                content: ( 
                    <div>
                        <p>Use our already complete game</p>
                        <p>..............</p>
                    </div>
                )
            },
            {
                title: (<h1>Modify!</h1>),
                content: ( 
                    <div>
                        <p>Change game's data to your own style !</p>
                        <p>we use very simple way to let you create games </p>
                    </div>
                )
            },
            {
                title: (<h1>Enjoy!</h1>),
                content: ( 
                    <div>
                        <p>Give your friend this game !</p>
                        <p>Enjoy !</p>
                    </div>
                )
            }
        ]

        return (
            <Content className='step-box' >
                <h1 style={{marginBottom: "50px"}}>製 作 流 程</h1>
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
                    <List.Item>
                        <Card title={item.title}>{item.content}</Card>
                    </List.Item>
                    )}
                />
            </Content>
        )
    }
}
