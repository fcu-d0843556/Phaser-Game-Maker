import React, { Component } from 'react'

export default class IntroBox extends Component {
  render() {
    return (
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
    )
  }
}
