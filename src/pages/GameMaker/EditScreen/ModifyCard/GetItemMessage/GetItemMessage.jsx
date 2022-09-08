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
        const {description,content,modifyTitle} = this.props.text
        return (
            <div>

                <div className="card-header">
                    <div className="mb-3">
                        <label className="form-label modify-card-title">{modifyTitle}</label>
                        <br/>
                        填入訊息： <input type="text" onChange={this.changeValue("content")} value={content}/>
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
