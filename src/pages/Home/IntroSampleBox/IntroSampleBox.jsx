import React, { Component } from 'react'
import { Layout, List,Card } from 'antd'
import { Image, Space, Typography } from 'antd'

import './IntroSampleBox.less'

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

export default class IntroSampleBox extends Component {
    render() {
        const {width} = this.props

        // 4個範例遊戲圖片的顯示和文字敘述內容
        const data = [
            {
                content: ( 
                    <Typography>
                        <Paragraph>
                            <Title level={5}>遊戲來源：戳戳樂遊戲</Title>
                        </Paragraph>
                        <Paragraph>
                            <Text>藉此遊戲來決定要吃什麼食物</Text>
                        </Paragraph>
                    </Typography>
                ),
                src: "food.png"
            },
            {
                content: ( 
                    <Typography>
                        <Paragraph>
                            <Title level={5}>遊戲來源：射擊遊戲</Title>
                        </Paragraph>
                        <Paragraph>
                            <Text>藉此遊戲來增加過新年的氣氛</Text>
                        </Paragraph>
                    </Typography>
                ),
                src: "newYear1.png"
            },
            {
                content: ( 
                    <Typography>
                        <Paragraph>
                            <Title level={5}>遊戲來源：煮菜遊戲</Title>
                        </Paragraph>
                        <Paragraph>
                            <Text>藉此遊戲傳達對媽媽做菜的辛苦</Text>
                        </Paragraph>
                    </Typography>
                ),
                src: "mom1.png"
            },
            {
                content: ( 
                    <Typography>
                        <Paragraph>
                            <Title level={5}>遊戲來源：接星星遊戲</Title>
                        </Paragraph>
                        <Paragraph>
                            <Text>想要製作遊戲給比自己年紀小的小孩子</Text>
                        </Paragraph>
                    </Typography>
                ),
                src: "toy1.png"
            }
        ]

        return (
            // 顯示作品預覽區塊的程式
            <Content className='sample-box' style={{padding: width < 425 ? "64px 16px" : "64px 48px"}}>
                <Title className='sample-title' style={{width: width >= 500 ? "400px" : "auto"}}>作 品 預 覽</Title>

                <Paragraph>
                    <Text>我們的使用者利用Phaser Game Maker製作出來的獨特遊戲</Text>
                </Paragraph>
                <Paragraph style={{marginBottom: "66px"}}>
                    <Text>您也可以透過這個遊戲編輯器來做出充滿心意的遊戲！</Text>
                </Paragraph>
                <List
                    // 根據裝置大小調整畫面的顯示，響應式設計
                    grid={{
                        gutter: 48,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={data}
                    renderItem={item => (
                    // render出4個圖片
                    <List.Item style={{ marginBottom: "32px" }}>
                        <Card 
                            hoverable
                            style={{background: "#F69653", padding: "10px",borderRadius: "6px"}} 
                            headStyle={{borderBottom: "none"}}
                            bordered={false}  
                            title={item.title}
                            bodyStyle={{padding: "24px 16px 0 16px"}}
                            cover={<Image alt="sample" src={`/img/sample/${item.src}`} />}
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
