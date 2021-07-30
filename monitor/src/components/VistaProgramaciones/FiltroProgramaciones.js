import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import {Container, Form, Button} from 'semantic-ui-react'

import {filtrarClientesFromServicios} from '../../helpers'
import BaseComponent from "../BaseComponent";

const tiposUnidad = [
    'Camioneta',
    'Sprinter',
    'Camión grande',
    'Autobus',
    'Automovil',
    'Camión chico'
]

const opcionesUnidad = tiposUnidad.map((tipo, index) => ({key: index, text: tipo, value: tipo}))

class FiltroProgramaciones extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            tipoUnidad: -1,
            cliente: -1
        }
    }

    onSubmit = () => {

        const {servicios, onAgregarASeleccion, onLimpiarSeleccion} = this.props
        const {cliente, tipoUnidad} = this.state

        let idsServiciosFiltrados = null
        let idsServiciosFiltradosPorTipoUnidad = null
        let idsServiciosFiltradosPorCliente = null

        if (cliente !== '' && tipoUnidad !== '') {

            idsServiciosFiltrados = servicios.all
                .filter(servicio => servicio.getRuta() && servicio.getUnidad())
                .filter(servicio => {
                    return servicio.getRuta().idCliente === parseInt(cliente) && servicio.getUnidad().tipo === tipoUnidad
                }).map(servicio => servicio.id)

        } else if (cliente !== '') {

            idsServiciosFiltradosPorCliente = servicios.all
                .filter(servicio => servicio.getRuta())
                .filter(servicio => servicio.getRuta().idCliente === parseInt(cliente))
                .map(servicio => servicio.id)

            idsServiciosFiltrados = idsServiciosFiltradosPorCliente

        } else if (tipoUnidad !== '') {
            idsServiciosFiltradosPorTipoUnidad = servicios.all
                .filter(servicio => servicio.getUnidad())
                .filter(servicio => servicio.getUnidad().tipo === tipoUnidad)
                .map(servicio => servicio.id)

            idsServiciosFiltrados = idsServiciosFiltradosPorTipoUnidad
        }

        if (idsServiciosFiltrados) {
            onAgregarASeleccion(_.uniq(idsServiciosFiltrados))
        } else {
            onLimpiarSeleccion()
        }
    }

    onReset = () => {
        this.setState({
            tipoUnidad: -1,
            cliente: -1
        })
        this.props.onLimpiarSeleccion()
    }

    render() {
        const {tipoUnidad, cliente} = this.state
        const {servicios, clientes} = this.props

        return (
            <Container>
                <Form form={'filtro-programaciones'} onSubmit={this.onSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Select name='cliente' label='Cliente' value={cliente} onChange={this.onChangeValue}
                                     search fluid options={filtrarClientesFromServicios(servicios.all, clientes.all)}/>

                        <Form.Select name='tipoUnidad' label='Tipo de Unidad' value={tipoUnidad}
                                     onChange={this.onChangeValue}
                                     options={opcionesUnidad}/>

                        <Form.Field>
                            <label>&nbsp;</label>
                            <Button.Group widths={2}>
                                <Button color={"orange"} fluid>Filtrar</Button>
                                <Button fluid onClick={this.onReset}>Reset</Button>
                            </Button.Group>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

FiltroProgramaciones.propTypes = {
    onLimpiarSeleccion: PropTypes.func.isRequired,
    onAgregarASeleccion: PropTypes.func.isRequired,
    servicios: PropTypes.object.isRequired,
    clientes: PropTypes.object.isRequired
}

export default FiltroProgramaciones
