import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button,Drawer,Col,List} from 'antd'

import ModifyCard from '../ModifyCard/ModifyCard'

export default class ModifyTabDrawer extends Component {

    state = {
        visible: false
    }

    componentDidMount(){
        PubSub.subscribe("closeAllDrawer",(msg)=>{
            this.setState({visible: false});
        })
    }

    showDrawer = () => {
        const {visible} = this.state
        PubSub.publishSync("closeAllDrawer")
        this.setState({visible: !visible});
    };

    closeDrawer = () => {
        this.setState({visible: false});
    };

    render() {
        const {modifyTitle, width} = this.props
        
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
                    
                <Button onClick={this.showDrawer} type="primary">{modifyTitle}</Button>   
            </div> 
        )
    }
}
