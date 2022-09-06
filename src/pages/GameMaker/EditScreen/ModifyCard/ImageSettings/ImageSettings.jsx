import React, { Component } from 'react'
import PubSub from 'pubsub-js';

export default class ImageSettings extends Component {

    state = {
        ImageDatas: {}
    }
    
    componentDidMount(){
        this.setState({
            ImageDatas: {...this.props}
        })
        const ImageDatas = this.props
        console.log(ImageDatas == {...this.props});
        
    }

    changePositionValue = (type) => {
        const {ImageDatas} = this.state
        return (event) => {
            ImageDatas.position[type] = parseInt(event.target.value)
            PubSub.publish("setFormDatas",{name: this.props.name, values: ImageDatas})
        }
    }

    changeSizeValue = (event) => {
        const {ImageDatas} = this.state
        ImageDatas.size = event.target.value
        PubSub.publish("setFormDatas",{name: this.props.name, values: ImageDatas})
    }

    render() {
        const {position,size,src} = this.props

        return (
            <div>
                <div className="card-header">
                
                    <div className="row">
                        <div className="col">
                            <label className="form-label">生成的X位置</label>
                            <input ref={c => this.positionX = c} className="form-control" type="number" onChange={this.changePositionValue("x")} value={position.x}/>
                        </div>
                        <div className="col">
                            <label className="form-label">生成的Y位置</label>
                            <input className="form-control" type="number" onChange={this.changePositionValue("y")} value={position.y}/>
                        </div>
                    </div>
                

                    <div className="row">
                        <div className="col">
                            <label className="form-label">圖片的縮放</label>
                            <input className="form-control" type="number" onChange={this.changeSizeValue} value={size} />
                        </div>
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">預覽圖</h5>
                        <img src={src} style={{width: "50%", height: "50%"}} alt="empty_image" />
                    </div>
                </div>

                <div className="card-footer text-muted">
                    <button type="button" className="btn btn-dark">使用其他提供的圖片</button>
                </div>
            </div>
        )
    }
}
