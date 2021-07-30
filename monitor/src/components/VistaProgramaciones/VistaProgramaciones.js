import React, {Component, createRef} from 'react'
import {Container, Segment, Table, Label, Button, Icon, Modal, Header, Sticky, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import FormaBuscarProgramaciones from './FormaBuscarProgramaciones'
import TablaBitacoras from "../Bitacoras/TablaBitacoras";

class VistaProgramaciones extends Component {
    contextRef = createRef()

    componentDidMount() {
        this.props.requestClientes(['activo=true', 'id_categoria=1', 'or(id=5)', 'sort(+nombre_empresa)'])

        this.props.requestProveedores(['activo=true', 'id_categoria=8', 'sort(+empresa)'])
    }

    componentWillUnmount() {
        this.props.onInvalidarBitacoras()
    }

    getDetalle = (idRuta, horario, idProveedor, idChofer, fechaInicial, fechaFinal, cancelado) => {
        const params = [
            `id_ruta=${idRuta}`,
            `id_estructura=${horario}`,
            `fecha=ge=${fechaInicial} 00:00:00`,
            `fecha=le=${fechaFinal} 23:59:59`,
            `cancelado=${cancelado}`,
            'sort(+fecha)'
        ]

        if (idChofer !== -1) {
            params.push(`id_operador=${idChofer}`)
        }

        if (idProveedor !== -1) {
            params.push(`id_proveedor=${idProveedor}`)
        }

        this.props.requestBitacoras(params)
    }

    getRowsDetalle = (rows) => {
        const {bitacoras: {fetching}} = this.props

        return rows.map(function (item, idx) {
            const {SERVICIOS, NOMBRE_RUTA, TURNO, TIPO, PROVEEDOR_SERVICIO, OPERADOR, CANCELADO} = item
            const {FECHA_INICIAL, FECHA_FINAL, ID_RUTA, HORARIO, ID_PROVEEDOR, ID_CHOFER} = item

            return (
                <Table.Row key={idx}>
                    <Table.Cell textAlign={'center'}><Label
                        color={CANCELADO ? "red" : "green"}>{SERVICIOS}</Label></Table.Cell>
                    <Table.Cell>{NOMBRE_RUTA} - {TURNO} - {TIPO}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{PROVEEDOR_SERVICIO}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{OPERADOR}</Table.Cell>
                    <Table.Cell textAlign={'center'} positive={CANCELADO === 0}
                                negative={CANCELADO === 1}>{CANCELADO ? "Sí" : "No"}</Table.Cell>
                    <Table.Cell fixed={"true"}>{FECHA_INICIAL}</Table.Cell>
                    <Table.Cell fixed={"true"}>{FECHA_FINAL}</Table.Cell>
                    <Table.Cell textAlign={'center'}>
                        <Button loading={fetching} color={'orange'} icon onClick={() => {
                            this.getDetalle(ID_RUTA, HORARIO, ID_PROVEEDOR, ID_CHOFER, FECHA_INICIAL, FECHA_FINAL, CANCELADO)
                        }}><Icon name='tasks'/>
                        </Button>
                    </Table.Cell>
                </Table.Row>
            )
        }, this)
    }

    getRowsDetalleFacturacion = (rows) => {
        const {login: {user}} = this.props

        if (user.puedeVerFacturacion()) {
            return rows.map(function (item, idx) {

                return (
                    <Table.Row key={idx} textAlign={'right'}>
                        <Table.HeaderCell colSpan={2}>{item.ruta}</Table.HeaderCell>
                        <Table.HeaderCell colSpan={3}>{item.periodo}</Table.HeaderCell>
                        <Table.HeaderCell>
                            <Label color={item.conteo.includes("Medios") ? "yellow" : "green"}>
                                {item.conteo}
                            </Label>
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan={2}>{item.totalCliente}</Table.HeaderCell>
                    </Table.Row>
                )

            }, this)
        } else {
            return rows.map(function (item, idx) {

                return (
                    <Table.Row key={idx} textAlign={'right'}>
                        <Table.HeaderCell colSpan={2}>{item.ruta}</Table.HeaderCell>
                        <Table.HeaderCell colSpan={3}>{item.periodo}</Table.HeaderCell>
                        <Table.HeaderCell colSpan={3}>
                            <Label color={item.conteo.includes("Medios") ? "yellow" : "green"}>
                                {item.conteo}
                            </Label>
                        </Table.HeaderCell>
                    </Table.Row>
                )

            }, this)
        }
    }

    getRowsTotalRuta = (rows) => {
        const {login: {user}} = this.props

        if (user.puedeVerFacturacion()) {
            return (
                <Table.Row textAlign={'right'}>
                    <Table.HeaderCell colSpan={6}>
                        Total ruta
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan={2}>
                        <Label color={'blue'}>
                            {rows}
                        </Label>
                    </Table.HeaderCell>
                </Table.Row>
            )
        }
    }

    getTable(items, header) {
        return (
            <Table celled selectable attached='top'>
                <Table.Header>
                    <Table.Row textAlign={'center'}>
                        <Table.HeaderCell colSpan={8}>{header}</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row textAlign={'center'}>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>Ruta</Table.HeaderCell>
                        <Table.HeaderCell>Proveedor</Table.HeaderCell>
                        <Table.HeaderCell>Operador</Table.HeaderCell>
                        <Table.HeaderCell>¿Cancelados?</Table.HeaderCell>
                        <Table.HeaderCell>Desde</Table.HeaderCell>
                        <Table.HeaderCell>Hasta</Table.HeaderCell>
                        <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.getRowsDetalle(items.detalle)}
                </Table.Body>
                <Table.Footer>
                    {this.getRowsDetalleFacturacion(items.facturacion)}
                    {this.getRowsTotalRuta(items.total_ruta)}
                </Table.Footer>
            </Table>
        )
    }

    getDetalleRuta = (items) => {
        return Object.keys(items).map(function (header, idx) {
            return (
                <Segment key={idx}>
                    {this.getTable(items[header], header)}
                </Segment>
            )
        }, this)
    }

    getTotalCliente(items) {
        return (
            <Segment>
                <Header textAlign='center'>
                    Total por facturar del periodo: {items}
                </Header>
            </Segment>
        )
    }


    render() {
        const {
            clientes,
            rutas,
            proveedores,
            servicios_programados,
            bitacoras,

            login: {user},
            onRequestCambioIndividualPrecio,
            onIniciarCambioIndividualPrecio,
            onFinalizarCambioIndividualPrecio
        } = this.props
        const {requestServiciosProgramados, requestRutas} = this.props

        return (
            <Grid.Column mobile={16} tablet={16} computer={16}>
            <div ref={this.contextRef}>
                <Container fluid>
                    <Sticky context={this.contextRef}>
                        <FormaBuscarProgramaciones
                            clientes={clientes}
                            rutas={rutas}
                            proveedores={proveedores}
                            onLoadingDetalle={servicios_programados.fetching}
                            onRequestDetalleProgramados={requestServiciosProgramados}
                            onRequestRutas={requestRutas}
                        />

                    </Sticky>

                    {user.puedeVerFacturacion() && servicios_programados.all.servicios && this.getTotalCliente(servicios_programados.all.total_facturar)}

                    {servicios_programados.all.servicios && this.getDetalleRuta(servicios_programados.all.servicios)}

                    {
                        <Modal open={bitacoras.listado.all.length ? true : false} size={'fullscreen'}
                               closeOnEscape={true} onClose={() => {
                            this.props.onInvalidarBitacoras()
                        }}>
                            <Header icon='clipboard' content='Detalle de servicios'/>
                            <Modal.Content>
                                <TablaBitacoras
                                    bitacoras={bitacoras}
                                    user={user}
                                    onCambioPrecio={onRequestCambioIndividualPrecio}
                                    onIniciarCambioPrecio={onIniciarCambioIndividualPrecio}
                                    onFinalizarCambioPrecio={onFinalizarCambioIndividualPrecio}
                                />
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' inverted onClick={() => {
                                    this.props.onInvalidarBitacoras()
                                }}>
                                    <Icon name='checkmark'/> Cerrar
                                </Button>
                            </Modal.Actions>
                        </Modal>

                    }


                </Container>
            </div>
            </Grid.Column>
        )
    }
}

VistaProgramaciones.propTypes = {
    clientes: PropTypes.object.isRequired,
    rutas: PropTypes.object.isRequired,
    proveedores: PropTypes.object.isRequired,
    servicios_programados: PropTypes.object.isRequired,
    bitacoras: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    onRequestCambioIndividualPrecio: PropTypes.func.isRequired,
    onIniciarCambioIndividualPrecio: PropTypes.func.isRequired,
    onFinalizarCambioIndividualPrecio: PropTypes.func.isRequired,
    onInvalidarBitacoras: PropTypes.func.isRequired,
    requestServiciosProgramados: PropTypes.func.isRequired,
    requestRutas: PropTypes.func.isRequired,
    requestClientes: PropTypes.func.isRequired,
    requestProveedores: PropTypes.func.isRequired,
    requestBitacoras: PropTypes.func.isRequired,
}

export default VistaProgramaciones
