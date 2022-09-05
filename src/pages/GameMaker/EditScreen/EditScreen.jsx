import React, { Component } from 'react'

//Pages
import DefaultFileBox from './DefaultFileBox/DefaultFileBox'
import ModifyCard from './ModifyCard/ModifyCard'

import './EditScreen.css'

export default class EditScreen extends Component {
  render() {
    const {gameModifyDatas} = this.props
    console.log("gg",gameModifyDatas);

    return (
        <div className="row justify-content-end right-select-bar">
            <div className="col-4"></div>

            <div className="col-8">
                <div className="row">

                    <DefaultFileBox></DefaultFileBox>

                    <div className="col-5" id="allCards">
                        <div className="bd-link">
                            <form action="/doUpload" id="dataForm" method="post">
                                
                                    <div id="allCards">
                                        {
                                            gameModifyDatas.map((dataObj)=>{
                                                return <ModifyCard key={dataObj.name} {...dataObj}></ModifyCard>
                                            }) 
                                        }
                                         
                                    </div>
                                

                                <div className="card-footer text-muted">
                                    <button type="submit" className="btn btn-warning">提交資料</button>
                                    <button type="button" className="btn btn-danger">回到默認資料</button>
                                    <button type="button" className="btn btn-primary">生成遊戲</button>
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
