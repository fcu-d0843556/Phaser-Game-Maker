import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {Button, Form, Input} from 'antd'
import axios from 'axios'

//Components
import MyNavLink from '../../components/MyNavLink/MyNavLink'

//Pages
import LineLogin from './LineLogin/LineLogin'


//css
import './Login.css'

export default class Login extends Component {
  render() {

    const onFinish = (values) => {
      const {username,password} = values
      // console.log(values);
      axios({
        method: "post",
        url: "/api1/login",
        params: {
          username,
          password
        }
      }).then(
        response => {
          if(response.data.isSuccessed){
            PubSub.publishSync("setUsername",username)
            this.props.history.replace(`/home`,{
              username
            })
          } 
          else alert(response.data.message)
        },
        error => {console.log(error);}
      )
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div className="loginBox">
          <div className="loginTitle">登入</div>
          <br/><br/>

        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            className="textbar"
            label="Username" name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="textbar"
            label="Password" name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              登入
            </Button>
          </Form.Item>

          <Form.Item>
            <MyNavLink to="/register">
              <Button type="primary" htmlType="submit">
                註冊
              </Button>
            </MyNavLink>
            <br/><br/><br/>
          </Form.Item>
        </Form>

        {/* <LineLogin></LineLogin> */}
      </div>
    )
  }
}
