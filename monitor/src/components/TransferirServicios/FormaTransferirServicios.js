import moment from 'moment'
import React from 'react'
import {Form, Segment, Button, TextArea} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import BaseComponent from "../BaseComponent";

import {
    extraerOpcionesProveedores,
    extraerOpcionesOperadores,
    extraerOpcionesClientes,
    extraerOpcionesRutas,
    extraerOpcionesEstructuras,
    getDias,
    extraerIniciales
} from '../../helpers'

class FormaTransferirServicios extends BaseComponent {

    constructor(props) {
        super(props)

        this.invalidDays = {
            lunes: true,
            martes: true,
            miercoles: true,
            jueves: true,
            viernes: true,
            sabado: true,
            domingo: true
        }

        this.days = {
            lunes: false,
            martes: false,
            miercoles: false,
            jueves: false,
            viernes: false,
            sabado: false,
            domingo: false
        }

        this.state = {
            desde: moment().startOf("week").format("YYYY-MM-DD"),
            hasta: moment().endOf("month").format("YYYY-MM-DD"),
            proveedor: 1,
            cliente: -1,
            ruta: -1,
            estructura: -1,
            operador: -1,
            commit: false,
            force: false,
            motivo: '',
            invalidDays: {
                lunes: true,
                martes: true,
                miercoles: true,
                jueves: true,
                viernes: true,
                sabado: true,
                domingo: true
            }

        }
    }

    componentDidMount() {
        this.props.requestClientes(['activo=true', 'id_categoria=1', 'or(id=5)', 'sort(+nombre_empresa)'])

        this.props.requestProveedores(['activo=true', 'id_categoria=8', 'or(id=1)', 'sort(+empresa)'])

        this.props.requestOperadores(['activo=true', 'sort(+nombre)'])
    }

    triggerChangeCliente = (event, data) => {
        this.onChangeValue(event, data)

        this.props.invalidarRutas()
        this.props.invalidarEstructuras()

        this.props.requestRutas([`id_cliente=${data.value}`, 'sort(+nombre)', 'activa=true'])

        this.setState({invalidDays: this.invalidDays})
        this.setState({...this.days})
    }

    triggerChangeRuta = (event, data) => {
        this.onChangeValue(event, data)
        this.props.invalidarEstructuras()

        this.props.requestEstructuras([`id_ruta=${data.value}`, 'sort(+hora_inicio)', 'activa=true'])

        this.setState({invalidDays: this.invalidDays})
        this.setState({...this.days})
    }

    triggerEstructuraChange = (event, data) => {

        const {estructuras} = this.props

        const estructura = estructuras.all.filter(function (e) {
            return e.id === data.value
        })

        let invalidDays = {
            lunes: true,
            martes: true,
            miercoles: true,
            jueves: true,
            viernes: true,
            sabado: true,
            domingo: true
        }

        let days = {
            lunes: false,
            martes: false,
            miercoles: false,
            jueves: false,
            viernes: false,
            sabado: false,
            domingo: false
        }

        estructura[0].dias.map(function (dia) {
            switch (dia) {
                case 1:
                    invalidDays.lunes = false
                    days.lunes = true
                    return
                case 2:
                    invalidDays.martes = false
                    days.martes = true
                    return
                case 3:
                    invalidDays.miercoles = false
                    days.miercoles = true
                    return
                case 4:
                    invalidDays.jueves = false
                    days.jueves = true
                    return
                case 5:
                    invalidDays.viernes = false
                    days.viernes = true
                    return
                case 6:
                    invalidDays.sabado = false
                    days.sabado = true
                    return
                case 7:
                    invalidDays.domingo = false
                    days.domingo = true
                    return
            }
            return
        })

        this.setState({invalidDays: invalidDays})
        this.setState({...days})

        this.onChangeValue(event, data)
    }

    triggerChangeProveedor = (event, data) => {
        this.onChangeValue(event, data)

        this.setState({
            operador: -1
        })

        if (data.value !== 1) {
            this.props.requestOperadoresSubcontratados(['activo=true', 'sort(+nombre)', `id_proveedor=${data.value}`])
        }
    }

    onSubmit = () => {
        const {
            desde,
            hasta,
            proveedor,
            operador,
            motivo,
            commit,
            force,
            ruta,
            estructura
        } = this.state

        const {login} = this.props

        const params = {
            desde: `${desde} 00:00:00`,
            hasta: `${hasta} 23:59:59`,
            idProveedorDestino: proveedor,
            idOperadorDestino: operador,
            dias: getDias(this.state),
            motivo: `${motivo} - ${extraerIniciales(this.props.login.user.nombre)}`,
            commit: commit,
            force: force,
            idRuta: ruta,
            idsEstructuras: estructura !== -1 ? [estructura] : [],
            usuarioId: login.user.id
        }

        this.props.requestTransferirServicios(params)
    }

    render() {
        const {
            desde,
            hasta,
            cliente,
            ruta,
            estructura,
            proveedor,
            operador,
            motivo,
            commit,
            force,
        } = this.state

        const {
            clientes,
            rutas,
            estructuras,
            proveedores,
            operadores,
            subcontratados,
            transferencias,
            login: {user}
        } = this.props

        const opcionesOperadores = (proveedor === 1) ? operadores : subcontratados

        return (
            <div>
                {
                    transferencias.error &&
                    <Segment inverted color='red'>
                        <h1>Estatus: {transferencias.error.cause.status}</h1>
                        <hr/>
                        <h3>Mensaje: {transferencias.error.cause.data.mensaje}</h3>
                        <hr/>
                        <h4>Detalles</h4>
                        <ul>
                            {transferencias.error.cause.data.detalles.map((x, idx) => (<li key={idx}>{x}</li>))}
                        </ul>
                    </Segment>
                }
                <Segment>
                    <Form form={'formaTransferirServicios'} onSubmit={this.onSubmit}>

                        <Form.Group widths='equal'>
                            <Form.Input name='desde' label='Desde' type='date' value={desde}
                                        onChange={this.onChangeValue}/>
                            <Form.Input name='hasta' label='Hasta' type='date' value={hasta}
                                        onChange={this.onChangeValue}/>
                            <Form.Select name='cliente' label='Cliente' fluid search selection
                                         loading={clientes.fetching}
                                         options={clientes.all.map(extraerOpcionesClientes)} value={cliente}
                                         onChange={this.triggerChangeCliente}/>
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Select name='ruta' label='Ruta' fluid search selection loading={rutas.fetching}
                                         options={rutas.all.map(extraerOpcionesRutas)} value={ruta}
                                         onChange={this.triggerChangeRuta}/>

                            <Form.Select name='estructura' label='Estructura' fluid search selection
                                         loading={estructuras.fetching}
                                         options={estructuras.all.map(extraerOpcionesEstructuras)} value={estructura}
                                         onChange={this.triggerEstructuraChange}/>

                            <Form.Field>
                                <label>Días</label>
                                <Form.Group widths='equal'>
                                    <Form.Checkbox name='lunes' label='L' checked={this.state.lunes}
                                                   disabled={this.state.invalidDays.lunes}
                                                   onChange={this.onChangeValue}/> &nbsp;
                                    <Form.Checkbox name='martes' label='M' checked={this.state.martes}
                                                   disabled={this.state.invalidDays.martes}
                                                   onChange={this.onChangeValue}/> &nbsp;
                                    <Form.Checkbox name='miercoles' label='M' checked={this.state.miercoles}
                                                   disabled={this.state.invalidDays.miercoles}
                                                   onChange={this.onChangeValue}/> &nbsp;
                                    <Form.Checkbox name='jueves' label='J' checked={this.state.jueves}
                                                   disabled={this.state.invalidDays.jueves}
                                                   onChange={this.onChangeValue}/> &nbsp;
                                    <Form.Checkbox name='viernes' label='V' checked={this.state.viernes}
                                                   disabled={this.state.invalidDays.viernes}
                                                   onChange={this.onChangeValue}/> &nbsp;
                                    <Form.Checkbox name='sabado' label='S' checked={this.state.sabado}
                                                   disabled={this.state.invalidDays.sabado}
                                                   onChange={this.onChangeValue}/> &nbsp;
                                    <Form.Checkbox name='domingo' label='D' checked={this.state.domingo}
                                                   disabled={this.state.invalidDays.domingo}
                                                   onChange={this.onChangeValue}/>
                                </Form.Group>
                            </Form.Field>
                        </Form.Group>

                        <Form.Group widths="equal">
                            <Form.Select name='proveedor' label='Proveedor' fluid search selection
                                         loading={proveedores.fetching}
                                         options={proveedores.all.map(extraerOpcionesProveedores)} value={proveedor}
                                         onChange={this.triggerChangeProveedor}/>

                            <Form.Select name='operador' label='Operador' fluid search selection
                                         loading={opcionesOperadores.fetching}
                                         options={opcionesOperadores.all.map(extraerOpcionesOperadores)}
                                         value={operador}
                                         onChange={this.onChangeValue}/>
                            <Form.Field required>
                                <label>Motivo</label>
                                <TextArea label="Motivo" name="motivo" value={motivo} rows={1}
                                          onChange={this.onChangeValue} required/>
                            </Form.Field>
                        </Form.Group>

                        <Form.Group widths="equal">
                            <Form.Field>
                                <Form.Checkbox toggle name='commit' label='Aplicar cambios' checked={commit}
                                               onChange={this.onChangeValue}/>
                            </Form.Field>

                            {
                                user.puedeForzarProgramacionTransferencias()&&
                                    <Form.Field>
                                        <Form.Checkbox toggle name='force' label='Forzar transferencia' checked={force}
                                        onChange={this.onChangeValue}/>
                                    </Form.Field>
                            }
                            <Form.Field>
                                <Button color={"orange"} fluid type="submit"
                                        disabled={this.props.transferencias.fetching}
                                        loading={this.props.transferencias.fetching}>Transferir</Button>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Segment>
            </div>
        )
    }
}

FormaTransferirServicios.propTypes = {
    clientes: PropTypes.object.isRequired,
    rutas: PropTypes.object.isRequired,
    estructuras: PropTypes.object.isRequired,
    proveedores: PropTypes.object.isRequired,
    operadores: PropTypes.object.isRequired,
    subcontratados: PropTypes.object.isRequired,
    transferencias: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    requestClientes: PropTypes.func.isRequired,
    requestProveedores: PropTypes.func.isRequired,
    requestOperadores: PropTypes.func.isRequired,
    invalidarRutas: PropTypes.func.isRequired,
    invalidarEstructuras: PropTypes.func.isRequired,
    requestRutas: PropTypes.func.isRequired,
    requestEstructuras: PropTypes.func.isRequired,
    requestOperadoresSubcontratados: PropTypes.func.isRequired,
    requestTransferirServicios: PropTypes.func.isRequired,
}

export default FormaTransferirServicios
