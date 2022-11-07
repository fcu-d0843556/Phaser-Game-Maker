import React, { Component } from 'react'
import { Row,Col,Layout,Card,Space,Image} from 'antd'
import { Tabs } from 'antd';
import { Typography } from 'antd'

//Pages
// import LineLogin from './LineLogin/LineLogin'
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';

import './userAuth.less'
const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;


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
    // console.log(width,height);
    
    const tabItems = [
        {
            label: `登入`,
            key: 'login',
            children: <LoginForm/>
        },
        {
            label: `註冊`,
            key: 'register',
            children: <RegisterForm/>
        }
    ]

    return (
        <Row style={{height: "100%"}} className={width >= 768 ? 'user-auth-form-screen' : 'mm'} >
          
              {/* 讓BMIIntro這個組件可以顯示在左半邊（BMIIntro是顯示4個結果的頁面） */}
              <Col 
                span={width >= 768 ? 12 : 0}
                className="left-user-auth-form-col"
              >
                  <Content style={{height: "100%"}}>
                      <Row type="flex" justify="center" align="top">
                      {/* <Row type="flex" justify="center" align="top" > */}

                          <Card 
                              style={{background: "rgba(0,0,0,0)"}} 
                              // headStyle={{borderBottom: "none", padding:"0px"}}
                              bordered={false}  
                              // title={item.title}
                              // bodyStyle={{padding: "0 24px"}}
                              // extra={width >= 768 ? item.extra : ""}
                          >
                              <Title style={{margin: "24px"}}>馬上註冊！</Title>
                              <Title style={{margin: "24px"}} level={2}>讓我們一起製作有趣好玩的遊戲！</Title>
                              <Space>
                                  <Image src="/icon/loginIcon.svg" preview={false} />
                              </Space>
                          </Card>
                      </Row>

                  </Content>
              </Col>

              {/* 右半邊 */}
              <Col 
                span={width >= 768 ? 12 : 24}
                className="right-user-auth-form-col"
              >
                  <Content
                      style={{
                          padding: width >= 768 ?  '0 10px' : '0px'
                      }}
                  >
                      
                      <Row type="flex" justify="center" align="middle" style={{marginBottom: "30px"}}>
                          <Col span={20}>
                            <Tabs
                                style={{marginTop: "30px"}}
                                items={tabItems}
                            />
                          </Col>        
                      </Row>
                  </Content>
              </Col>
          </Row>
    )
  }
}
