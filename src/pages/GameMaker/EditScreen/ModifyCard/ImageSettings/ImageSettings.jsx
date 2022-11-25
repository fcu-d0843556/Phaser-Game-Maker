import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import axios from 'axios';
import cloneDeep from 'lodash.clonedeep';

import {  InputNumber, Image, Button, Space, Upload, message,Input,Row,Card,Col,Divider,Typography } from 'antd';
import { UploadOutlined, SyncOutlined } from '@ant-design/icons';


import './ImageSettings.less'

const { Title} = Typography;

export default class ImageSettings extends Component {

    state = {
        ImageDatas: {},
        saveImageSrc: "",
        isUploadFile: false,
        isUploading: false
    }

    componentDidMount(){

        this.setState({
            ImageDatas: {...this.props},
            saveImageSrc: this.props.img.src
        })

        PubSub.subscribe("usingDefaultDatas",(msg,status)=>{
            const {ImageDatas,saveImageSrc} = this.state
            if(ImageDatas.name === status.selectedName){
                ImageDatas.img.src =  status.selectedItem !== undefined  ? status.selectedItem.img.src : saveImageSrc
                this.setState({ImageDatas})
                PubSub.publishSync("setFormDatas",{name: this.props.name, values: ImageDatas})
            }
        })

        PubSub.subscribe('backToDefaultDatas', (msg,gameModifyDatas)=> {
            const {ImageDatas} = this.state
            if(gameModifyDatas[ImageDatas.parent] !== undefined){
                for(let i=0;i<gameModifyDatas[ImageDatas.parent].items.length;i++){
                    if(gameModifyDatas[ImageDatas.parent].items[i].name === ImageDatas.name){
                        this.setState({
                            ImageDatas: cloneDeep(gameModifyDatas[ImageDatas.parent].items[i])
                        })
                        break
                    }
                }
            }
        })
    }

    

    loadDefaultDatas = (parent) => {
        const {gameId} = this.props

        axios({
            method: "get",
            url: "/api1/getDefaultImgDatas",
            params: {
                gameId: gameId,
                name: parent
            }
        }).then(
            response => {
                const {ImageDatas} = this.state
                PubSub.publish("saveDefaultCardDatas", {
                    parent: ImageDatas.parent,
                    name: ImageDatas.name,
                    items: response.data.items,
                    modifyTitle: ImageDatas.modifyTitle
                })
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
            return () => {
                PubSub.publishSync('showDefaultCardDrawer',name)
                const {parent} = this.state.ImageDatas
                this.loadDefaultDatas(parent)
            }
        }

        const usingUploadFile = (selectedName,uploadFileImgSrc) => {
            const {ImageDatas,saveImageSrc} = this.state

            ImageDatas.img.src =  uploadFileImgSrc !== ""  ? uploadFileImgSrc + "?t=" + new Date().getTime() : saveImageSrc
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: ImageDatas})
            this.setState({
                ImageDatas,
                isUploading: false
            })
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

        const setPositionValueToCenter = () => {
            // console.log("dd");
            const {ImageDatas} = this.state
            ImageDatas.img.position.x = 180
            ImageDatas.img.position.y = 310
            this.setState({ImageDatas})
            
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: ImageDatas})
            message.success('置中數值設置成功');
        }

        const beforeUpload = (file) => {
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
                        const {selectedName,uploadFileImgSrc} = response.data
                        this.setState({isUploadFile: true})
                        usingUploadFile(selectedName,uploadFileImgSrc);
                        message.success(`文件上傳成功！`)
                    },
                    error => {
                        console.log(error)
                    }
                )
            }
        }

        return (
            <div className='image-settings'>
                <Col span={24}>
                    <Card 
                        title={<Title className='modify-card-card-tile' level={4}>使 用 圖 片</Title>}
                        bordered={false}
                    >
                        {
                            isUploading ? 
                                <SyncOutlined spin style={{ fontSize: '32px', color: '#538CF6'}} />
                            :
                                <Image src={src} style={{width: "75%", height: "75%"}} alt="empty_image" />

                        }
                        
                        <Space
                            direction="vertical"
                            style={{width: '100%'}}
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
                                <Button className='drawer-list-button' icon={<UploadOutlined style={{fontSize: 16, verticalAlign: "initial"}}/>}>上傳檔案（上傳一件）</Button>
                            </Upload>

                            
                            {
                                isUploadFile ? 
                                    <Button onClick={showDefaultCardDrawer(name)} className='drawer-list-button' disabled>使用其他提供的圖片</Button>
                                :
                                    <Button onClick={showDefaultCardDrawer(name)} className='drawer-list-button' >使用其他提供的圖片</Button>
                            }
                        </Space>
                    </Card>
                </Col>

                {
                    position ? 
                        <Col span={24}>
                            <Card 
                                title={<Title className='modify-card-card-tile' level={4}>位 置</Title>}
                                bordered={false}
                            >
                                {
                                    position.x !== undefined ? 
                                    
                                        <Row>
                                            <Col span={12}>
                                                <Input value="圖片水平位置" disabled/>
                                            </Col>
                                            <Col span={12}>
                                                <InputNumber min={-1000} max={1000} value={position.x} onChange={changePositionValue("x")} />
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
                                                    <InputNumber min={-1000} max={1000} value={position.y} onChange={changePositionValue("y")} />
                                                </Col>
                                            </Row>
                                    :   <div></div> 
                                }
                                <Button className='drawer-list-button' onClick={setPositionValueToCenter}>設置圖片置中</Button>
                            </Card>
                            <Divider className='image-setting-divider' />
                        </Col>

                        
                    :
                    <div></div>
                }
                
            
                <Col span={24}>
                    <Card 
                        title={<Title className='modify-card-card-tile' level={4}>大 小</Title>}
                        bordered={false}
                    >
                        <InputNumber 
                            min={1} max={1000} 
                            value={size} 
                            onChange={changeSizeValue} 
                            addonAfter="%"
                        />
                    </Card>
                </Col>

                <Divider className='image-setting-divider'  />

                
            </div>
        )
    }
}
