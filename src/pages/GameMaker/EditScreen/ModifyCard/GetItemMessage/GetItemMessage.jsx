import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import cloneDeep from 'lodash.clonedeep';
import { Input,InputNumber, Typography, Tooltip, Col,Card} from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';

const { TextArea } = Input;
const { Title} = Typography

export default class GetItemMessage extends Component {
    
    state = {
        textDatas: {},
        pubsubList: []
    }

    componentDidMount(){
        this.setState({
            textDatas: {...this.props}
        })

        let {pubsubList} = this.state

        pubsubList.push(
            PubSub.subscribe('backToDefaultDatas', (msg,gameModifyDatas)=> {
                const {textDatas} = this.state
                if(gameModifyDatas[textDatas.parent] !== undefined){
                    for(let i=0;i<gameModifyDatas[textDatas.parent].items.length;i++){
                        if(gameModifyDatas[textDatas.parent].items[i].name === textDatas.name){
                            this.setState({
                                textDatas: cloneDeep(gameModifyDatas[textDatas.parent].items[i])
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

    render() {
        const {content,modifyTitle,inputType,unit,min, max,size} = this.props.text
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

        const changeSizeValue = (value) => {
            const {textDatas} = this.state
            textDatas.text.size = value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        }

        return (
            <div>
                <Col span={24}>
                    <Card 
                        bordered={false}
                    >
                        
                        {
                            (inputType === "number") ? 
                                <div>
                                    <InputNumber 
                                        min={min} 
                                        max={max} 
                                        value={content} 
                                        onChange={changeNumberValue} 
                                        formatter={(value) => {
                                            if(value === ''){
                                                return 0
                                            }else{
                                                return value
                                            }
                                        }}
                                        parser={(value) => {
                                            if(value === ''){
                                                return 0
                                            }else{
                                                return value
                                            }
                                        }}
                                        addonAfter={unit}
                                    />

                                    <Tooltip title={`請填入 ${min} 到 ${max} 之間的數字`} placement="left">
                                        <QuestionCircleTwoTone twoToneColor="#f56a00" style={{float: "right", fontSize: '24px'}} />
                                    </Tooltip>
                                </div>
                            :
                                <TextArea rows={12} placeholder={modifyTitle} allowClear value={content} onKeyDown={e => e.stopPropagation()} onChange={changeTextValue} />
                        }
                    </Card>
                    
                </Col>

                {
                    size !== undefined ? 
                        <Col span={24}>
                            <Card 
                                title={<Title className='modify-card-card-tile' level={4}>訊 息 文 字 大 小</Title>}
                                bordered={false}
                            >
                                <InputNumber 
                                    min={1} max={50} 
                                    value={size} 
                                    onChange={changeSizeValue} 
                                />
                            </Card>
                        </Col>
                    
                    : <div></div>


                }
                
                
            </div>
        )
    }
}
