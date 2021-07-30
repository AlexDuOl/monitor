import moment from 'moment'
import React, { Component } from 'react'
import { scaleTime, scaleBand, timeHour } from 'd3'

import Task from './Task'
import XAxis from './XAxis'
import YAxis from './YAxis'
import PropTypes from "prop-types";

const FIT_TIME_DOMAIN_MODE = 'fit'
const FIXED_TIME_DOMAIN_MODE = 'fixed'

const defaultTimeDomainStart = timeHour.offset(moment().startOf('day'))
const defaultTimeDomainEnd = timeHour.offset(moment().endOf('day'))

class GanttChart extends Component {

  constructor (props) {
    super(props)

    this.timeDomainMode = FIT_TIME_DOMAIN_MODE
    this.timeDomainStart = defaultTimeDomainStart
    this.timeDomainEnd = defaultTimeDomainEnd
  }

  rectTransform = (task) => {
    return `translate(${this.x(task.startDate)},${this.y(task.taskName)})`
  }

  initTimeDomain = (tasks) => {
    if (this.timeDomainMode === FIT_TIME_DOMAIN_MODE) {
      if (tasks === undefined || tasks.length < 1) {
        this.timeDomainStart = defaultTimeDomainStart
        this.timeDomainEnd = defaultTimeDomainEnd
        return
      }

      const startDates = tasks.map(task => task.startDate.getTime())
      this.timeDomainStart = moment(tasks[startDates.indexOf(Math.min(...startDates))].startDate).startOf('day')
      this.timeDomainEnd = moment(tasks[startDates.indexOf(Math.min(...startDates))].startDate).endOf('day')
    }
  }

  renderTasks () {
    const { tasks, tasksTypes, width, height } = this.props

    this.initTimeDomain(tasks)

    this.x = scaleTime().domain([ this.timeDomainStart, this.timeDomainEnd ]).range([ 0, width ]).clamp(true)
    this.y = scaleBand().domain(tasksTypes).range([ 0, height ]).round(true)

    return tasks.map((task) => {
      return (
        <Task x={this.x} y={this.y} translate={this.rectTransform(task)} key={task.id}
              task={task} tasksTypesLength={tasksTypes.length} />
      )
    })
  }

  render () {
    const { margins, tasks, containerWidth, containerHeight, width, height } = this.props

    return (
      <svg className='chart' width={containerWidth} height={containerHeight}>
        <g className='gantt-chart' transform={`translate(${margins.left},${margins.top})`}>
          { this.renderTasks() }
          <XAxis x={this.x} height={height} width={width} margin={margins} tasks={tasks} />
          <YAxis y={this.y} />
        </g>
      </svg>
    )
  }
}

GanttChart.propTypes = {
  margins: PropTypes.element.isRequired,
  tasks: PropTypes.element.isRequired,
  tasksTypes: PropTypes.element.isRequired,
  width: PropTypes.element.isRequired,
  height: PropTypes.element.isRequired,
  containerWidth: PropTypes.element.isRequired,
  containerHeight: PropTypes.element.isRequired
}

export default GanttChart
