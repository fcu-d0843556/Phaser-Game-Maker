import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'


//Components
import MyNavLink from '../MyNavLink/MyNavLink'

//Pages
import Login from '../../pages/Login/Login'
import Home from '../../pages/Home/Home'

export default class Header extends Component {

    state = {
        username: ''
    }

    render() {

        const {username} = this.state
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky">

                    <div className="container-fluid">
                        <MyNavLink className="navbar-brand" to="/">Home</MyNavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                {/* <% if(username){ %> */}
                                    <li className="nav-item">
                                        <MyNavLink to="/chooseGame">chooseGame</MyNavLink>
                                    </li>
                                    <li className="nav-item">
                                        <MyNavLink to="/user">您好, ??</MyNavLink>
                                    </li>
                                    <li className="nav-item">
                                        <MyNavLink to="/logout">登出</MyNavLink>
                                    </li>

                                {/* <% } else { %> */}
                                    <li className="nav-item">
                                        <MyNavLink to="/Login">Login</MyNavLink>
                                    </li>
                                {/* <% } %> */}
                            </ul>
                        </div>
                        
                    </div>
                </nav>

                <div>
                    <Switch>
                        <Route component={Login} path="/login"></Route>
                        <Route component={Home} path="/home"></Route>
                        <Redirect to="/home"></Redirect>
                    </Switch>
                </div>
            </div>
        )
    }
}
