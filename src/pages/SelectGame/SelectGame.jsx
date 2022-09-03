import React, { Component } from 'react'
import MyNavLink from '../../components/MyNavLink/MyNavLink'

import './SelectGame.css'

export default class ChooseGame extends Component {

    render() {
        const gameDatas = [
            { id: "001", name: "cooking", src: "cookingTitle" },
            { id: "002", name: "catchFruit", src: "catchFruitTitle" },
            { id: "003", name: "shooting", src: "shootingTitle" },
            { id: "004", name: "chuochuole", src: "chuochuoleTitle" },
            { id: "005", name: "quiz", src: "quizTitle" },
            { id: "006", name: "caution", src: "caution" },
        ]

        return (
            <div className="main translate-mid center-position">

                {/* left arrow */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                
                {/* center select game */}
                <div className="phone-style translate-mid center-position">
                    <form id="submit" method="post" action="/chooseGame">
                        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {
                                    gameDatas.map((gameDataObj,index)=>{
                                        return (
                                            <div className={index ? "carousel-item" : "carousel-item active"} key={gameDataObj.id}>
                                                <MyNavLink to="gameMaker">
                                                    <img alt="empty_img" src={`/img/SelectGame/${gameDataObj.src}.png`} className="d-block img-center"/>
                                                </MyNavLink>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </form>
                </div>

                {/* right arrow */}
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        )
  }
}
