import React, { Component } from 'react'
import { Layout } from 'antd';


//Pages
import MyFooter from './MyFooter/MyFooter'
import IntroFeatureBox from './IntroFeatureBox/IntroFeatureBox'
import IntroStartBox from './IntroStartBox/IntroStartBox'
import IntroSampleBox from './IntroSampleBox/IntroSampleBox';
import IntroStepBox from './IntroStepBox/IntroStepBox'

export default class Home extends Component {

  render() {
    return (
        <Layout>
            <IntroStartBox></IntroStartBox>
            <IntroFeatureBox></IntroFeatureBox>
            <IntroSampleBox></IntroSampleBox>
            <IntroStepBox></IntroStepBox>
            <MyFooter></MyFooter>
        </Layout>
    )
  }
}
