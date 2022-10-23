import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button,Drawer} from 'antd'

export default class ModifyTabDrawer extends Component {

    state = {
        visible: false
    }

    changeCard = () => {
        
    }

    showDrawer = () => {
        this.setState({visible: true});
    };

    closeDrawer = () => {
        this.setState({visible: false});
    };

    render() {
        const {modifyTitle, width} = this.props
        console.log("gig");
        return (
            <div>
                {
                    width >= 1000 ? 
                        <Drawer width={width - 410} zIndex="1" title="Basic Drawer" placement="right" onClose={this.closeDrawer} visible={this.state.visible}>
                                <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Drawer> 
                    :
                        <Drawer width={width} zIndex={width >= 845 ?1:0}  title="Basic Drawer" placement="right" onClose={this.closeDrawer} visible={this.state.visible}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Drawer> 
                }
                    
                <Button onClick={this.showDrawer} type="primary">{modifyTitle}</Button>   
            </div> 
        )
    }
}
