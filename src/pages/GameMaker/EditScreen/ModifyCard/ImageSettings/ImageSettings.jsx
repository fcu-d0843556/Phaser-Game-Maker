import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import { InputNumber, Image } from 'antd';
import { UploadOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message } from 'antd';
import axios from 'axios';

export default class ImageSettings extends Component {

    state = {
        ImageDatas: {},
        isUploadFile: false,
        isUploading: false
    }
    
    componentDidMount(){
        // console.log(this.props);
        this.setState({
            ImageDatas: {...this.props}
        })

        PubSub.subscribe("usingDefaultDatas",(msg,status)=>{
            const {ImageDatas} = this.state
            // console.log(ImageDatas,status.selectedCardName);
            // console.log("status.selectedCardName",status.selectedCardName,ImageDatas.name);
            if(status.selectedCardName === ImageDatas.name){
                // console.log('dd',ImageDatas);
                // console.log("status",status);

                if(status.isSelected){
                    // console.log("ok");
                    ImageDatas.img = status.selectedItem.img
                    this.setState({ImageDatas})
                    PubSub.publishSync("setFormDatas",{name: this.props.name, values: ImageDatas})
                }else if(status.uploadFileSrc !== undefined){
                    console.log("dd",ImageDatas.img.src,status.uploadFileSrc);
                    // console.log(ImageDatas.img);
                        
                    ImageDatas.img.src = status.uploadFileSrc + "?t=" + new Date().getTime()
                    this.setState({ImageDatas})
                    PubSub.publishSync("setFormDatas",{name: this.props.name, values: ImageDatas})
                    this.setState({isUploading: false})
                }
            }
        })
    }

    showDefaultCard = (name) => {
        return () => {
            const {parent} = this.state.ImageDatas
            // console.log("get : " , name, parent);
            PubSub.publishSync('showDefaultCard',{
                name: name,
                parent: parent
            })
        }
    }

    render() {
        const {isUploadFile,isUploading} = this.state
        const {position,size,src} = this.props.img
        // console.log("src",src);
        const {name} = this.props


        const changeSizeValue = (value) => {
            const {ImageDatas} = this.state
            ImageDatas.img.size = value
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: ImageDatas})
        };

        const changePositionValue = (type) => {
            const {ImageDatas} = this.state
            return (value) => {
                ImageDatas.img.position[type] = value
                PubSub.publishSync("setFormDatas",{name: this.props.name, values: ImageDatas})
            }
        }

        const beforeUpload = (file) => {
            // console.log("type" , file.type);
            let isPic = false;
            if(file.type === "image/png" || file.type === "image/jpeg"){
                isPic = true
            }

            if (!isPic) {
                message.error(`請上傳 png 或是 jpg 的圖片檔`);
            }

            const isBigFile = file.size / 1024 / 1024 < 3;
            if (!isBigFile) {
                message.error('請上傳小於 3MB 的圖片檔');
            }

            return (isPic && isBigFile) || Upload.LIST_IGNORE;
        }

        const uploadFile = (file) => {
            // console.log("uploadFIle");
            const {username} = this.props
            // console.log("file:",file);

            if(file.file.status === "removed"){
                this.setState({isUploadFile: false})
            }
            if(file.file.percent !== 100){
                this.setState({isUploading: true})
                axios({
                    method: 'post',
                    url: '/uploadFile',
                    params: {
                        username: username,
                        fileName: name,
                        fileContent: file.file
                    }
                }).then(
                    response => {
                        PubSub.publishSync('closeDefaultCard')

                        const {selectedCardName,location} = response.data
                        this.setState({location})
                        // console.log("res", response.data.location);
                        
                        this.setState({isUploadFile: true})
                        PubSub.publishSync("usingDefaultDatas",{
                            selectedCardName,
                            uploadFileSrc: location
                        })

                        message.success(`文件上传成功`)
                    },
                    error => {
                        console.log(error)
                    }
                )
            }
        }

        return (
            <div>
                <div className="card-header">
                    {
                        position ? 
                            <div className="row">
                            {
                                position.x !== undefined ? 
                                    <div className="col">
                                        <label className="form-label">圖片水平位置</label>
                                        <InputNumber min={-1000} max={1000} defaultValue={position.x} onChange={changePositionValue("x")} />
                                    </div>
                                :   <div></div>
                            }
                            
                            {
                                position.y !== undefined ?
                                <div className="col">
                                    <label className="form-label">圖片垂直位置</label>
                                    <InputNumber min={-1000} max={1000} defaultValue={position.y} onChange={changePositionValue("y")} />
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
                        {
                            isUploading ? 
                                <SyncOutlined spin style={{ fontSize: '32px', color: '#52c41a'}} />
                            :
                                <Image src={src} style={{width: "50%", height: "50%"}} alt="empty_image" />
                        }
                        
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
                                name={name}
                                method='post'
                                beforeUpload={beforeUpload}
                                onChange={uploadFile}
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                            </Upload>
                        </Space>
                    </div>



                    <div className="card-body">
                        {
                            isUploadFile ? 
                                <Button onClick={this.showDefaultCard(name)} className="btn btn-dark" disabled>使用其他提供的圖片</Button>
                            :
                                <Button onClick={this.showDefaultCard(name)} className="btn btn-dark" >使用其他提供的圖片</Button>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}
