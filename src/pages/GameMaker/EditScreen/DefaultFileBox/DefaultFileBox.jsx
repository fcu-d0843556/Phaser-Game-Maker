import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { Card,Col,Divider} from 'antd';
import { List } from 'antd';

import './DefaultFileBox.css';
import axios from 'axios';

export default class DefaultFileBox extends Component {

    state = {
        //決定defaultData是否開啟
        isDefaultCardOpen: false,
        selectedCardName: "",



        height: undefined,
        width: undefined,

        defaultItems: [],
        selectedItem: {},
        selectedItemId: "",
        modifyTitle: "",
    }

    componentDidMount(){

        PubSub.subscribe('showDefaultCard', (msg,ids)=>{
            const {gameId} = this.props
            const {selectedCardName} = this.state
            console.log("selectedCardName",selectedCardName);
            if(ids.name === selectedCardName){
                // console.log("close");
                this.setState({
                    selectedCardName: "",
                    isDefaultCardOpen: false
                })
            }else{
                // console.log("open");
                this.setState({
                    selectedCardName: ids.name,
                    isDefaultCardOpen: true
                })

                axios({
                    method: "get",
                    url: "/api1/getDefaultImgDatas",
                    params: {
                        gameId: gameId,
                        name: ids.parent
                    }
                }).then(
                    response => {
                        // console.log(ids);
                        const title = response.data.items.find((item)=>{
                            // console.log(ids.name,item.name);
                            return ids.name === item.name
                        })
                        const modifyTitle = title.modifyTitle.replaceAll(" ","")
                        this.setState({
                            defaultItems: response.data.items,
                            modifyTitle: modifyTitle,
    
                        })
                    },
                    error => {
                        console.log(error);
                    }
                )
            }
        })

        PubSub.subscribe('closeDefaultCard', (msg)=>{
            this.closeCard()
        })
    }

    selectCard = (id) => {
        return () => {
            
            const {defaultItems,selectedCardName,selectedItemId} = this.state

            const item = defaultItems.find((item)=>{ return id === item.defaultData.description})
            // console.log("item222",selectedItemId,item);
            if(selectedItemId === item.defaultData.description){
                this.setState({
                    selectedItemId: ""
                })
                PubSub.publishSync("usingDefaultDatas",{
                    isSelected: false,
                    selectedItem: item,
                    selectedCardName
                })
            }else{
                this.setState({
                    selectedItemId: item.defaultData.description
                })

                
                PubSub.publishSync("usingDefaultDatas",{
                    isSelected: true,
                    selectedItem: item,
                    selectedCardName
                })
            }
            
        }
    }

    closeCard = () => {
        this.setState({
            selectedCardName: "",
            isDefaultCardOpen: false
        })
    }

    render() {
        const data = [
            {
              title: 'Title 1',
            },
            {
              title: 'Title 2',
            },
            {
              title: 'Title 3',
            },
            {
              title: 'Title 4',
            },
          ];

        const {isDefaultCardOpen,defaultItems,selectedItemId} = this.state
        // const {modifyTitle} = this.props
        // console.log(this.props);

        return (
            // <div className="detail-card default-card-screen" style={{backgroundColor: "lightpink"}}>
            <div style={{backgroundColor: "lightpink"}}>

                <Col span={24}>
                    <Card 
                        title= { "- 預設圖片"}
                        headStyle={{fontSize: 24}}
                    >
                    
                    <List
                        grid={{ gutter: 16, 
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 1,
                            xl: 2,
                            xxl: 3, 
                        }}
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <Card title={item.title}>Card content</Card>
                            
                            {
                                // defaultItems.map((item)=>{
                                //     return (

                                //             <Card title={item.title} key={item.defaultData.description}>
                                //                 <img src={item.img.src} className=" item-img-size" alt="..."/>
                                //                 <h5 className="card-title">{item.defaultData.description}</h5>
                                //             </Card>
                                //     )
                                // })
                            }
                            
                        </List.Item>
                        )}
                    />

                    </Card>
                </Col>

                        
                
            </div>
        )
    }
}
