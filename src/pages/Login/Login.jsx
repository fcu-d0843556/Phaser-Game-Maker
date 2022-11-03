import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { Form, Input,Row,Col,Layout} from 'antd'
import { Button, Card, InputNumber,Tooltip, Space, message,Alert,Divider } from 'antd';
import { QuestionCircleTwoTone,UserOutlined,LockOutlined } from '@ant-design/icons';

import axios from 'axios'

//Components
import MyNavLink from '../../components/MyNavLink/MyNavLink'

//Pages
import LineLogin from './LineLogin/LineLogin'


//css
import './Login.css'

const { Content } = Layout;

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
        <Row>
              {/* 讓BMIIntro這個組件可以顯示在左半邊（BMIIntro是顯示4個結果的頁面） */}
              <Col span={12}>
                  <Content
                      style={{
                      padding: '0 50px',
                      height: "100%",
                      backgroundColor:"#3AAFA9"
                      }}
                  >
                    <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}></Row>
                      {/* <BMIIntro></BMIIntro> */}
                  </Content>
              </Col>

              {/* 讓BMIForm這個組件可以顯示在右半邊（BMIForm是使用者輸入BMI資料的頁面） */}
              <Col span={12}>
                  <Content
                      style={{
                      padding: '0 50px',
                      height: "100%",
                      }}
                  >
                      <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                          <Col span={16}>
                              <Card
                                  title="BMI 計算器"
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
                                          prefix={<LockOutlined className="site-form-item-icon" />}
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

                                      <Form.Item>
                                        <MyNavLink to="/register">
                                          <Button type="primary" htmlType="submit" block>
                                            註冊
                                          </Button>
                                        </MyNavLink>
                                      </Form.Item>
                                  </Form>
                              </Card>
                          </Col>
                      </Row>
                  </Content>
              </Col>
          </Row>
    )
  }
}
