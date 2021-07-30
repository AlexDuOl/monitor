import moment from 'moment'
import React from 'react'
import {Segment, Form, Button, TextArea, Statistic, Icon} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import BaseComponent from "../BaseComponent";

import {
    extraerOpcionesProveedores,
    extraerOpcionesOperadores,
    extraerOpcionesClientes,
    extraerOpcionesRutas,
    extraerOpcionesEstructuras,
    extraerIniciales
} from '../../helpers'

class FormaProgramarExcepcionServicio extends BaseComponent {

    state = {
        fecha: moment().format("YYYY-MM-DD"),
        hora_inicio: "00:00:00",
        hora_final: "00:00:00",
        proveedor: 1,
        cliente: -1,
        ruta: -1,
        estructura: -1,
        operador: -1,
        motivo: ''
    }

    componentDidMount() {
        this.props.requestClientes(['activo=true', 'id_categoria=1', 'or(id=5)', 'sort(+nombre_empresa)'])

        this.props.requestClientes(['activo=true', 'id_categoria=8', 'or(id=1)', 'sort(+empresa)'])

        this.props.requestOperadores(['activo=true', 'sort(+nombre)'])
    }

    triggerClienteChange = (event, data) => {

        const {invalidarRutas, invalidarEstructuras, requestRutas} = this.props

        invalidarRutas()
        invalidarEstructuras()

        this.setState({
            ruta: -1,
            estructura: -1
        })

        requestRutas([`id_cliente=${data.value}`, 'sort(+nombre)', 'activa=true'])

        this.setState({invalidDays: this.invalidDays})
        this.setState({...this.days})

        this.onChangeValue(event, data)
    }

    triggerRutaChange = (event, data) => {

        this.props.invalidarEstructuras()

        this.setState({
            estructura: -1
        })

        this.props.requestEstructuras([`id_ruta=${data.value}`, 'sort(+hora_inicio)', 'activa=true'])

        this.setState({invalidDays: this.invalidDays})
        this.setState({...this.days})

        this.onChangeValue(event, data)
    }

    triggerProveedorChange = (event, data) => {

        this.setState({
            operador: -1
        })

        if (this.state.proveedor !== 1) {
            this.props.requestOperadoresSubcontratados(['activo=true', 'sort(+nombre)', `id_proveedor=${data.value}`])
        }

        this.onChangeValue(event, data)
    }

    triggerEstructuraChange = (event, data) => {

        const {estructuras} = this.props

        const estructura = estructuras.all.filter(function (e) {
            return e.id === data.value
        })

        this.setState({
            hora_inicio: estructura[0].horaInicio.substr(11, 5),
            hora_final: estructura[0].horaFin.substr(11, 5)
        })

        this.onChangeValue(event, data)
    }

    onSubmit = () => {

        const {
            fecha,
            hora_inicio,
            hora_final,
            proveedor,
            estructura,
            operador,
            motivo
        } = this.state

        const payload = {
            fecha: fecha,
            id_estructura: estructura,
            id_proveedor: proveedor,
            hora_inicio: hora_inicio + ":00",
            hora_final: hora_final + ":00",
            id_operador: operador,
            motivo: `${motivo} - ${extraerIniciales(this.props.login.user.nombre)}`
        }

        this.props.excepcionServicio(payload)
    }

    render() {
        const {
            fecha,
            proveedor,
            cliente,
            ruta,
            estructura,
            operador,
            hora_inicio,
            hora_final,
            motivo
        } = this.state

        const {
            clientes,
            rutas,
            estructuras,
            proveedores,
            operadores,
            subcontratados,
            programacion
        } = this.props

        const opcionesOperadores = (proveedor === 1) ? operadores : subcontratados
        
        return (
            <Segment>
                <Form form={'formaProgramacion'} onSubmit={this.onSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input name='fecha' label='Fecha' type='date' value={fecha} onChange={this.onChangeValue}/>
                        <Form.Select name='cliente' label='Cliente' fluid search selection loading={clientes.fetching}
                                     options={clientes.all.map(extraerOpcionesClientes)} value={cliente}
                                     onChange={this.triggerClienteChange}/>

                        <Form.Select name='ruta' label='Ruta' fluid search selection loading={rutas.fetching}
                                     options={rutas.all.map(extraerOpcionesRutas)} value={ruta}
                                     onChange={this.triggerRutaChange}/>
                        <Form.Select name='estructura' label='Estructura' fluid search selection
                                     loading={estructuras.fetching}
                                     options={estructuras.all.map(extraerOpcionesEstructuras)} value={estructura}
                                     onChange={this.triggerEstructuraChange}/>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Input name='hora_inicio' label='Inicio' type='time' value={hora_inicio}
                                    onChange={this.onChangeValue}/>
                        <Form.Input name='hora_final' label='Final' type='time' value={hora_final}
                                    onChange={this.onChangeValue}/>
                        <Form.Select name='proveedor' label='Proveedor' fluid search selection
                                     loading={proveedores.fetching}
                                     options={proveedores.all.map(extraerOpcionesProveedores)} value={proveedor}
                                     onChange={this.triggerProveedorChange}/>

                        <Form.Select name='operador' label='Operador' fluid search selection
                                     loading={opcionesOperadores.fetching}
                                     options={opcionesOperadores.all.map(extraerOpcionesOperadores)} value={operador}
                                     onChange={this.onChangeValue}/>
                    </Form.Group>

                    <Form.Group widths="equal">

                        <Form.Field required>
                            <label>Motivo</label>
                            <TextArea label="Motivo" name="motivo" value={motivo} rows={1} onChange={this.onChangeValue}
                                      required/>
                        </Form.Field>

                        <Form.Field>
                            <label>&nbsp;&nbsp;</label>
                            <Button color={"orange"} fluid type="submit" disabled={programacion.excepcion.sending}
                                    loading={programacion.excepcion.sending}>Programar</Button>
                        </Form.Field>
                    </Form.Group>
                </Form>

                <hr/>

                {
                    programacion.excepcion.response && !programacion.excepcion.error &&
                    <Statistic.Group>
                        <Statistic>
                            <Statistic.Value>
                                <Icon name='check' color='green'/>
                                1
                            </Statistic.Value>
                            <Statistic.Label>Se genera excepción</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                }

            </Segment>
        )
    }
}

FormaProgramarExcepcionServicio.propTypes = {
    clientes: PropTypes.object.isRequired,
    rutas: PropTypes.object.isRequired,
    estructuras: PropTypes.object.isRequired,
    proveedores: PropTypes.object.isRequired,
    operadores: PropTypes.object.isRequired,
    subcontratados: PropTypes.object.isRequired,
    programacion: PropTypes.object.isRequired,
    invalidarRutas: PropTypes.func.isRequired,
    invalidarEstructuras: PropTypes.func.isRequired,
    requestRutas: PropTypes.func.isRequired,
    requestClientes: PropTypes.func.isRequired,
    requestOperadores: PropTypes.func.isRequired,
    requestEstructuras: PropTypes.func.isRequired,
    requestOperadoresSubcontratados: PropTypes.func.isRequired,
    excepcionServicio: PropTypes.func.isRequired,
}


export default FormaProgramarExcepcionServicio
