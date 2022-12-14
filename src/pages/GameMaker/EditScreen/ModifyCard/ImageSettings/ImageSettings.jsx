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
        isUploading: false,

        pubsubList: []
    }

    componentDidMount(){
        let {pubsubList} = this.state

        this.setState({
            ImageDatas: {...this.props},
            saveImageSrc: this.props.img.src
        })

        pubsubList.push(
            PubSub.subscribe("usingDefaultDatas",(msg,status)=>{
                const {ImageDatas,saveImageSrc} = this.state
                ImageDatas.img.src =  status.selectedItem !== undefined  ? status.selectedItem.src : saveImageSrc
                this.setState({ImageDatas})
                PubSub.publishSync("setFormDatas",{name: this.props.name, values: ImageDatas})
            })
        )

        pubsubList.push(
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
        )
    }

    componentWillUnmount(){
        const {pubsubList} = this.state
        for(let i=0;i< pubsubList.length;i++){
            PubSub.unsubscribe(pubsubList[i])
        }
    }

    loadDefaultDatas = () => {
        axios({
            method: "get",
            url: "/api1/getDefaultImgDatas"
        }).then(
            response => {
                const {ImageDatas} = this.state
                PubSub.publish("saveDefaultCardDatas", {
                    parent: ImageDatas.parent,
                    name: ImageDatas.name,
                    items: response.data,
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
                this.loadDefaultDatas()
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
            const {ImageDatas} = this.state
            ImageDatas.img.position.x = 180
            ImageDatas.img.position.y = 310
            this.setState({ImageDatas})
            
            PubSub.publishSync("setFormDatas",{name: this.props.name, values: ImageDatas})
            message.success('????????????????????????');
        }

        const beforeUpload = (file) => {
            let isPic = false;
            if(file.type === "image/png" || file.type === "image/jpeg"){
                isPic = true
            }

            if (!isPic) {
                message.error(`????????? png ?????? jpg ????????????`);
            }

            const isBigFile = file.size / 1024 / 1024 < 3;
            if (!isBigFile) {
                message.error('??????????????? 3MB ????????????');
            }

            return (isPic && isBigFile) || Upload.LIST_IGNORE;
        }

        const uploadFile = (file) => {
            const {username,gameId} = this.props
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
                        gameId: gameId,
                        fileName: name,
                        fileContent: file.file
                    }
                }).then(
                    response => {
                        PubSub.publishSync('closeDefaultCard')
                        const {selectedName,uploadFileImgSrc} = response.data
                        this.setState({isUploadFile: true})
                        usingUploadFile(selectedName,uploadFileImgSrc);
                        message.success(`?????????????????????`)
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
                        title={<Title className='modify-card-card-tile' level={4}>??? ??? ??? ???</Title>}
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
                                <Button className='drawer-list-button' icon={<UploadOutlined style={{fontSize: 16, verticalAlign: "initial"}}/>}>??????????????????????????????</Button>
                            </Upload>

                            
                            {
                                isUploadFile ? 
                                    <Button onClick={showDefaultCardDrawer(name)} className='drawer-list-button' disabled>???????????????????????????</Button>
                                :
                                    <Button onClick={showDefaultCardDrawer(name)} className='drawer-list-button' >???????????????????????????</Button>
                            }
                        </Space>
                    </Card>
                </Col>

                {
                    position ? 
                        <Col span={24}>
                            <Card 
                                title={<Title className='modify-card-card-tile' level={4}>??? ???</Title>}
                                bordered={false}
                            >
                                {
                                    position.x !== undefined ? 
                                    
                                        <Row>
                                            <Col span={12}>
                                                <Input value="??????????????????" disabled/>
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
                                                    <Input value="??????????????????" disabled/>
                                                </Col>
                                                <Col span={12}>
                                                    <InputNumber min={-1000} max={1000} value={position.y} onChange={changePositionValue("y")} />
                                                </Col>
                                            </Row>
                                    :   <div></div> 
                                }
                                <Button className='drawer-list-button' onClick={setPositionValueToCenter}>??????????????????</Button>
                            </Card>
                            <Divider className='image-setting-divider' />
                        </Col>

                        
                    :
                    <div></div>
                }
                
            
                <Col span={24}>
                    <Card 
                        title={<Title className='modify-card-card-tile' level={4}>??? ???</Title>}
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
