import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { axisLeft, select } from 'd3'

class YAxis extends Component {
  constructor (props) {
    super(props)

    this.axis = axisLeft(props.y)
  }

  componentWillReceiveProps (nextProps) {
    this.updateD3(nextProps)
  }

  componentDidMount () {
    this.renderAxis()
  }

  componentDidUpdate () {
    this.renderAxis()
  }

  updateD3 ({ y }) {
    this.axis = axisLeft(y)
  }

  renderAxis () {
    const node = ReactDOM.findDOMNode(this)

    select(node).call(this.axis)
  }

  render () {
    return <g />
  }
}

export default YAxis
