import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button, Layout, Space} from 'antd';
import { Avatar, List } from 'antd';
import { Collapse, Row,Col } from 'antd';

//Pages
import DefaultFileBox from './DefaultFileBox/DefaultFileBox'
import ModifyCard from './ModifyCard/ModifyCard'
import ModifyTab from './ModifyTab/ModifyTab'
import ModifyTabDrawer from './ModifyTabDrawer/ModifyTabDrawer';

//Components


import './EditScreen.css'

const { Footer } = Layout;
const { Panel } = Collapse;


export default class EditScreen extends Component {

    state = {
        mobileModifyMode: "modify"
    }

    refreshGame = (event) => {
        // console.log(event);
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
        // console.log(this.props);
        const {gameModifyDatas,gameId,username} = this.props
        
        const {width} = this.props
        const {mobileModifyMode} = this.state;
        console.log("gg",gameModifyDatas);
        const data = Object.keys(gameModifyDatas)

        return (
            <Row className="ddd ">
            {/* <div className="row justify-content-end " > */}
                <Col span={width >=1000 ? 8:0}>
                    {/* <div className="col-4"></div> */}
                </Col>

                <Col offset={width >=1000 ? 8: width >= 845 ? 12 : 0} span={width >=1000 ? 8: width >= 845 ? 12 : 24} style={{zIndex: 2}}>
                    {/* <div className="col-8 modify-with-default-screen" > */}
                        {/* <div className="row"> */}

                            {/* <DefaultFileBox gameId={gameId}></DefaultFileBox> */}

                            

                            {/* <div className="col-6 right-select-bar" id="allCards" style={{zIndex: 2}}> */}

                            
                                <div className="modify-cards-screen" >
                                    <form> 
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={data}
                                            renderItem={function(key) {
                                                console.log(gameModifyDatas[key].items[0]);
                                                return (
                                                    <Collapse defaultActiveKey={['1']} >
                                                        <Panel header={gameModifyDatas[key].modifyTitle} key={key}>
                                                            {
                                                                gameModifyDatas[key].items.map((item)=>{
                                                                    return (
                                                                        
                                                                        <List.Item key={item.name}>
                                                                            <ModifyTabDrawer width={width} key={item.name} parent={item.parent} keyword={item.name} modifyTitle={item.modifyTitle} ></ModifyTabDrawer>
                                                                            
                                                                            <List.Item.Meta
                                                                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                                            title={<a>{key.title}</a>}
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

                                        <div id="allCards" style={{display: (mobileModifyMode === "modify" || width >= 576) ? "block" : "none", zIndex: 1}}>
                                            {
                                                Object.keys(gameModifyDatas).map((key) => {
                                                    // console.log("gameModifyDatas[key]",gameModifyDatas[key]);
                                                    if(gameModifyDatas[key].items){
                                                        return gameModifyDatas[key].items.map((itemObj,index) => {
                                                            return (
                                                                !index ? 
                                                                    <div key={itemObj.name}>
                                                                        {
                                                                            gameModifyDatas[key].items.map((itemObj,index) => {
                                                                                // console.log(itemObj);
                                                                                return (
                                                                                    
                                                                                    <ModifyTab key={itemObj.name} parent={itemObj.parent} keyword={itemObj.name} modifyTitle={itemObj.modifyTitle} ></ModifyTab>
                                                                                )
                                                                            })
                                                                        }
                                                                        <ModifyCard username={username} key={itemObj.name} {...itemObj} showCard={true}></ModifyCard>
                                                                    </div>
                                                                :
                                                                    <div key={itemObj.name}>
                                                                        <ModifyCard username={username} key={itemObj.name} {...itemObj} showCard={false}></ModifyCard>
                                                                    </div>
                                                                
                                                            )
                                                        })
                                                    }
                                                })
                                            }
                                        </div>
                                        
                                    </form>
                                </div>  
                            {/* </div> */}
                            
                        {/* </div> */}
                    {/* </div>  */}
                </Col>

                <Layout style={{zIndex: 10}}>
                    <Footer className="fixed-game-footer" >
                    <Button type="danger" onClick={this.backToDefaultDatas}>回到默認資料</Button>

                        <Space style={{float: "right"}} size="small">

                            <Button style={{backgroundColor: "#ffa940"}} onClick={this.changeModifyMode} className="preview-button-mobile">{mobileModifyMode === "modify"  ? "預覽變化" : "編輯" }</Button>
                            <Button style={{backgroundColor: "#ffa940"}} onClick={this.refreshGame} className="preview-button-PC">預覽變化</Button>
                            <Button style={{backgroundColor: "#40a9ff"}} onClick={this.renderGame}>生成遊戲</Button>
                        

                        </Space>

                    </Footer>
                </Layout>
            {/* </div> */}
            </Row>
        )
    }
}
