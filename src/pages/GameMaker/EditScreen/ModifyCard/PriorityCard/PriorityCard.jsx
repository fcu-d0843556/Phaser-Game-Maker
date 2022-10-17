import React, { Component } from 'react'
import { Slider } from 'antd';

import PubSub from 'pubsub-js'


export default class PriorityCard extends Component {
    
    state = {
        textDatas: {}
    }

    componentDidMount(){
        this.setState({
            textDatas: {...this.props}
        })
    }

    
  
    render() {
        const {priority} = this.props
        // console.log(priority);
        const marks = {
            1: {
                style: {color: '#f50',},
                label: <strong>非常低</strong>,
            },
            2: '低',
            3: '一般',
            4: '高',
            5: {
                style: {color: '#f50',},
                label: <strong>非常高</strong>,
            },
        };

        const changeValue = (value) => {
            
            const {textDatas} = this.state
            // console.log(textDatas);
            textDatas.priority = value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        };
        
        // ,modifyTitle,inputType
        return (
            <div>
                <div className="card-header">
                    <div className="mb-3">
                        <label className="form-label modify-card-title">氣 球 出 現 機 率</label>
                        <br/>
                        <Slider min={1}
                                max={5}
                                onAfterChange={changeValue}
                                marks={marks} 
                                step={null} 
                                defaultValue={priority} />
                    </div>
                </div>
            </div>
        )
    }
}
