import React, { Component } from 'react'
import LineLogin from './LineLogin/LineLogin'

//css
import './Login.css'

export default class Login extends Component {
  render() {
    return (
        <div>
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" href="/login">Login</a>
                            </li> 
                        </ul>
                    </div>
                </div>
            </nav> */}

            <div className="loginBox">
                <div className="loginTitle">登入</div>
                
                <form action="/doLogin" method="post">
                    <input type="text" name="username" className="textbar" placeholder="輸入帳號"/>
                    <br></br>
                    <input type="password" name="password" className="textbar" placeholder="輸入密碼"/>
                    <br></br>
                    {/* <!-- <button id="lineLoginBtn" >註冊</button> --> */}
                    <input type="submit" className="textbar" value="登入"/>
                </form>
                <input type="submit" className="textbar" value="註冊"/>

                <LineLogin></LineLogin>
            </div>
        </div>
    )
  }
}
