import React, { Component } from 'react'
import {Button} from 'antd'

//Components
import MyNavLink from '../../components/MyNavLink/MyNavLink'

//Pages
import LineLogin from './LineLogin/LineLogin'


//css
import './Login.css'

export default class Login extends Component {
  render() {
    return (
        <div>
            <div className="loginBox">
                <div className="loginTitle">登入</div>
                
                <form action="/doLogin" method="post">
                    <input type="text" name="username" className="textbar" placeholder="輸入帳號"/>
                    <br/>
                    <input type="password" name="password" className="textbar" placeholder="輸入密碼"/>
                    <br/><br/>
                    <input type="submit" className="textbar" value="登入"/>
                    <br/><br/>
                    <MyNavLink to="/register">
                      <Button type="primary">註冊</Button>
                    </MyNavLink>
                    <br/><br/>
                </form>

                <LineLogin></LineLogin>
            </div>
        </div>
    )
  }
}
