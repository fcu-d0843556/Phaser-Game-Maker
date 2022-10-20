import React, { Component } from 'react'


import MyNavLink from '../../components/MyNavLink/MyNavLink'
import { Carousel,Pagination,Layout    } from 'antd';

import './SelectGame.css'

const { Footer } = Layout;

export default class ChooseGame extends Component {

    state = {
        nowPage: 3,
        isClickButton: false,
        
        height: window.innerHeight, 
        width: window.innerWidth,
    }
    
    updateDimensions = () => {
        this.setState({
            height: window.innerHeight, 
            width: window.innerWidth
        });
    }

    componentDidMount(){
        window.addEventListener("resize", this.updateDimensions);
        this.setState({nowPage: 3})
        this.cardSelection.current.goTo(2,true)
    }
    
    goToGame = (name) => {
        return (event) => {
            this.props.history.push('/gameMaker', {
                gameId: name
            })
        }
    }

    afterSwipe = (page) => {
        const {nowPage,isClickButton} = this.state
        // console.log("now", page, nowPage);
        
        if(!isClickButton){
            this.setState({nowPage: page + 1})
        }

        else if(Math.abs(nowPage - page) === 1){
            if(nowPage > page){
                this.setState({nowPage: page + 1})
                this.setState({isClickButton: false})
            }else{
                this.setState({nowPage: page - 1})
                this.setState({isClickButton: false})
            }
        }
    }

    pageChange = (page) => {
        this.cardSelection.current.goTo(page - 1,true)
        this.setState({nowPage: page, isClickButton: true})
    }

    render() {
        this.cardSelection = React.createRef()
        const {height} = this.state

        const gameDatas = [
            { id: "001", name: "Cooking", src: "cookingTitle" },
            { id: "002", name: "CatchFruit", src: "catchFruitTitle" },
            { id: "003", name: "Shooting", src: "shootingTitle" },
            { id: "004", name: "PokeGetItem", src: "pokeGetItemTitle" },
            { id: "005", name: "Quiz", src: "quizTitle" },
            { id: "006", name: "Caution", src: "caution" },
        ]

        const contentStyle = {
            height: `${height-64}px`,
            color: '#fff',
            lineHeight: '100px',
            textAlign: 'center',
            background: '#364d79',
        };
        const {nowPage} = this.state

        return (
            <Layout className='all-screen'>
                <Carousel afterChange={this.afterSwipe} ref={this.cardSelection} dots={false}>
                    {
                        gameDatas.map((gameDataObj,index)=>{
                            return (
                                <div key={gameDataObj.id}>
                                    <div style={contentStyle}>
                                        <img alt="empty_img" className='style-center choose-game-img' onClick={this.goToGame(gameDataObj.name)} src={`/img/SelectGame/${gameDataObj.src}.png`}/>
                                    </div>
                                </div>
                            )
                        })
                    }                                
                </Carousel>
                <Footer className="fixed-game-footer white-footer" >
                    <Pagination style={{textAlign: "center"}} responsive={true} showSizeChanger={false} current={nowPage} onChange={this.pageChange} total={gameDatas.length * 10} />                 
                </Footer>
            </Layout>
        )
  }
}

