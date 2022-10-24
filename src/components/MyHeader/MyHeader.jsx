import React, { Component  }  from 'react'
import PubSub from 'pubsub-js'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'

import { Layout, Menu } from 'antd';


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
        isPlayGameMode: false,

        visible: false

    }
    
    componentDidMount(){
        // console.log(this.props.location);
        this.setState({nowRoute: 'home'})
        // localStorage.setItem('username', '')
        PubSub.subscribe("playGameMode", (msg,isPlayGameMode)=>{
            // console.log(msg);
            // console.log(isPlayGameMode);
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

    showDrawer = () => {
        this.setState({visible: true});
    };

    onClose = () => {
        this.setState({visible: false});
    };

    getMenuItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    menuClick = (event) => {
        const {pathname} = this.props.location
        const {key} = event
        // console.log(event);
        switch(key){
            case '/logout':
                this.logOut()
                break
            default:
                if(key === 'member'){break}
                if(pathname !== key){
                    console.log("in");
                    this.props.history.push(key)
                }
                break
        }
    }

    render() {
        const {pathname} = this.props.location
        const {isPlayGameMode} = this.state
        const username = localStorage.getItem('username') || ''

        const loginItems = [
            this.getMenuItem('首頁', '/home', null),
            this.getMenuItem('選擇遊戲', '/SelectGame', null),
            this.getMenuItem(`歡迎, ${username}`, 'member', null),
            this.getMenuItem('登出', '/logout', null)
        ];
        
        const logoutItems = [
            this.getMenuItem('首頁', '/home', null),
            this.getMenuItem('登入', '/login', null)
        ];

        const gameItems = [
            this.getMenuItem('首頁', '/home', null),
        ];

        return (
            <Layout style={{height: "100%", width: "100%"}}>
                <Header 
                    className='my-header'
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        width: '100%'
                }}>

                    {
                        (!isPlayGameMode) ? 
                            username ?
                                <Menu onClick={this.menuClick} theme="dark" mode="horizontal" items={loginItems} defaultSelectedKeys={pathname} />
                            :
                                <Menu onClick={this.menuClick} theme="dark" mode="horizontal" items={logoutItems} defaultSelectedKeys={pathname} />
                        :
                            <Menu onClick={this.menuClick} theme="dark" mode="horizontal" items={gameItems} defaultSelectedKeys={pathname} />
                    }
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