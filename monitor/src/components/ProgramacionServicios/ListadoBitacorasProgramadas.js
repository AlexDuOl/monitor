import React from 'react'
import {Segment, List, Message, Header} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {isEven} from '../../helpers'

const greenItem = {
    color: 'green'
}

const coralItem = {
    color: 'coral'
}

const ListadoBitacoras = ({bitacoras}) => {

    if (!bitacoras.fetching && !bitacoras.all.length && bitacoras.received_date) {
        return (
            <Message warning>
                <Message.Header>
                    No hubo resultados
                </Message.Header>
                <p>
                    No hay bitácoras con los criterios seleccionados
                </p>
            </Message>
        )
    }

    return (
        <Segment basic loading={bitacoras.fetching}>
            <Header as='h2'>Programación actual del operador</Header>
            <List divided relaxed>
                {
                    bitacoras.all.map((bitacora) => {
                        return (
                            <List.Item key={bitacora.id}>
                                <List.Icon name='circle' color={bitacora.getEstructura().color()} size='large'
                                           verticalAlign='middle'/>
                                <List.Content>
                                    <List.Description style={isEven(bitacora.getDia()) ? greenItem : coralItem}>
                                        {`${bitacora.getFecha()} - ${bitacora.getNombreRuta()} | ${bitacora.id}`}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        )
                    })
                }
            </List>
        </Segment>
    )
}

ListadoBitacoras.propTypes = {
    bitacoras: PropTypes.object.isRequired
}

export default ListadoBitacoras
