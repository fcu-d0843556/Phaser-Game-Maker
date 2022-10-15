import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import { InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message } from 'antd';
import axios from 'axios';


export default class ImageSettings extends Component {

    state = {
        ImageDatas: {},
    }
    
    componentDidMount(){
        // console.log(this.props);
        this.setState({
            ImageDatas: {...this.props}
        })

        PubSub.subscribe("usingDefaultDatas",(msg,status)=>{
            const {ImageDatas} = this.state
            // console.log(ImageDatas);
            // console.log("status.selectedCardName",status.selectedCardName,ImageDatas.name);
            if(status.selectedCardName === ImageDatas.name){
                // console.log('dd',ImageDatas);
                if(status.isSelected){
                    // console.log("ok");
                    ImageDatas.img = status.selectedItem.img
                    this.setState({ImageDatas})
                    PubSub.publish("setFormDatas",{name: this.props.name, values: ImageDatas})
                }else{
                    // console.log("no",saveItem);
                    // this.setState({ImageDatas: saveItem})
                    // PubSub.publish("setFormDatas",{name: this.props.name, values: saveItem})
                }
            }
        })
    }

    showDefaultCard = (name) => {
        return () => {
            const {parent} = this.state.ImageDatas
            // console.log("get : " , name, parent);
            PubSub.publish('showDefaultCard',{
                name: name,
                parent: parent
            })
        }
    }

    render() {
        const {position,size,src} = this.props.img
        const {name} = this.props

        const changeSizeValue = (value) => {
            const {ImageDatas} = this.state
            ImageDatas.img.size = value
            PubSub.publish("setFormDatas",{name: this.props.name, values: ImageDatas})
        };

        const changePositionValue = (type) => {
            const {ImageDatas} = this.state
            return (value) => {
                ImageDatas.img.position[type] = value
                PubSub.publish("setFormDatas",{name: this.props.name, values: ImageDatas})
            }
        }

        const beforeUpload = (file) => {
            const isPNG = file.type === 'image/png';

            if (!isPNG) {
            message.error(`${file.name} is not a png file`);
            }

            return isPNG || Upload.LIST_IGNORE;
        }


        const uploadFile = (file) => {
            const {username} = this.props
            // console.log("g",username);
            // console.log(file);
            // file.file.status = "done"
            if(file.file.percent !== 100){
                console.log("in");
                axios(
                    {
                        method: 'post',
                        url: '/uploadFile',
                        params: {
                            username: username,
                            file: file.file,
                            cool: "nihao"
                        },
                        
                    }
                ).then(
                    response => {
                        
                    }
                )
                message.success(`文件上传成功`)
            }
            
            
            
        }

        return (
            <div>
                <div className="card-header">
                    {
                        position ? 
                            <div className="row">
                            {
                                position.x ? 
                                    <div className="col">
                                        <label className="form-label">圖片水平位置</label>
                                        <InputNumber min={0} max={1000} defaultValue={position.x} onChange={changePositionValue("x")} />
                                    </div>
                                :   <div></div>
                            }
                            
                            {
                                position.y ?
                                <div className="col">
                                    <label className="form-label">圖片垂直位置</label>
                                    <InputNumber min={0} max={1000} defaultValue={position.y} onChange={changePositionValue("y")} />
                                </div>
                                :   <div></div> 
                            }
                            </div>
                        :
                        <div></div>
                    }
                    
                
                    <div className="row">
                        <div className="col">
                            <label className="form-label">圖片的大小</label>
                            <InputNumber min={1} max={1000} defaultValue={size} onChange={changeSizeValue} />
                        </div>
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">圖片預覽</h5>
                        <img src={src} style={{width: "50%", height: "50%"}} alt="empty_image" />
                    </div>


                    <div className="card-body">
                        <Space
                            direction="vertical"
                            style={{
                            width: '100%',
                            }}
                            size="large"
                        >
                            <Upload
                                action="/uploadFile"
                                // listType="picture"
                                method='post'
                                // beforeUpload={beforeUpload}
                                onChange={uploadFile}
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                            </Upload>
                        </Space>
                    </div>



                    <div className="card-body">
                        <button type="button" onClick={this.showDefaultCard(name)} className="btn btn-dark">使用其他提供的圖片</button>
                    </div>
                </div>
            </div>
        )
    }
}
