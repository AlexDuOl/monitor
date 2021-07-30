import React from 'react'
import {Segment, Statistic, Icon, Message} from 'semantic-ui-react'
import PropTypes from 'prop-types'

const Resultados = ({transferencias}) => {

    if (transferencias.received_date && !transferencias.all.length && !transferencias.fetching) {
        return (
            <Message
                header='No hubo cambios'
                content='No se realizó ningún cambio, los servicios ya fueron transferidos anteriormente.'
            />
        )
    }

    return (
        transferencias.all.length || transferencias.fetching
            ? <Segment loading={transferencias.fetching}>
                <Statistic.Group widths="one">
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='exchange' color='green'/>
                            {transferencias.all.length}
                        </Statistic.Value>
                        <Statistic.Label>Servicios transferidos</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </Segment>
            : <Segment/>
    )
}

Resultados.propTypes = {
    transferencias: PropTypes.object.isRequired
}

export default Resultados
