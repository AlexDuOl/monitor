import React from 'react'

export default ({ y, x, translate, task, tasksTypesLength }) => {
  return (
    <g>
      <title>{ task.detalle }</title>
      <rect className={'servicio ' + task.tipo.toLowerCase()} y={0} height={((y.range()[1] - y.range()[0]) / tasksTypesLength) - 2}
        width={Math.max(20, x(task.endDate) - x(task.startDate))}
        transform={translate} key={`rectTask_${task.id}`}
        onClick={(event, data) => { console.log('I\'ve been clicked!', event.clientX) }} />

      <text x={5} y={20} transform={translate} >{task.turno}</text>
    </g>
  )
}