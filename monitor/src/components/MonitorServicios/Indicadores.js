import React from 'react'
import {Statistic, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'

const IndicadoresMonitor = ({stats}) => {

    return (
        <Segment textAlign='center'>
            <Statistic size='mini'>
                <Statistic.Label>Total</Statistic.Label>
                <Statistic.Value>{stats.total}</Statistic.Value>
            </Statistic>
            <Statistic size='mini'>
                <Statistic.Label>Suma</Statistic.Label>
                <Statistic.Value>{stats.suma}</Statistic.Value>
            </Statistic>
            <Statistic size='mini'>
                <Statistic.Label>Finalizados Suma</Statistic.Label>
                <Statistic.Value>{stats.finalizados_suma}</Statistic.Value>
            </Statistic>
            <Statistic size='mini'>
                <Statistic.Label>Confirmados</Statistic.Label>
                <Statistic.Value>{stats.confirmados}</Statistic.Value>
            </Statistic>
            <Statistic size='mini'>
                <Statistic.Label>No confirmados</Statistic.Label>
                <Statistic.Value>{stats.sin_confirmar}</Statistic.Value>
            </Statistic>
            <Statistic size='mini'>
                <Statistic.Label>Aliados</Statistic.Label>
                <Statistic.Value>{stats.aliados}</Statistic.Value>
            </Statistic>
        </Segment>
    )
}

IndicadoresMonitor.propTypes = {
    stats: PropTypes.object.isRequired
}

export default IndicadoresMonitor