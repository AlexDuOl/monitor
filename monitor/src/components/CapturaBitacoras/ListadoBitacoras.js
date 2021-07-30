import _ from 'lodash'
import React from 'react'
import {Segment, Table, Icon, Button, Message, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import BaseComponent from "../BaseComponent";
import moment from "moment";

class ListadoBitacoras extends BaseComponent {

    render() {
         const {
             bitacoras,
             onCambioIndividualHorario,
             onDesconfirmarBitacora,
             onCancelarServicio,
             onIniciarRescate,
             onIniciarIncidente,
             login: {user}
         } = this.props

        const aplicarRescate = function (bitacora) {
            onIniciarRescate(bitacora)
        }

        const aplicarIncidente = function (bitacora) {
            onIniciarIncidente(bitacora)
        }

        const tablas = _.map(bitacoras.all, (bitacora) => {

            const fechaComparacion = moment();
            const fechaBitacora = moment(bitacora.fecha);
            const diferenciaDias = fechaComparacion.diff(fechaBitacora, 'days')
            let fechaValida

            if(diferenciaDias > 7){
                fechaValida = false
            }else{
                fechaValida = true
            }

            return (
                <Table.Row key={bitacora.id} negative={!bitacora.hasDatosCompletos()} textAlign="center">
                    <Table.Cell>
                        {bitacora.attributes.cancelado && <Label ribbon>Cancelada</Label>}
                        {bitacora.attributes.excepcion && <Label ribbon>Excepción</Label>}

                        {bitacora.id}
                    </Table.Cell>
                    <Table.Cell>{bitacora.getFecha()}</Table.Cell>
                    <Table.Cell><Icon name='circle' color={bitacora.getEstructura().color()}/>
                        {`${bitacora.getNombreRuta()}`}
                    </Table.Cell>
                    <Table.Cell><Icon name='user' color='blue'/>{bitacora.numeroPersonas}</Table.Cell>
                    <Table.Cell>{`U${bitacora.getUnidad().id} - ${bitacora.getUnidad().tipo}`}</Table.Cell>
                    <Table.Cell>
                        <Icon name={bitacora.confirmado ? 'checkmark' : 'remove'}
                              color={bitacora.confirmado ? 'green' : 'red'}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name={bitacora.terminado ? 'checkmark' : 'remove'}
                              color={bitacora.terminado ? 'green' : 'red'}/>
                    </Table.Cell>
                    <Table.Cell textAlign={'center'}>
                        <Button.Group>
                            {

                                <Button basic color={'grey'} icon={'clock outline'}
                                        onClick={() => onCambioIndividualHorario(bitacora)}/>
                            }
                            {
                                bitacora.cancelable &&
                                <Button basic color={'grey'} icon={'circle times'}
                                        onClick={() => onCancelarServicio(bitacora)}/>
                            }
                            {
                                bitacora.rescatable &&
                                <Button basic color={'grey'} icon={'lightning'}
                                        onClick={() => aplicarRescate(bitacora)}/>
                            }
                            <Button basic color={'grey'} icon={'warning circle'}
                                    onClick={() => aplicarIncidente(bitacora)}/>
                            {
                                user.puedeDesconfirmarBitacora() && bitacora.confirmado && fechaValida === true &&
                                <Button basic color={'orange'} icon={'undo'}
                                        onClick={() => onDesconfirmarBitacora(bitacora)}/>
                            }
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            )
        });

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
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row textAlign='center'>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Fecha</Table.HeaderCell>
                            <Table.HeaderCell>Ruta</Table.HeaderCell>
                            <Table.HeaderCell>Aforo</Table.HeaderCell>
                            <Table.HeaderCell>Unidad</Table.HeaderCell>
                            <Table.HeaderCell>C</Table.HeaderCell>
                            <Table.HeaderCell>T</Table.HeaderCell>
                            <Table.HeaderCell>Acciones</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {tablas}
                    </Table.Body>
                </Table>
            </Segment>
        )
    }
}

ListadoBitacoras.propTypes = {
    bitacoras: PropTypes.object.isRequired,
    onCambioIndividualHorario: PropTypes.func.isRequired,
    onDesconfirmarBitacora: PropTypes.func.isRequired,
    onCancelarServicio: PropTypes.func.isRequired,
    onIniciarRescate: PropTypes.func.isRequired,
    onIniciarIncidente: PropTypes.func.isRequired
}

export default ListadoBitacoras