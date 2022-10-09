import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class IntroStartBox extends Component {

  clickEvent = () => {
    if(localStorage.getItem("username") !== ""){
      this.props.history.push('/selectGame')
    }else{
      this.props.history.push('/login')
    }
    
  }

  render() {
    return (
        <header className="intro-container">
            <h1 className="intro-container-text">HELLO!</h1>
            <p>In this website, you can make your own games!</p>
            <p onClick={this.clickEvent} className="startbutton">Let's Start !</p>
        </header>
    )
  }
}

export default withRouter(IntroStartBox)