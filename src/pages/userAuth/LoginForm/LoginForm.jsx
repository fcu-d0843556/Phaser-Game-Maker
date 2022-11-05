import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {withRouter} from 'react-router-dom'

import { Form, Input} from 'antd'
import { Button, Card, Divider } from 'antd';
import { UserOutlined,LockTwoTone } from '@ant-design/icons';

import axios from 'axios'


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
            headStyle={{borderBottom: "1px solid #545454"}}
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
                    },
                  ]}
                >
                  <Input
                    prefix={<LockTwoTone className="site-form-item-icon" />}
                    type="password"
                    placeholder="密碼"
                  />
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