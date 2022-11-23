import React, { Component }  from 'react'
import PubSub from 'pubsub-js'

import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Input, Radio, Space,Tooltip } from 'antd';
import { Col,Card } from 'antd';


export default class SelectionCard extends Component {
    
    state = {
        selectionDatas: {}
    }

    componentDidMount(){
        console.log(this.props);
        this.setState({
            selectionDatas: {...this.props}
        })
        
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
