import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button,Drawer,Col,Typography} from 'antd'

import ModifyCard from '../ModifyCard/ModifyCard'
import DefaultFileBox from '../DefaultFileBox/DefaultFileBox'

import './ModifyTabDrawer.less'

const { Title} = Typography;

export default class ModifyTabDrawer extends Component {

    state = {
        darwerName: "",

        width: window.innerWidth,

        visible: false,
        isDefaultDrawerOpened: false,

        defaultFilesData: {},
        pubsubList: []
    }

    updateDimensions = () => {
        this.setState({
            width: window.innerWidth
        });
    }

    componentDidMount(){
        let {pubsubList} = this.state
        window.addEventListener("resize", this.updateDimensions);

        this.setState({darwerName: this.props.darwerName})

        pubsubList.push(PubSub.subscribe("closeAllDrawer",(msg)=>{this.setState({visible: false});}))
        pubsubList.push(PubSub.subscribe("closeAllDefaultCardDrawer",(msg)=>{this.setState({isDefaultDrawerOpened: false});}))
        pubsubList.push(PubSub.subscribe("showDefaultCardDrawer",(msg,name)=>{
            const {darwerName} = this.state
            if(darwerName === name){
                const {isDefaultDrawerOpened} = this.state
                this.setState({isDefaultDrawerOpened: !isDefaultDrawerOpened});
            }else{
                this.setState({isDefaultDrawerOpened: false})
            }
        }))

        pubsubList.push(PubSub.subscribeOnce('saveDefaultCardDatas', (msg,datas)=>{
            this.setState({
                defaultFilesData: datas.items
            })
        }))

        this.setState({pubsubList})

    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions)
        const {pubsubList} = this.state
        for(let i=0;i< pubsubList.length;i++){
            PubSub.unsubscribe(pubsubList[i])
        }
    }

    showDrawer = () => {
        const {visible} = this.state
        PubSub.publishSync("closeAllDrawer")
        PubSub.publishSync("closeAllDefaultCardDrawer")
        this.setState({
            visible: !visible
        });
    };

    closeDrawer = () => {
        this.setState({visible: false});
    };

    closeDefaultCardDrawer = () => {
        this.setState({isDefaultDrawerOpened: false});
    };

    render() {
        const {modifyTitle, gameId,name} = this.props
        const {visible,isDefaultDrawerOpened, width, darwerName,defaultFilesData} = this.state
        
        return (
            <div>
                {
                    // ???????????????size??????drawer
                    width >= 1000 ? 
                        <Drawer destroyOnClose={true} drawerStyle={{background:"#F69653", borderRadius: 0}} push={false} width={width - 410} zIndex="10" title={<Title level={4} style={{margin: 0}}>{modifyTitle}</Title>} placement="right" onClose={this.closeDrawer} open={visible}>
                            <Col span={width >= 1350 ?15: width >= 1120 ? 14 : 13}>

                                {/* ?????????????????? */}
                                <ModifyCard {...this.props}></ModifyCard>

                                {/* ?????????????????????drawer */}
                                <Drawer drawerStyle={{background:"#F69653"}} push={false} width={width - 410} zIndex="10" title={<Title level={4} style={{margin: 0}}>??????????????????</Title>} placement="right" onClose={this.closeDefaultCardDrawer} open={isDefaultDrawerOpened}>
                                    <Col span={width >= 1350 ?15: width >= 1120 ? 14 : 13}>
                                        {/* ?????????????????????drawer */}
                                        <DefaultFileBox defaultFilesData={defaultFilesData} gameId={gameId}></DefaultFileBox>
                                    </Col>                      
                                </Drawer>
                                
                            </Col>
                        </Drawer> 
                    :
                        // ???????????????size??????drawer
                        <Drawer destroyOnClose={true} drawerStyle={{background:"#F69653"}} width={width} zIndex={width >= 845 ?10:0}  title={<Title level={4} style={{margin: 0}}>{modifyTitle}</Title>} placement="right" onClose={this.closeDrawer} open={visible}>
                            <Col span={width >= 845 ?15:24}>
                                {/* ?????????????????? */}
                                <ModifyCard {...this.props}></ModifyCard>

                                {/* ?????????????????????drawer */}
                                <Drawer drawerStyle={{background:"#F69653"}} push={false} width={width} zIndex={width >= 845 ?10:0}  title={<Title level={4} style={{margin: 0}}>??????????????????</Title>} placement="right" onClose={this.closeDefaultCardDrawer} open={isDefaultDrawerOpened}>
                                    <Col span={width >= 845 ?15:24}>
                                        {/* ?????????????????????drawer */}
                                        <DefaultFileBox defaultFilesData={defaultFilesData} gameId={gameId}></DefaultFileBox>
                                    </Col>
                                </Drawer> 
                            </Col>
                        </Drawer> 
                }
                
                <Button onClick={this.showDrawer} className='drawer-list-button'>
                    {modifyTitle} 
                </Button>  
                 
            </div> 
        )
    }
}
