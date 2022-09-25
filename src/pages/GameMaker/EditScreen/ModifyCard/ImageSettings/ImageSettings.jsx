import React, { Component } from 'react'
import PubSub from 'pubsub-js';

export default class ImageSettings extends Component {

    state = {
        ImageDatas: {},
        saveItem: {}
    }
    
    componentDidMount(){
        // console.log(this.props);
        this.setState({
            ImageDatas: {...this.props}
        })

        PubSub.subscribe("usingDefaultDatas",(msg,status)=>{
            const {saveItem,ImageDatas} = this.state
           
            if(status.selectedItem.name === ImageDatas.name){
                if(status.isSelected){
                    this.setState({
                        ImageDatas: status.selectedItem,
                        saveItem: ImageDatas
                    })
                    PubSub.publish("setFormDatas",{name: this.props.name, values: status.selectedItem})
                }else{
                    this.setState({ImageDatas: saveItem})
                    PubSub.publish("setFormDatas",{name: this.props.name, values: saveItem})
                }
            }
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

    showDefaultCard = (name) => {
        return () => {
            const {parent} = this.state.ImageDatas
            // console.log("get : " , name, parent);
            PubSub.publish('showDefaultCard',{
                name,parent
            })
        }
    }

    render() {
        const {position,size,src} = this.props.img
        const {name} = this.props
        // console.log("imgae",name);

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
                        <button type="button" onClick={this.showDefaultCard({name})} className="btn btn-dark">使用其他提供的圖片</button>
                    </div>
                </div>
            </div>
        )
    }
}
