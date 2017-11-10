import React, { Component } from 'react'

class App extends Component {
  constructor () {

    super()

    //https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
    this._isTouchCapable = 'ontouchstart' in window || navigator.msMaxTouchPoints
    this._animationTime = 250
    this.state = {
      // 'hidden, staging, blooming, resetting'
      bloomPhase: 'hidden',
      x: 0,
      y: 0,
      bloomDistance: 50,
    }
  }
  render() {
    return (
      <div style={this.$1804017614722()}>
        {this.state.x}–––{this.state.y}
        <div style={this.$3466133276696()}/>
      </div>
    )
  }
  componentDidMount () {

    this._isTouchCapable
    ? document.addEventListener('touchstart', this.handleTouchStart)
    : document.addEventListener('mousedown', this.handleMouseDown)

    this._isTouchCapable
    ? document.addEventListener('touchend', this.handleTouchEnd)
    : document.addEventListener('mouseup', this.handleTouchEnd)
  }
  handleTouchStart = (e) => {

    this.setState({
      bloomPhase: 'hidden',
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }, () => this.setState({bloomPhase: 'blooming'}))
  }
  handleTouchEnd = () => {

    this.setState({bloomPhase: 'resetting'}, () => {

      setTimeout(() => {

        this.setState({bloomPhase: 'hidden'})
      }, this._animationTime);
    })
  }
  handleMouseDown = (e) => {

    this.setState({x: e.pageX, y: e.pageY})
  }
  $1804017614722 () {
    return {
      height: '100%',
    }
  }
  $3466133276696 () {

    const arbitrateTransform = () => {

      switch (this.state.bloomPhase){
        case 'hidden':
          return 'none'
        case 'staging':
          return 'none'
        case 'blooming':
          return `translateX(-${this.state.bloomDistance}px) translateY(-${this.state.bloomDistance}px)`
        case 'resetting':
          return `translateX(-${this.state.bloomDistance}px) translateY(-${this.state.bloomDistance}px)`
      }
    }

    const arbitratePadding =  () => {

      switch (this.state.bloomPhase){
        case 'hidden':
          return 0
        case 'staging':
          return 0
        case 'blooming':
          return this.state.bloomDistance
        case 'resetting':
          return this.state.bloomDistance
      }
    }

    const arbitrateTransition = () => {

      switch (this.state.bloomPhase){
        case 'hidden':
          return 'none'
        case 'staging':
          return 'none'
        case 'blooming':
          return `transform ${this._animationTime}ms ease-out, padding ${this._animationTime}ms ease-out, opacity ${this._animationTime}ms ease-out`
        case 'resetting':
          return `transform ${this._animationTime}ms ease-out, padding ${this._animationTime}ms ease-out, opacity ${this._animationTime}ms ease-out`
      }
    }

    const arbitrateOpacity = () => {

      switch (this.state.bloomPhase){
        case 'hidden':
          return 0
        case 'staging':
          return 0
        case 'blooming':
          return 1
        case 'resetting':
          return 0
      }
    }

    return {
      position: 'absolute',
      left: this.state.x,
      top: this.state.y,
      padding: arbitratePadding(),
      transform: arbitrateTransform(),
      width: 0,
      height: 0,
      backgroundColor: 'rgb(168, 255, 239)',
      opacity: arbitrateOpacity(),
      borderRadius: '100%',
      transition: arbitrateTransition(),
    }
  }
}

export default App
