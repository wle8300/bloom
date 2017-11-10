import React, { Component } from 'react'
import PropTypes from 'prop-types'

class App extends Component {
  constructor () {

    super()

    this._isTouchCapable = 'ontouchstart' in window || navigator.msMaxTouchPoints // https://stackoverflow.com/q/4817029
    this._debloomTimeout = null

    this.state = {
      bloomPhase: 'hidden', // 'hidden, staging, blooming, resetting'
      x: 0,
      y: 0,
    }
  }
  render() {
    return (
      <div style={this.$1804017614722()}>
        <div style={this.$3466133276696()}/>
      </div>
    )
  }
  componentDidMount () {

    this._isTouchCapable
    ? document.addEventListener('touchstart', this.handleEngageButton)
    : document.addEventListener('mousedown', this.handleEngageButton)

    this._isTouchCapable
    ? document.addEventListener('touchend', this.handleDisengageButton)
    : document.addEventListener('mouseup', this.handleDisengageButton)
  }
  handleEngageButton = (e) => {

    const x = e.touches ? e.touches[0].clientX : e.pageX
    const y = e.touches ? e.touches[0].clientY : e.pageY


    clearTimeout(this._debloomTimeout)

    requestAnimationFrame(() => {

      this.setState({
        bloomPhase: 'hidden',
        x: x,
        y: y,
      })

      requestAnimationFrame(() => this.setState({bloomPhase: 'blooming'}))
    })
  }
  handleDisengageButton = () => {

    this.setState({bloomPhase: 'resetting'})

    this._debloomTimeout = setTimeout(() => {

      this.setState({bloomPhase: 'hidden'})
    }, this.props.animationMs * this.props.animationMsCompound)
  }
  $1804017614722 () {
    return {
      height: '100%',
      cursor: 'pointer',
      outline: 'none',
      userSelect: 'none',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
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
          return `translateX(-${this.props.bloomSize}px) translateY(-${this.props.bloomSize}px)`
        case 'resetting':
          return `translateX(-${this.props.bloomSize}px) translateY(-${this.props.bloomSize}px)`
        default:
          return 'hidden'
      }
    }

    const arbitratePadding =  () => {

      switch (this.state.bloomPhase){
        case 'hidden':
          return 0
        case 'staging':
          return 0
        case 'blooming':
          return this.props.bloomSize
        case 'resetting':
          return this.props.bloomSize
        default:
          return 0
      }
    }

    const arbitrateTransition = () => {

      switch (this.state.bloomPhase){
        case 'hidden':
          return 'none'
        case 'staging':
          return 'none'
        case 'blooming':
          return `transform ${this.props.animationMs}ms ${this.props.transitionTiming}, padding ${this.props.animationMs}ms ${this.props.transitionTiming}, opacity ${this.props.animationMs}ms ${this.props.transitionTiming}`
        case 'resetting':
          // use "animationMsCompound" to slow reset animation
          return `transform ${this.props.animationMs * this.props.animationMsCompound}ms ${this.props.transitionTiming}, padding ${this.props.animationMs * this.props.animationMsCompound}ms ${this.props.transitionTiming}, opacity ${this.props.animationMs * this.props.animationMsCompound}ms ${this.props.transitionTiming}`
        default:
          return 'none'
      }
    }

    const arbitrateOpacity = () => {

      switch (this.state.bloomPhase){
        case 'hidden':
          return 0
        case 'staging':
          return this.props.opacity
        case 'blooming':
          return this.props.opacity
        case 'resetting':
          return 0
        default:
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
      backgroundColor: this.props.backgroundColor,
      opacity: arbitrateOpacity(),
      borderRadius: '100%',
      transition: arbitrateTransition(),
    }
  }
}

App.propTypes = {
  bloomSize: PropTypes.number,
  transitionTiming: PropTypes.string,
  animationMs: PropTypes.number,
  animationMsCompound: PropTypes.number,
  backgroundColor: PropTypes.string,
  opacity: PropTypes.number,
}

App.defaultProps = {
  bloomSize: 150,
  transitionTiming: 'cubic-bezier(0.215, 0.61, 0.355, 1)', // "easeOutCubic"
  animationMs: 150,
  animationMsCompound: 2,
  // backgroundColor: 'rgb(184, 255, 242)',
  backgroundColor: 'black',
  opacity: 0.25,
}

export default App
