import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button, Layout, message, Space} from 'antd';
import { List, Collapse, Row,Col, Popconfirm, Form, Tooltip,Typography } from 'antd';

import { DeleteFilled,CloudUploadOutlined, PlayCircleOutlined, EditOutlined, QuestionCircleTwoTone } from '@ant-design/icons';

//Pages
import ModifyTabDrawer from './ModifyTabDrawer/ModifyTabDrawer';

//Components


import './EditScreen.css'

const { Footer } = Layout;
const { Panel } = Collapse;
const { Title} = Typography;


export default class EditScreen extends Component {

    state = {
        mobileModifyMode: "modify",
        nowPanel: ""
    }

    refreshGame = (event) => {
        PubSub.publishSync("closeAllDrawer")
        PubSub.publishSync("closeAllDefaultCardDrawer")
        PubSub.publishSync("refreshGame")
    }
 
    changeModifyMode = () => {
        const {mobileModifyMode} = this.state
        
        this.setState({mobileModifyMode: (mobileModifyMode === "modify" ? "game" : "modify")})
        PubSub.publishSync("setMobileModifyMode",(mobileModifyMode === "modify" ? "game" : "modify"))
        this.refreshGame()
    }

    //發佈遊戲
    renderGame = () => {
        PubSub.publishSync("publishGame")
    }

    //回到默認狀態
    backToDefaultDatas = () => {
        PubSub.publishSync("getGameData", "default")
        message.success("回到默認資料成功，請點選預覽變化觀看結果！")
        this.refreshGame()
    }

    

    render() {
        const changeCollapsePanel = (nowPanel) => {
            if(nowPanel.length === 2){
                this.setState({nowPanel:nowPanel[1]})
            }else{
                this.setState({nowPanel:nowPanel[0]})
            }
        }

        const {gameModifyDatas,gameId,username} = this.props
        // console.log("props", this.props);
        const {width} = this.props
        const {mobileModifyMode,nowPanel} = this.state;
        const data = Object.keys(gameModifyDatas)

        return (
            <Row>
                {/* 響應式設計的相關code */}
                <Col span={width >=1000 ? 8:0}></Col>

                <Col offset={width >=1000 ? 8: width >= 845 ? 12 : 0} span={width >=1000 ? 8: width >= 845 ? 12 : 24} style={{zIndex: 15}}>
                    <div className="modify-cards-screen" style={{marginRight: width >= 845 ? 4.5 : 0}}>
                        <Form> 
                            <List
                                bordered={false}
                                style={{visibility: mobileModifyMode === "modify" || width >=845 ? "visible" : "hidden"}}
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={function(key) {
                                    return (
                                        // 主要drawer的生成
                                        <Collapse className={  key === nowPanel  ? "editscreen-list-collapse editscreen-list-selected" : "editscreen-list-collapse editscreen-list-unselected"}  onChange={changeCollapsePanel} activeKey={nowPanel}>
                                            <Panel style={{borderRadius: 0}} 
                                                   header={<Title level={4} style={{margin: 0}}>{gameModifyDatas[key].modifyTitle}</Title>} 
                                                   key={key} 
                                            >
                                                {
                                                    gameModifyDatas[key].items.map((item)=>{
                                                        return (
                                                            
                                                            // 主要drawer裡，子按鈕的生成
                                                            <List.Item style={{borderRadius: 0}} key={item.name} >

                                                                <ModifyTabDrawer darwerName={item.name} width={width} gameId={gameId} username={username} key={item.name} {...item}  ></ModifyTabDrawer>
                                                                
                                                                {/* 敘述按鈕內容 */}
                                                                <Tooltip title={gameModifyDatas[key].modifyDetail} placement="left">
                                                                    <QuestionCircleTwoTone twoToneColor="#f56a00" style={{float: "right", fontSize: '24px'}} />
                                                                </Tooltip>
                
                                                            </List.Item>
                                                                
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>
                                    )
                                } }
                            />
                        </Form>
                    </div>  
                </Col>
                
                {/* 下方的編輯按鈕 */}
                <Layout style={{zIndex: 30}}>
                    <Footer className="fixed-game-footer" >

                        <Popconfirm placement="top" title="您確定要回到默認遊戲資料嗎？" onConfirm={this.backToDefaultDatas} okText="好" cancelText="取消">
                            <Button icon={<DeleteFilled style={{fontSize: 16, verticalAlign: "text-top"}}/>} className="default-button">回到默認資料</Button>
                        </Popconfirm>

                        <Space style={{float: "right"}} size="small" wrap>
                            <Button icon={mobileModifyMode === "modify"  ? <PlayCircleOutlined style={{fontSize: 16, verticalAlign: "text-top"}}/> : <EditOutlined style={{fontSize: 16, verticalAlign: "text-top"}}/> } onClick={this.changeModifyMode} className="preview-button-mobile preview-button">{mobileModifyMode === "modify"  ? "預覽變化" : "編輯遊戲" }</Button>
                            <Button icon={<PlayCircleOutlined style={{fontSize: 16, verticalAlign: "text-top"}} />}  onClick={this.refreshGame} className="preview-button-PC preview-button">預覽變化</Button>
                            <Button icon={<CloudUploadOutlined style={{fontSize: 16, verticalAlign: "text-top"}} />}  onClick={this.renderGame}  className='save-release-button'>存儲 & 生成遊戲</Button>
                        </Space>
                    </Footer>
                </Layout>
            </Row>
        )
    }
}
