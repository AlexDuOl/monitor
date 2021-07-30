import React from 'react'
import {Segment, Statistic, Icon} from 'semantic-ui-react'
import PropTypes from 'prop-types'

const Resultados = ({programacion}) => (
    programacion.received_date ? <Segment basic loading={programacion.fetching}>
        {
            programacion.received_date && !programacion.error &&

            <Statistic.Group widths='four'>
                <Statistic>
                    <Statistic.Value>
                        <Icon name='checked calendar' color='green'/>
                        <span>{programacion.programados}</span>
                    </Statistic.Value>
                    <Statistic.Label>Servicios programados</Statistic.Label>
                </Statistic>

                <Statistic>
                    <Statistic.Value>
                        <Icon name='redo' color='blue'/>
                        <span>{programacion.actualizados}</span>
                    </Statistic.Value>
                    <Statistic.Label>Servicios reactivados</Statistic.Label>
                </Statistic>

                <Statistic>
                    <Statistic.Value>
                        <Icon name='remove from calendar' color='grey'/>
                        <span>{programacion.cancelados}</span>
                    </Statistic.Value>
                    <Statistic.Label>Servicios cancelados</Statistic.Label>
                </Statistic>

                <Statistic>
                    <Statistic.Value>
                        <Icon name='ban' color='orange'/>
                        <span>{programacion.sin_modificar}</span>
                    </Statistic.Value>
                    <Statistic.Label>Servicios no modificados</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        }
    </Segment> : <span/>
)

Resultados.propTypes = {
    programacion: PropTypes.object.isRequired
}

export default Resultados
