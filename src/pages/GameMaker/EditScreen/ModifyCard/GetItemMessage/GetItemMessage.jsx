import React, { Component } from 'react'
import PubSub from 'pubsub-js'


import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Input,InputNumber, Tooltip } from 'antd';
import { Col,Divider,Card } from 'antd';


export default class GetItemMessage extends Component {
    
    state = {
        textDatas: {}
    }

    componentDidMount(){
        this.setState({
            textDatas: {...this.props}
        })
    }

    render() {
        const {description,content,modifyTitle,inputType} = this.props.text
        
        const changeNumberValue = (value) => {
            const {textDatas} = this.state
            textDatas.text.content = value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        };
        
        const changeTextValue = (event) => {
            const {textDatas} = this.state
            textDatas.text.content = event.target.value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        }

        return (
            <Col span={24}>
                <Card 
                    title={modifyTitle}
                    headStyle={{fontSize: 24}}
                    bordered={false}
                    extra={
                        <Tooltip title={description} placement="left">
                            <QuestionCircleTwoTone twoToneColor="#52c41a" style={{float: "right", fontSize: '24px'}} />
                        </Tooltip>
                    }
                >
                    
                    {
                        (inputType === "number") ? 
                            <InputNumber min={1} max={100000} value={content} onChange={changeNumberValue} />
                        :
                            <Input placeholder={modifyTitle} allowClear value={content} onKeyDown={e => e.stopPropagation()} onChange={changeTextValue} />
                    }
                </Card>
                
            </Col>
        )
    }
}
