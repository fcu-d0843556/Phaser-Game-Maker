import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import {Typography} from 'antd'

const { Paragraph } = Typography;

class RenderGameDone extends Component {


    componentDidMount(){
        const {autoClick} = this
        autoClick.click()
    }

    goToPlayGame = () => {
        const {continueModifyButton} = this
        const {gameUrl} = this.props    
        continueModifyButton.click()
        this.props.history.replace(gameUrl)
    }

    render() {

        const {gameUrl} = this.props

        return (
            <div>
                <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg ">
                        <div className="modal-content" style={{"backgroundColor": "rgb(235, 152, 0)"}}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="staticBackdropLabel">完 成！</h2>
                            </div>
                        
                            <div className="modal-body"  style={{backgroundColor: "orange"}}>
                                <div className="card-body">
                                    <h4 className="card-text">您已經完成遊戲的製作了</h4>
                                    <h4 className="card-text">趕快分享給對方遊玩吧！！</h4>
                                    <div className="mb-3">
                                        <h4 htmlFor="disabledTextInput" className="form-label" >這個是生成出來的鏈接：</h4>
                                        <Paragraph className="form-control" copyable>{"http://140.134.26.66:5051/" + gameUrl}</Paragraph>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button ref={c => this.continueModifyButton = c} type="button" className="btn btn-secondary" data-bs-dismiss="modal">繼續編輯</button>
                                <button onClick={this.goToPlayGame} type="button" className="btn btn-primary">前往遊玩網頁</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button ref={c => this.autoClick = c} style={{display: "none"}} type="button" id="autoClick" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"/>
            </div>
        )
    }
}

export default withRouter(RenderGameDone)