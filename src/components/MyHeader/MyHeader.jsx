import React, { Component  }  from 'react'
import PubSub from 'pubsub-js'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';

import { Layout, Menu , Image, Avatar,Row, Col,Popover, Button, List,Typography} from 'antd';


//Components
// import MyNavLink from '../MyNavLink/MyNavLink'

//Pages
import Login from '../../pages/Login/Login'
import Home from '../../pages/Home/Home'
import Register from '../../pages/Register/Register'
import SelectGame from '../../pages/SelectGame/SelectGame'
import GameMaker from '../../pages/GameMaker/GameMaker'
import PlayGame from '../../pages/PlayGame/PlayGame'

import './MyHeader.css'

const { Header } = Layout;

class MyHeader extends Component {

    state = {
        username: '',
    }
    
    componentDidMount(){
        this.setState({nowRoute: 'home'})
        PubSub.subscribe("playGameMode", (msg,isPlayGameMode)=>{
            this.setState({
                isPlayGameMode: isPlayGameMode
            })
        })

        PubSub.subscribe("setUsername", (msg,username)=>{
            this.setState({username})
            localStorage.setItem('username', username)
        })
    }

    logOut = () => {
        this.setState({username: ''})
        localStorage.setItem('username', '')
    }

    menuClick = (id) => {
        return () => {
            const {pathname} = this.props.location
            console.log(id);
            switch(id){
                case '/logout':
                    this.logOut()
                    break
                default:
                    if(id === 'member'){break}
                    if(pathname !== id){
                        console.log("in",id);
                        this.props.history.push(id)
                    }
                    break
            }
        }
        
    }

    render() {
        const {isPlayGameMode} = this.state
        const username = localStorage.getItem('username') || ''

        const backToHome = () => {
            const {pathname} = this.props.location
            if(pathname !== '/home'){
                this.props.history.push("home")  
            }
        }

        const loginAction = () => {
            this.props.history.push("login")  
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
                        width: '100%'
                }}>
                    <Row>
                        
                        <Col span={8}>
                            <Image className="logo" onClick={backToHome} preview={false} src= "/logo1.png" />
                        </Col>
                        {
                            (!isPlayGameMode) ? 
                                <Col offset={15} span={1}>
                                    {
                                        username === "" 
                                            ? 
                                                <Avatar 
                                                    onClick={loginAction}
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
                        <Route component={Login} path="/login"></Route>
                        <Route component={Home} path="/home"></Route>
                        <Route component={Register} path="/register"></Route>
                        <Route component={SelectGame} path="/selectGame"></Route>
                        <Route component={GameMaker} path="/gameMaker"></Route>
                        <Route component={PlayGame} path="/playGame"></Route>
                        <Redirect to="/home"></Redirect>
                    </Switch>
                </div>
            </Layout>
        )
    }
}

export default withRouter(MyHeader)