import React, { Component } from 'react'
import PubSub from 'pubsub-js'

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
            // console.log("selectedCardName",selectedCardName);
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
        const {isDefaultCardOpen,defaultItems,selectedItemId,modifyTitle} = this.state
        // console.log(modifyTitle);

        return (
            <div className="overflow card col-6 detail-card default-card-screen" style={{backgroundColor: "lightpink", visibility: isDefaultCardOpen ? 'visible' : 'hidden'}}>
                {
                    <div>      
                        <div className="card-header">                                              
                            <button type="button" onClick={this.closeCard} style={{float: "right"}} className="btn-close" aria-label="Close"></button>
                            <h4 style={{textAlign:"center"}}>{modifyTitle} - 預設圖片</h4>
                        </div>  

                        <div className="default-items">
                            <div className="row row-cols-1 row-cols-md-2 g-4 " >
                                {
                                    defaultItems.map((item)=>{
                                        return (
                                            <div className="col" key={item.defaultData.description}>
                                                <div className={ selectedItemId === item.defaultData.description ? "selected-default-card card" : "card"} onClick={this.selectCard(item.defaultData.description)}>
                                                    <img src={item.img.src} className=" item-img-size" alt="..."/>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.defaultData.description}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                } 
                            </div>
                        </div>
                    </div>  
                }
            </div>
        )
    }
}
