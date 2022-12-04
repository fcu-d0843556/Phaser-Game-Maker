import React, { Component }  from 'react'
import PubSub from 'pubsub-js'
import cloneDeep from 'lodash.clonedeep';

import { Input, Radio, Space } from 'antd';
import { Col,Card } from 'antd';


export default class SelectionCard extends Component {
    
    state = {
        selectionDatas: {},
        pubsubList: []
    }

    componentDidMount(){
        this.setState({
            selectionDatas: {...this.props}
        })

        let {pubsubList} = this.state

        pubsubList.push(
            PubSub.subscribe('backToDefaultDatas', (msg,gameModifyDatas)=> {
                const {selectionDatas} = this.state
                if(gameModifyDatas[selectionDatas.parent] !== undefined){
                    for(let i=0;i<gameModifyDatas[selectionDatas.parent].items.length;i++){
                        if(gameModifyDatas[selectionDatas.parent].items[i].name === selectionDatas.name){
                            this.setState({
                                selectionDatas: cloneDeep(gameModifyDatas[selectionDatas.parent].items[i])
                            })
                            break
                        }
                    }
                }
            })
        )
    }

    componentWillUnmount(){
        const {pubsubList} = this.state
        for(let i=0;i< pubsubList.length;i++){
            PubSub.unsubscribe(pubsubList[i])
        }
    }

    changeValue = (type,value) => {
        const {selectionDatas} = this.state
        return (event) => {
            switch(type){
                case 'selected':
                    selectionDatas.selection.selected = value
                    break
                default:
                    console.log('SelectionCard error!');
            }

            PubSub.publishSync("setFormDatas",{name: this.props.name, values: selectionDatas})
        }
    }
  
    render() {
        const {modifyTitle,content,selected} = this.props.selection
        // console.log("sele",this.props.selection);

        
        return (
            <Col span={24}>
                <Card>
                    <Radio.Group value={selected}>
                        <Space direction="vertical">
                            {
                                content.map((selection)=>{
                                    return (
                                        <Radio value={selection.id} key={selection.id} onChange={this.changeValue("selected", selection.id)}> 
                                            <Input placeholder={modifyTitle} disabled value={selection.text} onKeyDown={e => e.stopPropagation()}/>
                                        </Radio>
                                    )
                                })
                            }
                        </Space>
                    </Radio.Group>
                </Card>
            </Col>
        )
    }
}
