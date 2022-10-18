import React, { Component } from 'react'


//Pages
import Footer from './MyFooter/MyFooter'
import IntroStepBox from './IntroStepBox/IntroStepBox'
import IntroImgBox from './IntroImgBox/IntroImgBox'
import IntroStartBox from './IntroStartBox/IntroStartBox'

//css
import './Home.css'

export default class Home extends Component {

  render() {
    return (
        <div>
            <IntroStartBox></IntroStartBox>
            <IntroImgBox></IntroImgBox>
            <IntroStepBox></IntroStepBox>
            <Footer></Footer>
        </div>
    )
  }
}
