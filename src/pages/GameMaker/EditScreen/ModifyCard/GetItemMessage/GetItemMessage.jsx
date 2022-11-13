import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import { Input,InputNumber, Typography} from 'antd';
import { Col,Card } from 'antd';

const { Paragraph, Title} = Typography;

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
        const {description,content,modifyTitle,inputType,unit} = this.props.text
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
                    // title={<Title className='modify-card-card-tile' level={4}>{modifyTitle}</Title>}
                    bordered={false}
                >
                    
                    {
                        (inputType === "number") ? 
                            <InputNumber 
                                min={1} 
                                max={100000} 
                                value={content} 
                                onChange={changeNumberValue} 
                                formatter={(value) => `${value}${unit}`}
                                parser={(value) => value.replace(unit, '')}
                            />
                        :
                            <Input placeholder={modifyTitle} allowClear value={content} onKeyDown={e => e.stopPropagation()} onChange={changeTextValue} />
                    }
                </Card>
                
            </Col>
        )
    }
}
