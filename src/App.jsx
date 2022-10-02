import React, { Component } from 'react'
import PubSub from 'pubsub-js';

//Components
import Header from './components/Header/Header'

export default class App extends Component {
  // state = { width: 0, height: 0 };

  // componentDidMount() {
  //   this.updateWindowDimensions();
  //   window.addEventListener('resize', this.updateWindowDimensions);
  // }
  
  // componentWillUnmount(){
  //   window.removeEventListener('resize', this.updateWindowDimensions);
  // }

  // updateWindowDimensions = () => {
  //   // this.setState({ width: window.innerWidth, height: window.innerHeight });
  //   PubSub.publish('getWindowSize', {
  //     width: window.innerWidth, 
  //     height: window.innerHeight
  //   })
    // console.log(window.innerWidth,  window.innerHeight);
  // }
  
  render() {
    return (
      <Header></Header>
    )
  }
}
