import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { axisBottom, select, timeFormat } from 'd3'

class XAxis extends Component {
  constructor(props) {
    super(props)

    this.axis = axisBottom(props.x)
      .tickFormat(timeFormat('%H:%M'))
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.updateD3(nextProps)
  }

  componentDidMount () {
    this.renderAxis()
  }

  componentDidUpdate () {
    this.renderAxis()
  }

  renderAxis () {
    const node = ReactDOM.findDOMNode(this)

    select(node).call(this.axis)
  }

  updateD3 ({ x }) {
    this.axis = axisBottom(x)
      .tickFormat(timeFormat('%H:%M'))
  }

  render () {
    const { height, margin } = this.props

    return <g transform={`translate(0, ${height - margin.top - margin.bottom + 40})`} />
  }
}

export default XAxis
