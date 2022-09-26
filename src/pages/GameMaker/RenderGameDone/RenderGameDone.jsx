import React, { Component } from 'react'
import {Button} from 'antd'
import { Divider, Radio, Typography } from 'antd';
const { Paragraph } = Typography;

export default class RenderGameDone extends Component {

    componentDidMount(){
        const {autoClick} = this
        autoClick.click()
        // console.log("auto",);
    }

    render() {

        const {gameUrl} = this.props

        return (
            <div>
                <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content" style={{"backgroundColor": "rgb(235, 152, 0)"}}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">完 成！</h5>
                            </div>

                            <div className="card-body">
                                <p className="card-text">您已經完成遊戲的製作了</p>
                                <p className="card-text">趕快分享給對方遊玩吧！！</p>
                                <div className="mb-3">
                                    <label htmlFor="disabledTextInput" className="form-label" >這個是生成出來的鏈接：</label>
                                    <Paragraph className="form-control" copyable>{"http://localhost:3000/" + gameUrl}</Paragraph>
                                </div>
                            </div>
                            {/* <div className="modal-body">
                                ...
                                
                            </div> */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">繼續編輯</button>
                                <button type="button" className="btn btn-primary">前往遊玩網頁</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button ref={c => this.autoClick = c} style={{display: "none"}} type="button" id="autoClick" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"/>
            </div>
        )
    }
}
