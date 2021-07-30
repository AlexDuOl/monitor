import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Segment, Icon, Container, Popup, Form, Accordion} from 'semantic-ui-react'

import FiltrosMonitorServicios from './FiltrosMonitorServicios'
import MonitorListadoServicios from './MonitorListadoServicios'

import Reloj from '../Reloj'
import IndicadoresMonitor from "./Indicadores";

class MonitorServicios extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeIndex: -1
        }
    }

    componentDidMount() {
        this.props.iniciarReloj()
        this.props.iniciarMonitor()
    }

    componentWillMount() {
        this.props.requestClientes(['activo=true', 'id_categoria=1', 'or(id=5)', 'sort(+nombre_empresa)'])

        this.props.requestProveedores(['activo=true', 'id_categoria=8', 'or(id=1)', 'sort(+empresa)'])

        this.props.requestOperadores(['activo=true', 'sort(+nombre)'])
    }

    componentWillUnmount() {
        this.props.detenerReloj()
        this.props.invalidarServicios()
        this.props.limpiarSeleccion()
    }

    getIcon(item) {

        const {posicionUnidades: {all}} = this.props

        if (all
            && all[item.itemIdWialon] !== undefined
            && all[item.itemIdWialon] > 0
            && (item.estatus === "servicio-en-ruta" || item.estatus === "servicio-por-comenzar")
        ) {
            return <Popup trigger={<Icon name="arrow alternate circle right" inverted/>}>
                {item.detalle} {item.nombreOperador}
            </Popup>
        }

        if (item.idProveedor !== 1) {
            return <Popup trigger={<Icon name="eye slash" inverted/>}>
                {item.detalle} {item.nombreOperador}
            </Popup>
        }

        if (!item.celularOperador) {
            return <Popup trigger={<Icon name="meh outline" inverted/>}>
                {item.detalle} {item.nombreOperador}
            </Popup>
        }

        if (!item.confirmado && !item.terminado) {
            return <Popup trigger={<Icon name="question" inverted/>}>
                {item.detalle} {item.nombreOperador}
            </Popup>
        }

        if (item.terminado) {
            return <Popup trigger={<Icon name="clipboard outline" inverted/>}>
                {item.detalle} {item.nombreOperador}
            </Popup>
        }

        if (item.confirmado) {
            return <Popup trigger={<Icon name="check" inverted/>}>
                {item.detalle} {item.nombreOperador}
            </Popup>
        }

        if (!item.confirmado) {
            return <Popup trigger={<Icon name="times" inverted/>}>
                {item.detalle} {item.nombreOperador}
            </Popup>
        }
    }

    handleClick = (e, titleProps) => {
        const {index} = titleProps
        const {activeIndex} = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({activeIndex: newIndex})
    }

    render() {
        const {servicios, serviciosSeleccionados, clientes, reloj, posicionUnidades} = this.props
        const {stats} = servicios
        const {activeIndex} = this.state

        const rows = serviciosSeleccionados.length ? serviciosSeleccionados : servicios.all

        const confirmados = rows.filter(function (item) {
            return item.confirmado
        })

        const sin_confirmar = rows.filter(function (item) {
            return !item.confirmado
        })

        return (
            <Container fluid>
                <h3 style={{textAlign: "left"}}>Monitoreo</h3>
                <Reloj tiempo={reloj.tiempo} horasDesde={1} horasHasta={1}/>

                <Accordion as={Form.Field} key="indicadores">
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown'/>
                        Filtros
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === 0}>
                        <FiltrosMonitorServicios
                            servicios={servicios}
                            clientes={clientes}
                            onLimpiarSeleccion={this.props.limpiarSeleccion}
                            onAgregarASeleccion={this.props.agregarASeleccion}/>
                    </Accordion.Content>
                </Accordion>

                <IndicadoresMonitor stats={stats}/>

                {rows.length &&
                <Segment loading={servicios.fetching && !servicios.all.length}>
                    <MonitorListadoServicios
                        servicios={sin_confirmar}
                        posicionUnidades={posicionUnidades.all}
                        idServicioCancelar={-1}
                        onClickCancelarServicio={() => {
                            console.log("Noop")
                        }}
                        onClickTransferencia={() => {
                            console.log("Noop")
                        }}
                    />

                    <hr/>

                    <MonitorListadoServicios
                        servicios={confirmados}
                        posicionUnidades={posicionUnidades.all}
                        idServicioCancelar={-1}
                        onClickCancelarServicio={() => {
                            console.log("Noop")
                        }}
                        onClickTransferencia={() => {
                            console.log("Noop")
                        }}
                    />
                </Segment>
                }
            </Container>
        )
    }
}

MonitorServicios.propTypes = {
    reloj: PropTypes.shape({
        tiempo: PropTypes.object.isRequired
    }),
    invalidarServicios: PropTypes.func.isRequired,
    iniciarReloj: PropTypes.func.isRequired,
    iniciarMonitor: PropTypes.func.isRequired,
    servicios: PropTypes.object.isRequired,
    detenerReloj: PropTypes.func.isRequired,
    requestClientes: PropTypes.func.isRequired,
    limpiarSeleccion: PropTypes.func.isRequired,
    serviciosSeleccionados: PropTypes.array.isRequired,
    clientes: PropTypes.object.isRequired,
    agregarASeleccion: PropTypes.func.isRequired,
    removerDeSeleccion: PropTypes.func.isRequired
}

export default MonitorServicios
