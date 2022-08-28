import React, { Component } from 'react'
// import phaserGame from './PhaserGame.js'
import './App.css'
export default class App extends Component {
  render() {
    return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <% if(username){ %> */}
                            <li className="nav-item">
                                <a className="nav-link" href="/chooseGame">chooseGame</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">您好, ??</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/logout">登出</a>
                            </li>
                            
                            
                        {/* <% } else { %> */}
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        {/* <% } %> */}

                        
                    </ul>
                </div>
            </div>
        </nav>

        {/* <!-- big intro V --> */}
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



        {/* <!-- pictures V --> */}
        <h2 style={{backgroundColor: "rgb(255, 255, 255)", padding: "20px", margin:"0px", border: "10px orange groove"}}>Picture</h2>

        <div style={{display: "flex"}}>
            <div style={{width: "60%", backgroundColor: "rgb(0, 0, 0)", color: "white"}}>
                <h1 style={{textAlign: "center"}}>Catch Fruit Game:</h1>
                <p style={{textAlign: "center"}}>.......</p>
            </div>
            <div style={{width: "40%"}}>
                <div className="preview" style={{opacity: "0.9", backgroundColor: "black"}}>
                    {/* <img style={{width: 100%;" id="squareImage" src="./src/static/img/catchFruitTitle.png"> */}
                </div>

                <div className="select" style={{backgroundColor: "rgb(160, 72, 0)"}}>
                    <div style={{float: "left"}} >
                        <i className="arrow arrowL" ></i>
                    </div>

                    <div style={{float: "right"}} >
                        <i className="arrow arrowR"></i>
                    </div>

                    <div style={{textAlign: "center"}}>
                        <span id="square1" className="square" style={{backgroundColor:"white"}} ></span>
                        <span id="square2" className="square"></span>
                        <span id="square3" className="square" ></span>
                        <span id="square4" className="square" ></span>
                    </div>
                </div>
            </div>
        </div>



        {/* <!-- three boxes --> */}
        <div className="boxes">
            <div className="threeBox sideRightBox">
                {/* <p><%= username%></p> */}
                <h1>Choose!</h1>
                <p>Use our already complete game</p>
                <p>..............</p>
            </div>

            <div className="threeBox">
                <h1>Modify!</h1>
                <p>Change game's data to your own style !</p>
                <p>we use very simple way to let you create games </p>
            </div>

            <div className="threeBox sideLeftBox">
                <h1>Enjoy!</h1>
                <p>Give your friend this game !</p>
                <p>Enjoy !</p>
            </div>
        </div>


        {/* <!-- footer --> */}
        <div className="footer"></div>
      </div>
    )
  }
}
