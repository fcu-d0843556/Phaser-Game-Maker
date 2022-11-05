import React, { Component } from 'react'
import { Layout, List,Card } from 'antd'

import './IntroSampleBox.less'

const { Content } = Layout;

export default class IntroSampleBox extends Component {
    render() {
        const data = [
            {
                title: (<h1>1</h1>),
                content: ( 
                    <div>
                        <p>Use our already complete game</p>
                        <p>..............</p>
                    </div>
                )
            },
            {
                title: (<h1>2!</h1>),
                content: ( 
                    <div>
                        <p>Change game's data to your own style !</p>
                        <p>we use very simple way to let you create games </p>
                    </div>
                )
            },
            {
                title: (<h1>3!</h1>),
                content: ( 
                    <div>
                        <p>Give your friend this game !</p>
                        <p>Enjoy !</p>
                    </div>
                )
            },
            {
                title: (<h1>4</h1>),
                content: ( 
                    <div>
                        <p>Give your friend this game !</p>
                        <p>Enjoy !</p>
                    </div>
                )
            }
        ]

        return (
            <Content className='sample-box' >
                <h1 style={{marginBottom: "50px"}}>別 人 的 作 品</h1>
                <List
                    grid={{
                        gutter: 32,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 4,
                        xxl: 4,
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
