import React from 'react'
import {Table, Icon, Label, Popup} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {getStatusServicio} from '../../helpers'

const MonitorListadoServicios = ({servicios, posicionUnidades, idServicioCancelar}) => {

    servicios.map(servicio => {
        //console.log(servicio)
    })

    return (
        <Table striped selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan="2">Estatus</Table.HeaderCell>
                    <Table.HeaderCell>Ruta</Table.HeaderCell>
                    <Table.HeaderCell>Horario</Table.HeaderCell>
                    <Table.HeaderCell>Operador</Table.HeaderCell>
                    <Table.HeaderCell>Celular</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    servicios.map(servicio => {

                        return servicio.id === idServicioCancelar ?
                            (<Table.Row colSpan="5"><Table.Cell><p>Cancelando servicio, espera un momento...</p>
                            </Table.Cell></Table.Row>) :

                            (
                                <Table.Row key={servicio.id}>
                                    <Table.Cell>
                                        {getStatusServicio(servicio)}
                                    </Table.Cell>

                                    {
                                        !servicio.cancelado ?
                                            (
                                                <Table.Cell collapsing>
                                                    {
                                                        <Popup trigger={
                                                            <a href={servicio.locator} target="blank">
                                                                <Icon circular color='teal' name='location arrow'/>
                                                            </a>
                                                        }>
                                                            Ver unidad en mapa
                                                        </Popup>
                                                    }

                                                    {
                                                        <Popup trigger={
                                                            <a href={`http://sumaenlinea.mx/cgi-bin/e_web.EXE/Agrega_Registro?Modulo=TR_NOTSER&Indice=NUEVO&cliente=${servicio.idCliente}&ruta=${servicio.idRuta}&cerrar=1`}
                                                               target="blank">
                                                                <Icon circular color="blue" name="bullhorn"/>
                                                            </a>
                                                        }>
                                                            Notificar al cliente
                                                        </Popup>
                                                    }

                                                    {
                                                        posicionUnidades[servicio.itemIdWialon]
                                                            ? <Popup trigger={<Label size="small" horizontal
                                                                                     color="blue">{servicio.idUnidad ? `U${servicio.idUnidad}` : "X"} - {posicionUnidades[servicio.itemIdWialon].s} km/h</Label>}>
                                                                {posicionUnidades[servicio.itemIdWialon].ti}
                                                            </Popup>
                                                            : <Label size="small" horizontal
                                                                     color="blue">{servicio.idUnidad ? `U${servicio.idUnidad}` : "X"}</Label>
                                                    }

                                                    {
                                                        servicio.motivoTransferencia.length ?
                                                            <Popup trigger={<Icon color='green' circular
                                                                                  name='commenting'/>}>
                                                                {servicio.motivoTransferencia}
                                                            </Popup>
                                                            : ""
                                                    }
                                                </Table.Cell>
                                            ) :
                                            <Table.Cell> ---- </Table.Cell>
                                    }

                                    <Table.Cell>
                                        <p>
                                            {servicio.nombreRuta}
                                            &nbsp;
                                            {
                                                servicio.idServicioEspecial ?
                                                    <a href={`http://sumaenlinea.mx/cgi-bin/Suma.EXE/Id_Registro?Modulo=CLI_SERV&Indice=${servicio.idServicioEspecial}`}
                                                       target="blank">
                                                        {servicio.idServicioEspecial}
                                                    </a>
                                                    : ""
                                            }
                                        </p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>
                                            {servicio.tiemposRuta}
                                        </p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>
                                            {servicio.nombreOperador}
                                        </p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>
                                            {servicio.celularOperador}
                                        </p>
                                    </Table.Cell>
                                </Table.Row>
                            )
                    })
                }
            </Table.Body>
        </Table>
    )
}

MonitorListadoServicios.propTypes = {
    servicios: PropTypes.array.isRequired,
    posicionUnidades: PropTypes.object.isRequired,
    idServicioCancelar: PropTypes.number.isRequired,
}

export default MonitorListadoServicios
