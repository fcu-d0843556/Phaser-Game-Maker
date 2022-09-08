import React, { Component } from 'react'
import PubSub from 'pubsub-js'


export default class GetItemMessage extends Component {
    
    state = {
        textDatas: {}
    }

    componentDidMount(){
        this.setState({
            textDatas: {...this.props}
        })
    }

    changeValue = (type) => {
        const {textDatas} = this.state
        return (event) => {
            textDatas.text.content = event.target.value
            PubSub.publish("setFormDatas",{name: this.props.name, values: textDatas})
        }
    }
  
    render() {
        const {description,text} = this.props
        return (
            <div>
                <div className="card-header">
                    <div className="mb-3">
                        <label className="form-label">填入訊息</label>
                        <input type="text" onChange={this.changeValue("content")} value={text.content}/>
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
