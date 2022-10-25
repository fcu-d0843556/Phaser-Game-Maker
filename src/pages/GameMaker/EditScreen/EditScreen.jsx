import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button, Layout, Space} from 'antd';
import { Avatar, List } from 'antd';
import { Collapse, Row,Col } from 'antd';

import { DeleteFilled,CloudUploadOutlined, PlayCircleOutlined, EditOutlined } from '@ant-design/icons';

//Pages
import ModifyTabDrawer from './ModifyTabDrawer/ModifyTabDrawer';

//Components


import './EditScreen.css'

const { Footer } = Layout;
const { Panel } = Collapse;


export default class EditScreen extends Component {

    state = {
        mobileModifyMode: "modify",
        nowPanel: ""
    }

    refreshGame = (event) => {
        PubSub.publishSync("closeAllDrawer")
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
        console.log("back");
        PubSub.publishSync("getGameData", "default")
        this.refreshGame()
    }

    

    render() {
        const changeCollapsePanel = (nowPanel) => {
            if(nowPanel.length === 2){
                this.setState({nowPanel:nowPanel[1]})
            }else{
                this.setState({nowPanel:nowPanel[0]})
            }
            // console.log("dd",nowPanel);
        }

        // console.log(this.props);
        const {gameModifyDatas,gameId,username} = this.props
        
        const {width} = this.props
        const {mobileModifyMode,nowPanel} = this.state;
        const data = Object.keys(gameModifyDatas)

        // console.log("dd",width);

        return (
            <Row>
                <Col span={width >=1000 ? 8:0}></Col>

                <Col offset={width >=1000 ? 8: width >= 845 ? 12 : 0} span={width >=1000 ? 8: width >= 845 ? 12 : 24} style={{zIndex: 2}}>
                    <div className="modify-cards-screen" >
                        <form> 
                            <List
                                style={{visibility: mobileModifyMode === "modify" || width >=845 ? "visible" : "hidden"}}
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={function(key) {
                                    return (
                                        <Collapse onChange={changeCollapsePanel} activeKey={nowPanel}>
                                            <Panel header={gameModifyDatas[key].modifyTitle} key={key}>
                                                {
                                                    gameModifyDatas[key].items.map((item)=>{
                                                        // console.log("item", item.name);
                                                        return (
                                                            
                                                            <List.Item key={item.name}>

                                                                <ModifyTabDrawer darwerName={item.name} width={width} gameId={gameId} username={username} key={item.name} {...item}  ></ModifyTabDrawer>
                                                                
                                                                <List.Item.Meta
                                                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                                    description="Ant Design, a design language for background applications"
                                                                />
                
                                                            </List.Item>
                                                                
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>
                                    )
                                } }
                            />
                        </form>
                    </div>  
                </Col>

                <Layout style={{zIndex: 10}}>
                    <Footer className="fixed-game-footer" >
                    <Button icon={<DeleteFilled style={{fontSize: 16, verticalAlign: "text-top"}}/>} type="danger" onClick={this.backToDefaultDatas}>回到默認資料</Button>
                        <Space style={{float: "right"}} size="small">
                            <Button icon={mobileModifyMode === "modify"  ? <PlayCircleOutlined style={{fontSize: 16, verticalAlign: "text-top"}}/> : <EditOutlined style={{fontSize: 16, verticalAlign: "text-top"}}/> } style={{backgroundColor: "#ffa940"}} onClick={this.changeModifyMode} className="preview-button-mobile">{mobileModifyMode === "modify"  ? "預覽變化" : "編輯" }</Button>
                            <Button icon={<PlayCircleOutlined style={{fontSize: 16, verticalAlign: "text-top"}} />} style={{backgroundColor: "#ffa940"}} onClick={this.refreshGame} className="preview-button-PC">預覽變化</Button>
                            <Button icon={<CloudUploadOutlined style={{fontSize: 16, verticalAlign: "text-top"}} />}   style={{backgroundColor: "#40a9ff"}} onClick={this.renderGame}>生成遊戲</Button>
                        </Space>
                    </Footer>
                </Layout>
            </Row>
        )
    }
}
