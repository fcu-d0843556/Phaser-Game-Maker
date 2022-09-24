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
        PubSub.subscribe("usingDefaultDatas",(msg,defaultItem)=>{
            // const {ImageDatas} = this.state
            // console.log(ImageDatas);
            PubSub.publish("setFormDatas",{name: this.props.name, values: defaultItem})
        })
    }

    changePositionValue = (type) => {
        const {ImageDatas} = this.state
        return (event) => {
            ImageDatas.img.position[type] = parseInt(event.target.value)
            PubSub.publish("setFormDatas",{name: this.props.name, values: ImageDatas})
        }
    }

    changeSizeValue = (event) => {
        const {ImageDatas} = this.state
        ImageDatas.img.size = event.target.value
        PubSub.publish("setFormDatas",{name: this.props.name, values: ImageDatas})
    }

    showDefaultCard = () => {
        const {parent} = this.state.ImageDatas
        PubSub.publish('showDefaultCard',parent)
    }

    render() {
        const {position,size,src} = this.props.img
        // console.log("imgae",this.props);

        return (
            <div>
                <div className="card-header">
                
                    <div className="row">
                        <div className="col">
                            <label className="form-label">生成的X位置</label>
                            <input className="form-control" type="number" onChange={this.changePositionValue("x")} value={position.x}/>
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

                    <div className="card-body">
                        <button type="button" onClick={this.showDefaultCard} className="btn btn-dark">使用其他提供的圖片</button>
                    </div>
                </div>
            </div>
        )
    }
}
