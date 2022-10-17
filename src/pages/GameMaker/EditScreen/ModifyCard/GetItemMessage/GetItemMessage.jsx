import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import { Input,InputNumber } from 'antd';
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
                    <div className="mb-3">
                        <label className="form-label modify-card-title">{modifyTitle}</label>
                        <br/>
                        {
                            (inputType === "number") ? 
                                <InputNumber min={1} max={100000} defaultValue={content} onChange={changeNumberValue} />
                            :
                                <Input placeholder={modifyTitle} allowClear value={content} onChange={changeTextValue} />
                                // <input type={inputType} onChange={this.changeValue("content")} value={content}/>
                        }
                        
                    </div>
                </div>
                
                <div className="card-body">
                    <p>說明：</p>
                    <p>{description}</p>
                </div>

            </div>
        )
    }
}
