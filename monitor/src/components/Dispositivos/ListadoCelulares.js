import React, {Component} from 'react'
import {Segment, Table, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'

class ListadoCelulares extends Component {

    componentDidMount() {
        this.props.requestDispositivos([
            'activo=true',
            'sort(fecha_actualizacion)'
        ])
    }

    render() {
        return (
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <h3 style={{textAlign: "left"}}>Celulares</h3>
            <Segment loading={this.props.dispositivos.fetching}>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row textAlign='center'>
                            <Table.HeaderCell>Identificador</Table.HeaderCell>
                            <Table.HeaderCell>Nombre</Table.HeaderCell>
                            <Table.HeaderCell>Versión Sumadrivers</Table.HeaderCell>
                            <Table.HeaderCell>Marca</Table.HeaderCell>
                            <Table.HeaderCell>Modelo</Table.HeaderCell>
                            <Table.HeaderCell>Ultima actualización</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.props.dispositivos.all.map(
                                (it) => {
                                    return (
                                        <Table.Row key={it.data.id}>
                                            <Table.Cell>{it.data.id}</Table.Cell>
                                            <Table.Cell>{it.data.relations.usuario.data.attributes.nombre}</Table.Cell>
                                            <Table.Cell>{it.data.attributes.versionName}</Table.Cell>
                                            <Table.Cell>{it.data.attributes.brand}</Table.Cell>
                                            <Table.Cell>{it.data.attributes.deviceModel}</Table.Cell>
                                            <Table.Cell>{it.data.attributes.fechaActualizacion}</Table.Cell>
                                        </Table.Row>
                                    )
                                }
                            )
                        }
                    </Table.Body>
                </Table>
            </Segment>
            </Grid.Column>
        )
    }
}

ListadoCelulares.propTypes = {
    requestDispositivos: PropTypes.func.isRequired
}

export default ListadoCelulares
