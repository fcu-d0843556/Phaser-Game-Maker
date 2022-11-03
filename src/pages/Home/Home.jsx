import React, { Component } from 'react'
import { Layout } from 'antd';


//Pages
import MyFooter from './MyFooter/MyFooter'
import IntroFeatureBox from './IntroFeatureBox/IntroFeatureBox'
import IntroStartBox from './IntroStartBox/IntroStartBox'

export default class Home extends Component {

  render() {
    return (
        <Layout>
            <IntroStartBox></IntroStartBox>
            <IntroFeatureBox></IntroFeatureBox>
            <MyFooter></MyFooter>
        </Layout>
    )
  }
}
