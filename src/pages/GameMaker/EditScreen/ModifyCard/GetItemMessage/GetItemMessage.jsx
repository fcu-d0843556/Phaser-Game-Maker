import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import { Input,InputNumber, Typography} from 'antd';
import { Col,Card } from 'antd';

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
        const {content,modifyTitle,inputType,unit,min, max} = this.props.text
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
                    bordered={false}
                >
                    
                    {
                        (inputType === "number") ? 
                            <InputNumber 
                                min={min} 
                                max={max} 
                                value={content} 
                                onChange={changeNumberValue} 
                                formatter={(value) => `${value}${unit}`}
                                parser={(value) => value.replace(unit, '')}
                            />
                        :
                              <TextArea rows={12} placeholder={modifyTitle} allowClear value={content} onKeyDown={e => e.stopPropagation()} onChange={changeTextValue} />
                    }
                </Card>
                
            </Col>
        )
    }
}
