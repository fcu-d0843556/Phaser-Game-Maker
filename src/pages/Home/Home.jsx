import React, { Component } from 'react'

//Components
import Header from '../../components/Header/Header'

//Pages
import Footer from './Footer/Footer'
import IntroStepBox from './IntroStepBox/IntroStepBox'
import IntroImgBox from './IntroImgBox/IntroImgBox'
import IntroStartBox from './IntroStartBox/IntroStartBox'


export default class Home extends Component {

  render() {
    return (
        <div>
            <Header></Header>
            <IntroStartBox></IntroStartBox>
            <IntroImgBox></IntroImgBox>
            <IntroStepBox></IntroStepBox>
            <Footer></Footer>
        </div>
    )
  }
}
