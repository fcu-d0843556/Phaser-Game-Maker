import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button, Layout, Space} from 'antd';

//Pages
import DefaultFileBox from './DefaultFileBox/DefaultFileBox'
import ModifyCard from './ModifyCard/ModifyCard'
import ModifyTab from './ModifyTab/ModifyTab'

//Components


import './EditScreen.css'

const { Footer } = Layout;


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
        // console.log("gg",gameModifyDatas);

        return (
            <div className="row justify-content-end " >
                <div className="col-4"></div>

                <div className="col-8 modify-with-default-screen" >
                    <div className="row">

                        <DefaultFileBox gameId={gameId}></DefaultFileBox>

                        <div className="col-6 right-select-bar" id="allCards" >
                            <div className="modify-cards-screen">
                                <form>
                                    
                                    <div id="allCards" style={{display: (mobileModifyMode === "modify" || width >= 576) ? "block" : "none", zIndex: 1}}>
                                        {
                                            Object.keys(gameModifyDatas).map((key) => {
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
                                    <Layout>
                                        <Footer className="fixed-game-footer" >

                                                

                                            <Space style={{float: "right"}} size="small">
                                                <Button style={{backgroundColor: "#ffa940"}} onClick={this.changeModifyMode} className="preview-button-mobile">{mobileModifyMode === "modify"  ? "預覽變化" : "編輯" }</Button>
                                                <Button style={{backgroundColor: "#ffa940"}} onClick={this.refreshGame} className="preview-button-PC">預覽變化</Button>
                                                <Button style={{backgroundColor: "#40a9ff"}} onClick={this.renderGame}>生成遊戲</Button>
                                            </Space>

                                            <Space size="small">
                                                <Button type="danger" onClick={this.backToDefaultDatas}>回到默認資料</Button>
                                            </Space>

                                        </Footer>
                                    </Layout>
                                </form>
                            </div>  
                        </div>
                        
                    </div>
                </div> 
            </div>
        )
    }
}
