import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PubSub from 'pubsub-js'

import { Button, Card, Divider,message, Form, Input } from 'antd';

import { UserOutlined,LockTwoTone } from '@ant-design/icons';

import axios from 'axios'
import './RegisterForm.less'

class RegisterForm extends Component {
  render() {
    const onFinish = (values) => {
      const {username,password} = values
      
      if(checkValue(username,password)){
        axios(
          {
            method: 'post',
            url: '/api1/register',
            params: {
              username,
              password
            },
          }
        ).then(
          response => {
            if(response.data.isSuccessed){
              PubSub.publishSync("setUsername",username)
              message.success(`歡迎您！${username}`)
              this.props.history.replace(`/home`,{ username })
            }else{
              alert(response.data.message)
            }
          },
          error => {console.log(error);}
        )
      }
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const checkValue = (username,password) => {
      if(username === '' || username.toLowerCase() === 'null' || username.toLowerCase() === 'undefined' || username === null || username === undefined){
        message.warning('請換個使用者名稱！')
        return false
      }
      if(password === '' || password.toLowerCase() === 'null' || password.toLowerCase() === 'undefined' || password === null || password === undefined){
        message.warning('請換個密碼！')
        return false
      }
      return true
    };

    return (
        
        <Card
            title="註 冊 會 員"
            headStyle={{borderBottom: "1px solid #545454", background: "linear-gradient(0deg, #538CF6 0%, #70A2FF 100%)"}}
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


                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: '請再輸入一次相同的密碼！',
                        whitespace: true
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('輸入的密碼不一致！'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="確認密碼"  prefix={<LockTwoTone className="site-form-item-icon" />} />
                </Form.Item>



                <Divider></Divider>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className='register-form-button' block>
                      註冊
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
  }
}

export default withRouter(RegisterForm)