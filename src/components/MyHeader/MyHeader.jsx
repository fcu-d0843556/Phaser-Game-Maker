import React, { Component  }  from 'react'
import PubSub from 'pubsub-js'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';

import { Layout , Image, Avatar,Row, Col,Popover, Button, List} from 'antd';


//Components
// import MyNavLink from '../MyNavLink/MyNavLink'

//Pages
import userAuth from '../../pages/userAuth/userAuth'
import Home from '../../pages/Home/Home'
import SelectGame from '../../pages/SelectGame/SelectGame'
import GameMaker from '../../pages/GameMaker/GameMaker'
import PlayGame from '../../pages/PlayGame/PlayGame'

import './MyHeader.css'

const { Header } = Layout;

class MyHeader extends Component {

    state = {
        isPlayGameMode: false
    }
    
    componentDidMount(){
        this.setState({nowRoute: 'home'})
        PubSub.subscribe("playGameMode", (msg,isPlayGameMode)=>{
            this.setState({
                isPlayGameMode: isPlayGameMode
            })
        })

        PubSub.subscribe("setUsername", (msg,username)=>{
            localStorage.setItem('username', username)
        })

    }

    logOut = () => {
        localStorage.setItem('username', '')
        this.props.history.replace("/home")
    }

    menuClick = (id) => {
        return () => {
            const {pathname} = this.props.location
            switch(id){
                case '/logout':
                    this.logOut()
                    break
                default:
                    if(id === 'member'){break}
                    if(pathname !== id){
                        this.props.history.push(id)
                    }
                    break
            }
        }
        
    }

    render() {
        const {isPlayGameMode} = this.state
        const username = localStorage.getItem('username')
        // console.log(username);
        const backToHome = () => {
            const {pathname} = this.props.location
            if(pathname !== '/home'){
                this.props.history.push("/home")  
            }
        }

        const userAuthAction = () => {
            this.props.history.push("/userAuth")  
        }

        const userData = [
            { 
                title: '個人檔案', 
                key: '/user'
            },
            { 
                title: '登出',  
                key: '/logout'
            }
        ];
          
        const userItems = (
            <List
                dataSource={userData}
                renderItem={(item) => (
                    <List.Item
                        style={{padding: "8px 0px"}}
                    >
                        <Button onClick={this.menuClick(item.key)} type="text" danger block>
                            {item.title}
                        </Button>
                        
                    </List.Item>
                )}
            />
        )

        return (
            <Layout style={{height: "100%", width: "100%"}}>
                <Header 
                    className='my-header'
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        width: '100%',
                        background: "#07011D"
                }}>
                    <Row>
                        
                        <Col span={8}>
                            <Image className="logo" onClick={backToHome} preview={false} src= "/logo.png" />
                        </Col>
                        {
                            (!isPlayGameMode) ? 
                                <Col offset={15} span={1}>
                                    {
                                        username === '' || username === 'null' || username === 'undefined' || username === null || username === undefined
                                            ? 
                                                <Avatar 
                                                    onClick={userAuthAction}
                                                    size={40} 
                                                    style={{
                                                        color: 'gray',
                                                        cursor: "pointer"
                                                    }}
                                                    icon={
                                                        <UserOutlined
                                                            style={{    
                                                                verticalAlign: "text-bottom",
                                                                fontSize: "24px"
                                                            }}
                                                        />
                                                    }
                                                />
                                        :
                                            <Popover placement="bottomRight" content={userItems} title={`您好，${username}`} trigger="click">
                                                <Avatar 
                                                    size={40} 
                                                    style={{
                                                        color: '#f56a00',
                                                        backgroundColor: '#fde3cf',
                                                        cursor: "pointer"
                                                    }}
                                                    icon={
                                                        <UserOutlined
                                                            style={{    
                                                                verticalAlign: "text-bottom",
                                                                fontSize: "24px"
                                                            }}
                                                        />
                                                    }
                                                />                
                                            </Popover>
                                    }
                                </Col>
                            :   <Col offset={15} span={1}/>
                        }
                    </Row>
                </Header>


                <div className='render-body-margin'>
                    <Switch>
                        <Route exact={false} component={userAuth} path="/userAuth"></Route>
                        <Route exact={false} component={Home} path="/home"></Route>
                        <Route exact={false} component={SelectGame} path="/selectGame"></Route>
                        <Route exact={false} component={GameMaker} path="/gameMaker"></Route>
                        <Route exact={false} component={PlayGame} path="/playGame"></Route>
                        <Redirect to="/home"></Redirect>
                    </Switch>
                </div>
            </Layout>
        )
    }
}

export default withRouter(MyHeader)