import React, { Component } from 'react'
import { Row,Col,Layout} from 'antd'
import { Tabs } from 'antd';

//Pages
// import LineLogin from './LineLogin/LineLogin'
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';

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
    console.log(width,height);
    
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
        <Row style={{height: "100%"}}>
          
              {/* 讓BMIIntro這個組件可以顯示在左半邊（BMIIntro是顯示4個結果的頁面） */}
              <Col 
                span={width >= 768 ? 12 : 0}
                style={{backgroundColor:"#f9a852"}}
              >
                  <Content>
                      <Row type="flex" justify="center" align="top" style={{height: height - 64}}></Row>

                  </Content>
              </Col>

              {/* 右半邊 */}
              <Col 
                span={width >= 768 ? 12 : 24}
                style={{backgroundColor:"#ececec"}}
              >
                  <Content
                      style={{
                          padding: width >= 768 ?  '0 50px' : '0px'
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
