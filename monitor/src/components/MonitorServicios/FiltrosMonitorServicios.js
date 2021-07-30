import React from 'react'
import {Segment, Form, Button, Radio} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import BaseComponent from "../BaseComponent";

import {filtrarClientesFromServicios} from '../../helpers'

class FiltrosMonitorServicios extends BaseComponent {

    state = {
        servicios_received_date: null,
        clientes_received_date: null,
        opciones_clientes: [],
        cliente: -1,
        tipo: 'todos',
        proveedor: 'suma',
        activeIndex: -1
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.servicios_received_date !== nextProps.servicios.received_date && this.state.clientes_received_date !== nextProps.clientes.received_date) {

            this.setState({
                servicios_received_date: nextProps.servicios.received_date,
                clientes_received_date: nextProps.clientes.received_date
            })

            this.aplicarFiltros()
        }
    }

    getFiltrosFromServicios() {
        const {servicios, clientes} = this.props

        return filtrarClientesFromServicios(servicios.all, clientes.all)
    }

    aplicarFiltros() {
        const {cliente, tipo, proveedor} = this.state

        const idsServiciosFiltrados = this.props.servicios.all.filter(servicio => {
            switch (proveedor) {
                case 'suma':
                    return servicio.idProveedor === 1
                case 'aliados':
                    return servicio.idProveedor !== 1
                default:
                    return true
            }
        }).filter(servicio => {
            switch (tipo) {
                case 'empresariales':
                    return servicio.modalidad === 'Empresarial'
                case 'especiales':
                    return servicio.modalidad === 'Especial'
                default:
                    return true
            }
        }).filter(servicio => {
            switch (cliente) {
                case -1:
                    return true
                default:
                    return servicio.idCliente === cliente
            }
        }).map(servicio => {
            return servicio.id
        })

        this.props.onAgregarASeleccion(idsServiciosFiltrados)
    }

    onSubmit = () => {
        this.aplicarFiltros()
    }

    onReset = () => {
        this.setState({
            cliente: -1,
            estatus: 'no_confirmados',
            tipo: 'todos',
            proveedor: 'suma'
        })
    }

    render() {

        return (
            <Segment>
                <Form form='filtros-monitor' onSubmit={this.onSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Filtrar por tipo</label>
                            <Segment textAlign='center'>
                                <Radio
                                    label='Todos'
                                    name='tipo'
                                    value='todos'
                                    checked={this.state.tipo === 'todos'}
                                    onChange={this.onChangeValue}
                                />
                                &nbsp;|&nbsp;
                                <Radio
                                    label='Especiales'
                                    name='tipo'
                                    value='especiales'
                                    checked={this.state.tipo === 'especiales'}
                                    onChange={this.onChangeValue}
                                />
                                &nbsp;|&nbsp;
                                <Radio
                                    label='Empresariales'
                                    name='tipo'
                                    value='empresariales'
                                    checked={this.state.tipo === 'empresariales'}
                                    onChange={this.onChangeValue}
                                />
                            </Segment>
                        </Form.Field>

                        <Form.Field>
                            <label>Filtrar por proveedor</label>
                            <Segment textAlign='center'>
                                <Radio
                                    label='Todos'
                                    name='proveedor'
                                    value='todos'
                                    checked={this.state.proveedor === 'todos'}
                                    onChange={this.onChangeValue}
                                />
                                &nbsp;|&nbsp;
                                <Radio
                                    label='Suma'
                                    name='proveedor'
                                    value='suma'
                                    checked={this.state.proveedor === 'suma'}
                                    onChange={this.onChangeValue}
                                />
                                &nbsp;|&nbsp;
                                <Radio
                                    label='Aliados'
                                    name='proveedor'
                                    value='aliados'
                                    checked={this.state.proveedor === 'aliados'}
                                    onChange={this.onChangeValue}
                                />
                            </Segment>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select name='cliente' label='Cliente' search fluid
                                     options={this.getFiltrosFromServicios()}
                                     value={this.state.cliente} onChange={this.onChangeValue}/>
                        <Form.Field>
                            <label>&nbsp;</label>
                            <Button.Group widths={2}>
                                <Button color={"orange"} fluid onClick={this.onSubmit}>Filtrar</Button>
                                <Button fluid onClick={this.onReset}>Limpiar</Button>
                            </Button.Group>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

FiltrosMonitorServicios.propTypes = {
    servicios: PropTypes.object.isRequired,
    clientes: PropTypes.object.isRequired,
    onAgregarASeleccion: PropTypes.func.isRequired
}

export default FiltrosMonitorServicios
