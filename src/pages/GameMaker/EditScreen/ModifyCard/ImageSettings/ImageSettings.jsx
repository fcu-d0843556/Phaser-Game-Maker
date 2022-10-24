import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import { InputNumber, Image } from 'antd';
import { UploadOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message,Input,Row } from 'antd';
import { Card,Col,Divider} from 'antd';

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

        //usingDefaultDatas
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
                    // console.log("dd",ImageDatas.img.src,status.uploadFileSrc);
                    // console.log(ImageDatas.img);
                        
                    ImageDatas.img.src = status.uploadFileSrc + "?t=" + new Date().getTime()
                    this.setState({ImageDatas})
                    PubSub.publishSync("setFormDatas",{name: this.props.name, values: ImageDatas})
                    this.setState({isUploading: false})
                }
            }
        })
    }

    

    loadDefaultDatas = (parent) => {
        const {gameId} = this.props
        // const {selectedCardName} = this.state
        // console.log("selectedCardName",gameId);
        axios({
            method: "get",
            url: "/api1/getDefaultImgDatas",
            params: {
                gameId: gameId,
                name: parent
            }
        }).then(
            response => {
                // console.log("find! : ", response.data.items);
                PubSub.publish("saveDefaultCardDatas",response.data.items )
            },
            error => {
                console.log(error);
            }
        )
    }

    render() {
        const {isUploadFile,isUploading} = this.state
        const {position,size,src} = this.props.img
        const {name} = this.props

        const showDefaultCardDrawer = (name) => {
            return (event) => {
                PubSub.publishSync('showDefaultCardDrawer',name)
                const {parent} = this.state.ImageDatas
                // console.log(ImageDatas);
                this.loadDefaultDatas(parent)
            }
        }

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
                {
                    position ? 
                        <Col span={24}>
                            <Card 
                                title="圖片的位置"
                                headStyle={{fontSize: 24}}
                                bordered={false}
                            >
                                {
                                    position.x !== undefined ? 
                                    
                                        <Row>
                                            <Col span={12}>
                                                <Input value="圖片水平位置" disabled/>
                                            </Col>
                                            <Col span={12}>
                                                <InputNumber min={-1000} max={1000} defaultValue={position.x} onChange={changePositionValue("x")} />
                                            </Col>
                                        </Row>
                                    :   <div></div>
                                }
                                
                                {
                                    position.y !== undefined ?
                                            <Row>
                                                <Col span={12}>
                                                    <Input value="圖片垂直位置" disabled/>
                                                </Col>
                                                <Col span={12}>
                                                    <InputNumber min={-1000} max={1000} defaultValue={position.y} onChange={changePositionValue("y")} />
                                                </Col>
                                            </Row>
                                    :   <div></div> 
                                }
                            </Card>
                            <Divider />
                        </Col>

                        
                    :
                    <div></div>
                }
                
            
                <Col span={24}>
                    <Card 
                        title="圖片的大小"
                        headStyle={{fontSize: 24}}
                        bordered={false}
                    >
                        <InputNumber min={1} max={1000} defaultValue={size} onChange={changeSizeValue} />
                    </Card>
                </Col>

                <Divider />

                <Col span={24}>
                    <Card 
                        title="圖片預覽"
                        headStyle={{fontSize: 24}}
                        bordered={false}
                    >
                        {
                            isUploading ? 
                                <SyncOutlined spin style={{ fontSize: '32px', color: '#52c41a'}} />
                            :
                                <Image src={src} style={{width: "50%", height: "50%"}} alt="empty_image" />
                        }
                        
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

                            
                            {
                                isUploadFile ? 
                                    <Button onClick={showDefaultCardDrawer(name)} disabled>使用其他提供的圖片</Button>
                                :
                                    <Button onClick={showDefaultCardDrawer(name)}>使用其他提供的圖片</Button>
                            }
                        </Space>
                    </Card>
                </Col>
            </div>
        )
    }
}
