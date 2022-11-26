import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {Typography, Result, Button,Modal} from 'antd'
import { SmileTwoTone } from '@ant-design/icons';
import { LineShareButton } from "react-share";

import './RenderGameDone.less'

const { Paragraph, Title} = Typography;

class RenderGameDone extends Component {

    state = {
        isModalOpen: false
    }

    componentDidMount(){
        const {autoClick} = this
        autoClick.click()
    }

    render() {
        const {isModalOpen} = this.state
        const {gameUrl} = this.props

        const showModal = () => {
            this.setState({isModalOpen: true})
        };

        const goToPlayGame = () => {
            const {gameUrl} = this.props    
            this.props.history.replace(gameUrl)
        }

        const handleCancel = () => {
            this.setState({isModalOpen: false})
        };

        return (
            <div>
                {/* 自動點擊按鈕不顯示 */}
                <Button ref={c => this.autoClick = c} onClick={showModal} style={{display: "none"}}/>

                {/* 遊戲完成視窗 */}
                <Modal bodyStyle={{background: "#F7E9DF"}}  
                       width={700} 
                       style={{top: "10%"}} 
                       title= {<Title level={3} style={{margin: 0}} className="render-game-done-title">製 作 完 成！</Title>}
                       open={isModalOpen} 
                       onCancel={handleCancel}
                       footer={[
                        <Button key="continue" className='render-game-done-continue-modify-button' onClick={handleCancel}> 繼續編輯 </Button>,
                        <Button key="playGame" className='render-game-done-go-to-playgame-button' onClick={goToPlayGame}> 前往遊玩網頁</Button>
                      ]}
                >

                    {/* 內容顯示區 */}
                    <Result
                        icon={<SmileTwoTone twoToneColor="#538CF6" />}
                        status="success"
                        title= {<Title level={2} >您已經完成遊戲的製作</Title>}
                        subTitle={<Title level={3} >趕快分享給對方遊玩吧！</Title>}
                    />
                    
                    {/* 文字鏈接區 */}
                    <Typography>
                        <Title level={3} >以下是生成出來的鏈接 :</Title>
                        <pre>
                            <Paragraph copyable>
                                {"http://140.134.26.66:5051/" + gameUrl}
                            </Paragraph>

                            <LineShareButton className='line-share-button' size={12} title='分享！' url={"http://140.134.26.66:5051/" + gameUrl} />
                        </pre>
                    </Typography>

                </Modal>
            </div>
        )
    }
}

export default withRouter(RenderGameDone)