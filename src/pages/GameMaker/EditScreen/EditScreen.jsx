import React, { Component } from 'react'
import PubSub from 'pubsub-js'

//Pages
import DefaultFileBox from './DefaultFileBox/DefaultFileBox'
import ModifyCard from './ModifyCard/ModifyCard'
import ModifyTab from './ModifyTab/ModifyTab'

//Components


import './EditScreen.css'

export default class EditScreen extends Component {

    state = {
        mobileModifyMode: "modify"
    }

    handleformSubmit = (event) => {
        event.preventDefault()
        console.log(event);
        PubSub.publish("refreshGame")
    }

    changeModifyMode = () => {
        const {mobileModifyMode} = this.state
        
        this.setState({mobileModifyMode: (mobileModifyMode === "modify" ? "game" : "modify")})
        PubSub.publish("setMobileModifyMode",(mobileModifyMode === "modify" ? "game" : "modify"))
    }

    //發佈遊戲
    renderGame = () => {
        PubSub.publish("publishGame")
    }

    //回到默認狀態
    backToDefaultDatas = () => {
        console.log("back");
        PubSub.publish("getGameData", "default")
    }

    render() {
        // console.log(this.props);
        const {gameModifyDatas,gameId} = this.props
        
        const {width} = this.props
        const {mobileModifyMode} = this.state;
        // console.log("gg",gameModifyDatas);

        return (
            <div className="row justify-content-end " >
                <div className="col-4"></div>

                <div className="col-8 modify-with-default-screen" >
                    <div className="row">

                        <DefaultFileBox gameId={gameId}></DefaultFileBox>

                        <div className="col-6 right-select-bar" id="allCards" >
                            <div className="modify-cards-screen">
                                <form onSubmit={this.handleformSubmit} >
                                    
                                    <div id="allCards" style={{display: (mobileModifyMode === "modify" || width >= 576) ? "block" : "none", zIndex: 1}}>
                                        {
                                            Object.keys(gameModifyDatas).map((key) => {
                                                if(gameModifyDatas[key].items){
                                                    return gameModifyDatas[key].items.map((itemObj,index) => {
                                                        return (
                                                            !index ? 
                                                                <div key={itemObj.name}>
                                                                    {
                                                                        gameModifyDatas[key].items.map((itemObj,index) => {
                                                                            // console.log(itemObj);
                                                                            return (
                                                                                
                                                                                <ModifyTab key={itemObj.name} parent={itemObj.parent} keyword={itemObj.name} modifyTitle={itemObj.modifyTitle} ></ModifyTab>
                                                                            )
                                                                        })
                                                                    }
                                                                    <ModifyCard key={itemObj.name} {...itemObj} showCard={true}></ModifyCard>
                                                                </div>
                                                            :
                                                                <div key={itemObj.name}>
                                                                    <ModifyCard key={itemObj.name} {...itemObj} showCard={false}></ModifyCard>
                                                                </div>
                                                            
                                                        )
                                                    })
                                                }
                                            })
                                        }

                                    </div>

                                    <div className="card-footer text-muted fixed-bottom" style={{backgroundColor: "rgba(0, 0, 0, 0.664)"}}>
                                        <button type='button' onClick={this.renderGame} className="btn btn-primary edit-button">生成遊戲</button>
                                        <button type='submit' onClick={this.changeModifyMode} className="btn btn-warning edit-button preview-button-mobile">{mobileModifyMode === "modify"  ? "預覽變化" : "編輯" }</button>
                                        <button type='submit' className="btn btn-warning edit-button preview-button-PC">預覽變化</button>
                                        <button type="button" onClick={this.backToDefaultDatas} className="btn btn-danger edit-button">回到默認資料</button>
                                        
                                    </div>
                                </form>
                            </div>  
                        </div>
                        
                    </div>
                </div> 
            </div>
        )
    }
}
