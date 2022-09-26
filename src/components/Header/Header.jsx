import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import { Button } from 'antd'

//Components
import MyNavLink from '../MyNavLink/MyNavLink'

//Pages
import Login from '../../pages/Login/Login'
import Home from '../../pages/Home/Home'
import Register from '../../pages/Register/Register'
import SelectGame from '../../pages/SelectGame/SelectGame'
import GameMaker from '../../pages/GameMaker/GameMaker'
import PlayGame from '../../pages/PlayGame/PlayGame'

class Header extends Component {

    state = {
        username: ''
    }
    
    componentDidMount(){
        // localStorage.setItem('username', '')
        
        PubSub.subscribe("setUsername", (msg,username)=>{
            this.setState({username})
            localStorage.setItem('username', username)
        })

    }

    logOut = () => {
        this.setState({username: ''})
        localStorage.setItem('username', '')
    }

    render() {
        const username = localStorage.getItem('username') || ''
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky">

                    <div className="container-fluid">
                        <MyNavLink className="navbar-brand" to="/home">Home</MyNavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarText">
                            {
                                username ?  
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
                                        <li className="nav-item">
                                            <MyNavLink to="/selectGame">SelectGame</MyNavLink>
                                        </li>
                                        <li className="nav-item">
                                            <MyNavLink to="/user">您好, {username}</MyNavLink>
                                        </li>
                                        <li className="nav-item">
                                            <MyNavLink onClick={this.logOut} to="/home">登出</MyNavLink>
                                        </li>  
                                    </ul> 
                                :
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
                                        <li className="nav-item">
                                            <MyNavLink to="/Login">Login</MyNavLink>
                                        </li>
                                    </ul> 
                            }
                        </div>
                        
                    </div>
                </nav>

                <div>
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
            </div>
        )
    }
}

export default withRouter(Header)