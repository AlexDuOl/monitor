import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon, Label, Table, Button} from "semantic-ui-react";


class DetalleBitacoras extends Component {

    render() {
        const {bitacoras, user, onIniciarCambioPrecio, bitacoras: {cambioIndividualPrecio}} = this.props

        return bitacoras.listado.all.map((bitacora) => {
            return (
                <Table.Row key={bitacora.id}>
                    <Table.Cell>
                        {bitacora.attributes.cancelado && <Label ribbon>Cancelada</Label>}
                        {bitacora.attributes.excepcion && <Label ribbon>Excepción</Label>}
                        {bitacora.id}
                    </Table.Cell>
                    <Table.Cell textAlign={'center'}><p>{bitacora.getFecha()}</p><p>({bitacora.getHorario()})</p>
                    </Table.Cell>
                    <Table.Cell textAlign={'center'}>
                        <p>
                            <Icon name='circle' color={bitacora.getEstructura().color()}/>
                            {`${bitacora.getNombreRuta()}`}
                        </p>
                        <p>
                            {bitacora.getOperador() ? bitacora.getOperador().nombre : 'Sin definir'} ({bitacora.getProveedor().nombre})
                        </p>
                    </Table.Cell>
                    <Table.Cell><Icon name='user' color='blue'/>{bitacora.numeroPersonas}</Table.Cell>
                    <Table.Cell>
                        {bitacora.getUnidad() ? `U${bitacora.getUnidad().id} - ${bitacora.getUnidad().tipo}` : 'Sin definir'}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name={bitacora.confirmado ? 'checkmark' : 'remove'}
                              color={bitacora.confirmado ? 'green' : 'red'}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name={bitacora.terminado ? 'checkmark' : 'remove'}
                              color={bitacora.terminado ? 'green' : 'red'}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name={bitacora.pagarServicio ? 'money' : 'ban'}
                              color={bitacora.pagarServicio ? 'green' : 'red'}/>
                    </Table.Cell>
                    <Table.Cell>
                        {bitacora.pagoOperador}
                    </Table.Cell>
                    <Table.Cell>
                        {bitacora.pagoAliado}
                    </Table.Cell>
                    <Table.Cell>
                        {user.puedeVerFacturacion() ? bitacora.precioCliente : '---'}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        {
                            user.puedeCambiarPrecios() &&
                            <Button basic
                                    color={cambioIndividualPrecio.bitacora && bitacora.id === cambioIndividualPrecio.bitacora.id ? "green" : "grey"}
                                    icon={'money bill alternate outline'}
                                    onClick={() => onIniciarCambioPrecio(bitacora)}/>
                        }
                    </Table.Cell>
                </Table.Row>
            )
        })
    }
}

DetalleBitacoras.propTypes = {
    bitacoras: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    onIniciarCambioPrecio: PropTypes.func.isRequired
}

export default DetalleBitacoras
