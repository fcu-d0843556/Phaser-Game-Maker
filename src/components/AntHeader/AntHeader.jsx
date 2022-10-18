import React, { Component }  from 'react'
import PubSub from 'pubsub-js'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'

import { Layout, Menu } from 'antd';

import './AntHeader.css'

const { Header, Content, Footer } = Layout;

class AntHeader extends Component {
    render(){
        return(
            <Layout>
                <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                }}
                >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(8).fill(null).map((_, index) => ({
                    key: String(index + 1),
                    label: `nav ${index + 1}`,
                    }))}
                />
                </Header>
                <Content
                className="site-layout"
                style={{
                    padding: '0 50px',
                    marginTop: 64,
                }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                        padding: 24,
                        minHeight: 380,
                        }}
                    >
                        Content
                    </div>
                </Content>

            
                <Footer
                style={{
                    textAlign: 'center',
                }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
    )}
}

export default withRouter(AntHeader)