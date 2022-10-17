import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button} from 'antd'

export default class ModifyTab extends Component {

    changeCard = () => {
        const {keyword,parent} = this.props
        PubSub.publishSync('changeCard',{
            keyword,
            parent
        })
    }

    render() {
        const {modifyTitle} = this.props
        return (
            <Button onClick={this.changeCard} type="primary">{modifyTitle}</Button>    
        )
    }
}
