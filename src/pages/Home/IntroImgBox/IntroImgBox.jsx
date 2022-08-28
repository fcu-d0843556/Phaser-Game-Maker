import React, { Component } from 'react'

export default class IntroImgBox extends Component {
  render() {
    return (
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
    )
  }
}
