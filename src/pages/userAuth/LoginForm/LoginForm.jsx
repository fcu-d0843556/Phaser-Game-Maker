import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {withRouter} from 'react-router-dom'

import { Form, Input,message, Button, Card, Divider} from 'antd'
import { UserOutlined,LockTwoTone } from '@ant-design/icons';

import axios from 'axios'

import './LoginForm.less'

class LoginForm extends Component {
  render() {


    const onFinish = (values) => {
        const {username,password} = values

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
              message.success(`歡迎您！${username}`)

              this.props.history.replace(`/home`,{
                username
              })
            } else {
              alert(response.data.message)
            }
          },
          error => {console.log(error);}
        )
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        
        <Card
            title="登 入 會 員"
            headStyle={{borderBottom: "1px solid #545454", background: "linear-gradient(0deg, #F69653 0%, #FFAC70 100%)"}}
            style={{
                width: "auto",
                height: "auto",
                border: "1px solid black"
            }}
        >
            <Form
                style={{backgroundColor: "white"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >

                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '請輸入使用者名稱！',
                      whitespace: true
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="使用者名稱" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '請輸入密碼！',
                      whitespace: true
                    },
                  ]}
                >
                  <Input.Password prefix={<LockTwoTone className="site-form-item-icon" />} placeholder="密碼"/>
                </Form.Item>
    

                <Divider></Divider>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button" block>
                    登入
                  </Button>
                </Form.Item>

            </Form>
        </Card>
    )
  }
}

export default withRouter(LoginForm)
