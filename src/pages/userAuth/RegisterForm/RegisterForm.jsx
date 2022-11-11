import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PubSub from 'pubsub-js'

import { Button, Card, Divider,message, Form, Input } from 'antd';

import { UserOutlined,LockTwoTone } from '@ant-design/icons';

import axios from 'axios'

class RegisterForm extends Component {
  render() {


    const onFinish = (values) => {
      const {username,password} = values
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
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
        

        <Card
            title="註 冊 會 員"
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
                  <Input.Password prefix={<LockTwoTone className="site-form-item-icon" />} placeholder="密碼"/>
                </Form.Item>


                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: '請再輸入一次相同的密碼！',
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
                    <Button type="primary" htmlType="submit" block>
                      註冊
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
  }
}

export default withRouter(RegisterForm)