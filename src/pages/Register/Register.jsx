import React, { Component } from 'react'
import axios from 'axios'
import {Button, Form, Input} from 'antd'

//css
import './Register.css'

export default class register extends Component {

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
        }).then(
        response => {
          if (response.data.isSuccessed) this.props.history.replace(`/home`,{
            username
          })
          else alert(response.data.message)
        },
        error => {console.log(error);}
      )
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div className="loginBox" style={{backgroundColor: 'orange'}}>
        <div className="loginTitle">註冊</div>
          <br/><br/>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
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
                Submit
              </Button>
              <br/><br/><br/>
            </Form.Item>
          </Form>
      </div>
    )
  }
}
