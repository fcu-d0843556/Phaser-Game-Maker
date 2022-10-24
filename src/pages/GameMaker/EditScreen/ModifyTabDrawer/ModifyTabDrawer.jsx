import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button,Drawer,Col,List} from 'antd'

import ModifyCard from '../ModifyCard/ModifyCard'
import DefaultFileBox from '../DefaultFileBox/DefaultFileBox'

export default class ModifyTabDrawer extends Component {

    state = {
        darwerName: "",
        visible: false,
        isDefaultDrawerOpened: false
    }

    componentDidMount(){
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
        const {visible} = this.state
        PubSub.publishSync("closeAllDrawer")
        PubSub.publishSync("closeAllDefaultCardDrawer")
        this.setState({visible: !visible});
    };

    closeDrawer = () => {
        this.setState({visible: false});
    };

    closeDefaultCardDrawer = () => {
        this.setState({isDefaultDrawerOpened: false});
    };

    render() {
        const {modifyTitle, width, gameId} = this.props
        const {isDefaultDrawerOpened} = this.state
        // console.log("gig", this.props);

        return (
            <div>
                {
                    width >= 1000 ? 
                        <Drawer width={width - 410} zIndex="1" title={modifyTitle} placement="right" onClose={this.closeDrawer} visible={this.state.visible}>
                            <Col span={width >= 1350 ?12: width >= 1120 ? 11 : 10}>
                                <ModifyCard {...this.props}></ModifyCard>
                            </Col>
                        </Drawer> 
                    :
                        <Drawer width={width} zIndex={width >= 845 ?1:0}  title={modifyTitle} placement="right" onClose={this.closeDrawer} visible={this.state.visible}>
                            <Col span={width >= 845 ?11:24}>
                                <ModifyCard {...this.props}></ModifyCard>
                            </Col>
                        </Drawer> 
                }

                {
                    width >= 1000 ? 
                        <Drawer width={width - 410} zIndex="1" title="hh" placement="right" onClose={this.closeDefaultCardDrawer} visible={this.state.isDefaultDrawerOpened}>
                            <Col span={width >= 1350 ?12: width >= 1120 ? 11 : 10}>
                                <DefaultFileBox gameId={gameId}></DefaultFileBox>
                            </Col>                      
                        </Drawer>
                    :
                        <Drawer width={width} zIndex={width >= 845 ?1:0}  title="hh" placement="right" onClose={this.closeDefaultCardDrawer} visible={this.state.isDefaultDrawerOpened}>
                            <Col span={width >= 845 ?11:24}>
                                <DefaultFileBox gameId={gameId}></DefaultFileBox>
                            </Col>
                        </Drawer> 
                }
                <Button onClick={this.showDrawer} type="primary">{modifyTitle}</Button>   
            </div> 
        )
    }
}
