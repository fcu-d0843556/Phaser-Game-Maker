import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import './DefaultFileBox.css';
import axios from 'axios';

export default class DefaultFileBox extends Component {

    state = {
        //決定defaultData是否開啟
        isDefaultCardOpen: false,
        selectedCardName: "",


        defaultItems: [],
        selectedItem: {},
        selectedItemId: "",
        modifyTitle: "",
    }

    componentDidMount(){
        
        PubSub.subscribe('showDefaultCard', (msg,ids)=>{
            const {gameId} = this.props
            const {selectedCardName} = this.state
            
            axios({
                method: "get",
                url: "/api1/getDefaultImgDatas",
                params: {
                    gameId: gameId,
                    name: ids.parent
                }
            }).then(
                response => {
                    const title = response.data.items[0].modifyTitle.replaceAll(" ","")
                    this.setState({
                        defaultItems: response.data.items,
                        modifyTitle: title
                    })
                    console.log(response.data.items);

                    if(ids.name === selectedCardName){
                        this.setState({
                            selectedCardName: "",
                            isDefaultCardOpen: false
                        })
                    }else{
                        this.setState({
                            selectedCardName: ids.name,
                            isDefaultCardOpen: true
                        })
                    }
                },
                error => {
                    console.log(error);
                }
            )
            
            
        })
        
    }

    selectCard = (id) => {
        return () => {
            
            const {defaultItems,selectedItem} = this.state

            const item = defaultItems.find((item)=>{ return id === item.defaultData.description})
            if(selectedItem === item){
                this.setState({
                    selectedItem: {},
                    selectedItemId: ""
                })
                PubSub.publish("usingDefaultDatas",{
                    isSelected: false,
                    selectedItem: item
                })
                console.log("rere");
            }else{
                PubSub.publish("usingDefaultDatas",{
                    isSelected: true,
                    selectedItem: item
                })

                this.setState({
                    selectedItem: item,
                    selectedItemId: item.defaultData.description
                })
            }
            
        }
    }

    render() {
        const {isDefaultCardOpen,defaultItems,selectedItemId,modifyTitle} = this.state
        // console.log(this.state);

        return (
            <div className="overflow card col-6 detail-card default-card-screen" style={{backgroundColor: "lightpink", visibility: isDefaultCardOpen ? 'visible' : 'hidden'}}>
                                                                                                    
                <button type="button" style={{float: "right"}} className="btn-close" aria-label="Close"></button>
                
                <h4 style={{textAlign:"center"}}>{modifyTitle} - 預設圖片</h4>

                <div>
                    <div className="row row-cols-1 row-cols-md-2 g-4 " >
                        {
                            defaultItems.map((item)=>{
                                return (
                                    <div className="col" key={item.defaultData.description}>
                                        <div className={ selectedItemId === item.defaultData.description ? "selected-default-card card" : "card"} onClick={this.selectCard(item.defaultData.description)}>
                                            <img src={item.img.src} className="card-img-top" alt="..."/>
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
        )
    }
}
