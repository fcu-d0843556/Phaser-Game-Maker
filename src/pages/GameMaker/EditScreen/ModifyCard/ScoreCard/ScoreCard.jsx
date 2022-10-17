import React, { Component } from 'react'
import { InputNumber } from 'antd';

import PubSub from 'pubsub-js'


export default class ScoreCard extends Component {
    
    state = {
        textDatas: {}
    }

    componentDidMount(){
        this.setState({
            textDatas: {...this.props}
        })
    }

  
    render() {
        const changeValue = (value) => {
            const {textDatas} = this.state
            textDatas.score.content = value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: textDatas})
        };
        
        const {content} = this.props.score
        // ,modifyTitle,inputType
        return (
            <div>
                <div className="card-header">
                    <div className="mb-3">
                        <label className="form-label modify-card-title">氣 球 擊 破 得 分</label>
                        <br/>
                        <InputNumber min={-100000} max={100000} defaultValue={content} onChange={changeValue} />
                    </div>
                </div>
            </div>
        )
    }
}
