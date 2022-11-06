import React, { Component } from 'react'
import { Layout } from 'antd';


//Pages
import MyFooter from './MyFooter/MyFooter'
import IntroFeatureBox from './IntroFeatureBox/IntroFeatureBox'
import IntroStartBox from './IntroStartBox/IntroStartBox'
import IntroSampleBox from './IntroSampleBox/IntroSampleBox';
import IntroStepBox from './IntroStepBox/IntroStepBox'

export default class Home extends Component {

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
    const {width} = this.state
    return (
        <Layout>
            <IntroStartBox></IntroStartBox>
            <IntroFeatureBox></IntroFeatureBox>
            <IntroSampleBox></IntroSampleBox>
            <IntroStepBox width={width}></IntroStepBox>
            <MyFooter></MyFooter>
        </Layout>
    )
  }
}
