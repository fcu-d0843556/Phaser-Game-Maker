import React, { Component } from 'react'
import PubSub from 'pubsub-js'


import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Input,InputNumber, Button, Divider, Tooltip } from 'antd';
const { TextArea } = Input;


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
            <div>
                
                <div className="card-header">
                    <Tooltip title={description} placement="left">
                        <QuestionCircleTwoTone twoToneColor="#52c41a" style={{float: "right", fontSize: '24px'}} />
                    </Tooltip>
                    
                    <div className="mb-3">
                    
                        <label className="form-label modify-card-title">{modifyTitle}</label>
                        <br/>
                        {
                            (inputType === "number") ? 
                                <InputNumber min={1} max={100000} defaultValue={content} onChange={changeNumberValue} />
                            :
                                <Input placeholder={modifyTitle} allowClear value={content} onChange={changeTextValue} />
                        }
                        
                    </div>
                </div>

            </div>
        )
    }
}
