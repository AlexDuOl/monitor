import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Table, TableRow, TableCell, Segment, Message, Button} from 'semantic-ui-react';
import PropTypes from 'prop-types'

class ListaSanitizaciones extends Component {
    getListadoSanitizaciones() {
        return (
            <Segment loading={this.props.sanitizaciones.loading}>
                <Table celled>
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell>Cliente</Table.HeaderCell>
                            <Table.HeaderCell>Unidad</Table.HeaderCell>
                            <Table.HeaderCell>Operador</Table.HeaderCell>
                            <Table.HeaderCell>Fecha - Sanitizacion</Table.HeaderCell>
                            <Table.HeaderCell>Evidencia</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.sanitizaciones.all.map((sanitizacion, idx) => {
                            return (
                                <TableRow key={idx} textAlign="center">
                                    <TableCell>
                                        {sanitizacion.getCliente().getAttribute('nombreEmpresa')}
                                    </TableCell>
                                    <TableCell>
                                        {sanitizacion.getUnidad().getAttribute('numeroEconomico')}
                                    </TableCell>
                                    <TableCell>
                                        {sanitizacion.getOperador().getAttribute('nombre')}
                                    </TableCell>
                                    <TableCell>
                                        {sanitizacion.getFecha('dddd D MMMM YYYY')}
                                    </TableCell>
                                    <TableCell>
                                        <Button color={"orange"} circular icon='play'/>
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </Table.Body>
                </Table>
            </Segment>

        )
    }

    mensajeNohayDatos() {
        return (
            <Message
                negative
                color="red"
                icon="warning sign"
                header="No se encontraron sanitizaciones"
                content="Intenta un nuevo filtro"
            />

        )
    }

    render() {
        return (
            <Container>
                {!this.props.sanitizaciones.all.length ? this.mensajeNohayDatos() : this.getListadoSanitizaciones()}
            </Container>
        )
    }
}

ListaSanitizaciones.propTypes = {
    sanitizaciones: PropTypes.object.isRequired
}

const mapStateToProps = ({sanitizaciones}) => {
    return {sanitizaciones}
}

export default connect(mapStateToProps)(ListaSanitizaciones);
