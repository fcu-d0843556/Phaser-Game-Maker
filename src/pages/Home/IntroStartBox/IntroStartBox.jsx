import React, { Component } from 'react'

export default class IntroStartBox extends Component {
  render() {
    return (
        <header className="intro-container">
            <h1 className="intro-container-text">HELLO!</h1>
            <p>In this website, you can make your own games!</p>
            {/* <% if(username){ %> */}
            {/*  */}
                <p className="startbutton">Let's Start !</p>
            {/* <% } else { %> */}
                <p className="startbutton">Let's Start !</p>
            {/* <% } %> */}
        </header>
    )
  }
}
