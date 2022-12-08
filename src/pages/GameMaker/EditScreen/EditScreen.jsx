import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import cloneDeep from 'lodash.clonedeep';
import {Button, Layout, message, Space} from 'antd';
import { List, Collapse, Row,Col, Popconfirm, Form, Tooltip,Typography , Divider} from 'antd';

import { DeleteFilled,CloudUploadOutlined, PlayCircleOutlined, EditOutlined, QuestionCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

//Pages
import ModifyTabDrawer from './ModifyTabDrawer/ModifyTabDrawer';

//Components


import './EditScreen.css'

const { Footer } = Layout;
const { Panel } = Collapse;
const { Title} = Typography;


export default class EditScreen extends Component {

    state = {
        mobileModifyMode: "game",
        activeTab: ""
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

        const addNewItem = (key) => {
            return () => {
                const {gameModifyDatas} = this.props
                if(key === 'questions'){
                    let num = 0
                    let saveLatestItem
                    let {items} = gameModifyDatas[key] 
                    if(items.length !== 20){
                        while(true){
                            num++
                            if(gameModifyDatas[key].items.find((item)=> {return item.name === ('question' + num)}) === undefined){
                                break
                            }else{
                                saveLatestItem = cloneDeep(gameModifyDatas[key].items.find((item)=> {return item.name === ('question' + num)}))
                            }
                        }
                        if(num === 1){
                            saveLatestItem = cloneDeep(gameModifyDatas[key].items[0])
                        }

                        saveLatestItem.name = ('question' + num)
                        gameModifyDatas[key].items.push(saveLatestItem)
                        PubSub.publishSync("ChangeAllItemsDatas",{parent: key ,items: gameModifyDatas[key].items})
                    }else{
                        message.warning('問題太多了！')  
                    }
                }
                
            }
        } 

        const deleteItem = (nowItem) => {
            return () => {
                const {gameModifyDatas} = this.props
                let {items} = gameModifyDatas[nowItem.parent] 
                if(items.length === 1){
                    message.warning('至少需要一個問題！')
                }else{

                    let changedGameModifyDatas = gameModifyDatas[nowItem.parent].items.filter((item)=>{
                        return item.name !== nowItem.name
                    })
                    PubSub.publishSync("ChangeAllItemsDatas",{parent: nowItem.parent ,items: changedGameModifyDatas})

                }
                
            }
        }

        const {gameModifyDatas,gameId,username} = this.props
        const {width} = this.props
        const {mobileModifyMode,activeTab} = this.state;
        const gameModifyDataKeys = Object.keys(gameModifyDatas)
        // console.log("gameModifyDatas",gameModifyDatas);

        const changeTab = (key) => {
            // console.log(key);
            PubSub.publishSync("closeAllDrawer")
            PubSub.publishSync("closeAllDefaultCardDrawer")
            this.setState({activeTab: key})
        }

        return (
            <Row>
                {/* 響應式設計的相關code */}
                <Col span={width >=1000 ? 8:0}></Col>

                <Col offset={width >=1000 ? 10: width >= 845 ? 16 : 0} span={width >=1000 ? 6: width >= 845 ? 8 : 24} style={{zIndex: 15}}>
                    <div className="modify-cards-screen" style={{marginRight: width >= 845 ? 4.5 : 0}}>
                        <Form style={{marginBottom: 80}}> 
                            <Collapse onChange={changeTab} style={{visibility: mobileModifyMode === "modify" || width >=845 ? "visible" : "hidden"}} accordion>
                                {
                                    gameModifyDataKeys.map((key) => {
                                        return (
                                            <Panel 
                                                destroyInactivePanel={true} 
                                                style={{
                                                    background: activeTab === key ? "linear-gradient(0deg, #F69653 0%, #FFAC70 100%)" : "#538CF6", padding: 0, borderRadius: 0,
                                                }}
                                                header={<Title level={4} style={{margin: 0}}>{gameModifyDatas[key].modifyTitle}</Title>} 
                                                key={key} 
                                            >
                                                <List
                                                    dataSource={gameModifyDatas[key].items}
                                                    
                                                    renderItem={item => {
                                                        return (   
                                                            <List.Item>
                                                                <ModifyTabDrawer darwerName={item.name} width={width} gameId={gameId} username={username} key={item.name} {...item}  ></ModifyTabDrawer>
                                                            
                                                                {/* 敘述按鈕內容 */}
                                                                <Tooltip title={gameModifyDatas[key].modifyDetail} placement="left">
                                                                    {
                                                                        item.question !==undefined ?
                                                                            <Popconfirm placement="left" title="您確定要刪除這項問題？" onConfirm={deleteItem(item)} okText="好" cancelText="取消">
                                                                                <CloseCircleTwoTone twoToneColor="#F55D47" className='delete-item-icon' style={{float: "right", fontSize: '24px'}} />
                                                                            </Popconfirm>
                                                                        :
                                                                            <QuestionCircleTwoTone twoToneColor="#f56a00" style={{float: "right", fontSize: '24px'}} />
                                                                    }
                                                                </Tooltip>
                                                            </List.Item>
                                                        )
                                                    }}
                                                />

                                                {
                                                    key === 'questions' ?
                                                        <div>
                                                            <Divider style={{visibility: "hidden", marginTop: 0}}></Divider>
                                                            <Button onClick={addNewItem(key)} className='drawer-list-button' block>新增問題</Button>
                                                        </div>
                                                    :   <div></div>
                                                }
                                            </Panel>
                                        )
                                    })
                                }
                            </Collapse>
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
