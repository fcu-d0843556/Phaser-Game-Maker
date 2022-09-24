import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import './DefaultFileBox.css';
import axios from 'axios';

export default class DefaultFileBox extends Component {

    state = {
        isDefaultCardOpen: true,
        defaultItems: [],
        selectedItem: {},
        selectedItemId: ""
    }

    componentDidMount(){
        
        PubSub.subscribe('showDefaultCard', (msg,parent)=>{
            const {gameId} = this.props
            const {isDefaultCardOpen} = this.state
            axios({
                method: "get",
                url: "/api1/getDefaultImgDatas",
                params: {
                    gameId: gameId,
                    name: parent
                }
            }).then(
                response => {
                    this.setState({
                        defaultItems: response.data.items
                    })
                    console.log(response.data.items);
                },
                error => {
                    console.log(error);
                }
            )
            this.setState({
                isDefaultCardOpen: !isDefaultCardOpen
            })
        })
        
    }

    selectCard = (id) => {
        const {defaultItems,selectedItem} = this.state
        return () => {
            const item = defaultItems.find((item)=>{ return id === item.defaultData.description})
            if(selectedItem === item){
                console.log("rere");
            }else{
                this.setState({
                    selectedItem: item,
                    selectedItemId: item.defaultData.description
                })
                PubSub.publish("usingDefaultDatas",item)
            }
            
        }
    }

    render() {
        const {isDefaultCardOpen,defaultItems,selectedItemId} = this.state
        // console.log(selectedItem.defaultData.description);

        return (
            <div className="overflow card col-6 detail-card" style={{backgroundColor: "lightpink", visibility: isDefaultCardOpen ? 'visible' : 'hidden'}}>
                                                                                                    
                <button type="button" style={{float: "right"}} className="btn-close" aria-label="Close"></button>
                
                <h2 style={{textAlign:"center"}}>使用預設圖片</h2>

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
