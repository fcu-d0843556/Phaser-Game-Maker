import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button,Drawer,Col,List} from 'antd'

import ModifyCard from '../ModifyCard/ModifyCard'
import DefaultFileBox from '../DefaultFileBox/DefaultFileBox'

import './ModifyTabDrawer.less'

export default class ModifyTabDrawer extends Component {

    state = {
        darwerName: "",

        width: window.innerWidth,

        visible: false,
        isDefaultDrawerOpened: false,
        DefaultFileBoxInit: false
    }

    updateDimensions = () => {
        this.setState({
            width: window.innerWidth
        });
    }

    componentDidMount(){
        window.addEventListener("resize", this.updateDimensions);

        this.setState({darwerName: this.props.darwerName})
        PubSub.subscribe("closeAllDrawer",(msg)=>{this.setState({visible: false});})
        PubSub.subscribe("closeAllDefaultCardDrawer",(msg)=>{this.setState({isDefaultDrawerOpened: false});})
        PubSub.subscribe("showDefaultCardDrawer",(msg,name)=>{
            const {darwerName} = this.state
            if(darwerName === name){
                const {isDefaultDrawerOpened} = this.state
                this.setState({isDefaultDrawerOpened: !isDefaultDrawerOpened});
            }else{
                this.setState({isDefaultDrawerOpened: false})
            }
        })

    }

    showDrawer = () => {
        const {visible,DefaultFileBoxInit} = this.state
        PubSub.publishSync("closeAllDrawer")
        PubSub.publishSync("closeAllDefaultCardDrawer")
        this.setState({
            visible: !visible,
            DefaultFileBoxInit: true
        });
    };

    closeDrawer = () => {
        this.setState({visible: false});
    };

    closeDefaultCardDrawer = () => {
        this.setState({isDefaultDrawerOpened: false});
    };

    render() {
        const {modifyTitle, gameId} = this.props
        const {visible,isDefaultDrawerOpened, width,DefaultFileBoxInit} = this.state
        // console.log("width", width);
        

        return (
            <div>
                {
                    // 電腦等裝置size大的drawer
                    width >= 1000 ? 
                        <Drawer drawerStyle={{background:"#F69653", borderRadius: 0}} push={false} width={width - 410} zIndex="1" title={modifyTitle} placement="right" onClose={this.closeDrawer} open={visible}>
                            <Col span={width >= 1350 ?12: width >= 1120 ? 11 : 10}>

                                {/* 內部細項設定 */}
                                <ModifyCard {...this.props}></ModifyCard>

                                {/* 需要使用這個，解決drawer打開後還未初始化的問題 */}
                                <div style={{display: "none"}}>
                                    <DefaultFileBox gameId={gameId}></DefaultFileBox>
                                </div> 

                                {/* 開啟預設圖片的drawer */}
                                <Drawer drawerStyle={{background:"#F69653"}} push={false} width={width - 410} zIndex="1" title="使用預設圖片" placement="right" onClose={this.closeDefaultCardDrawer} open={isDefaultDrawerOpened}>
                                    <Col span={width >= 1350 ?12: width >= 1120 ? 11 : 10}>
                                        {/* 顯示預設檔案的drawer */}
                                        <DefaultFileBox gameId={gameId}></DefaultFileBox>
                                    </Col>                      
                                </Drawer>
                                
                            </Col>
                        </Drawer> 
                    :
                        // 手機等裝置size小的drawer
                        <Drawer drawerStyle={{background:"#F69653"}} width={width} zIndex={width >= 845 ?1:0}  title={modifyTitle} placement="right" onClose={this.closeDrawer} open={visible}>
                            <Col span={width >= 845 ?11:24}>
                                {/* 內部細項設定 */}
                                <ModifyCard {...this.props}></ModifyCard>

                                {/* 需要使用這個，解決drawer打開後還未初始化的問題 */}
                                <div style={{display: "none"}}>
                                    <DefaultFileBox gameId={gameId}></DefaultFileBox>
                                </div> 

                                {/* 開啟預設圖片的drawer */}
                                <Drawer drawerStyle={{background:"#F69653"}} push={false} width={width} zIndex={width >= 845 ?1:0}  title="使用預設圖片" placement="right" onClose={this.closeDefaultCardDrawer} open={isDefaultDrawerOpened}>
                                    <Col span={width >= 845 ?11:24}>
                                        {/* 顯示預設檔案的drawer */}
                                        <DefaultFileBox gameId={gameId}></DefaultFileBox>
                                    </Col>
                                </Drawer> 
                            </Col>
                        </Drawer> 
                }

                <Button onClick={this.showDrawer} className='drawer-list-button' >{modifyTitle}</Button>   
            </div> 
        )
    }
}
