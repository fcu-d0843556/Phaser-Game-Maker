import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { Form, Input,Row,Col,Layout} from 'antd'
import { Button, Card, InputNumber,Tooltip, Space, message,Alert,Divider,Tabs } from 'antd';
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
  
  state = {
    height: window.innerHeight,
    width: window.innerWidth
  }

  updateDimensions = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }

  componentDidMount() {
      this.resizeSizeEvent = window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateDimensions)
  }

  render() {
    const {width,height} = this.state
    console.log(width);
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

    const tabItems = [
        {
            label: `登入`,
            key: 'login',
            children: '内容 1'
        },
        {
            label: `註冊`,
            key: 'register',
            children: '内容 2'
        }
    ]

    return (
        <Row>
          
              {/* 讓BMIIntro這個組件可以顯示在左半邊（BMIIntro是顯示4個結果的頁面） */}
              <Col span={width >= 768 ? 12 : 0}>
                  <Content
                      style={{
                          backgroundColor:"#3AAFA9"
                      }}
                  >
                      <Row type="flex" justify="center" align="top" style={{height: height}}></Row>

                  </Content>
              </Col>

{/* 768 */}
              {/* 右半邊 */}
              <Col span={width >= 768 ? 12 : 24}>
                  <Content
                      style={{
                          padding: '0 50px',
                          height: "100%",
                      }}
                  >
                      
                      <Row type="flex" justify="center" align="middle">

                          <Col span={20}>
                              <Tabs
                                  style={{marginTop: "100px"}}
                                  type="card"
                                  items={tabItems}
                              />

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
