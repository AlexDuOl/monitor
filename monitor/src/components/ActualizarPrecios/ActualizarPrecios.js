import React from 'react'
import PropTypes from 'prop-types'

import {
    Form,
    Container,
    Message,
    Segment,
    Item,
    Label,
    Icon
} from 'semantic-ui-react'

import BaseComponent from "../BaseComponent";
import FormaCargarHorariosRuta from "./FormaCargarPrecios";

class ActualizarPrecios extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        this.props.requestClientes(['activo=true', 'id_categoria=1', 'or(id=5)', 'sort(+nombre_empresa)'])
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.estructuras.received_date) {
            const horarios = nextProps.estructuras.all
            const acc_horarios = {}

            horarios.forEach((item) => {
                acc_horarios[`${item.id}_0`] = item.pagoOperador ? item.pagoOperador : 0
                acc_horarios[`${item.id}_1`] = item.pagoAliado ? item.pagoAliado : 0
                acc_horarios[`${item.id}_2`] = item.precioCliente ? item.precioCliente : 0
            })

            this.setState(acc_horarios)
        }
    }

    getFields = () => {
        const {estructuras} = this.props

        return estructuras.all.map(function (item, idx) {
            return (
                <Form.Group inline key={idx} widths={12}>
                        <Label color="orange" ribbon='left'>{item.turno} - {item.tipo}</Label> <Icon name='bus' />   
                        <Form.Input fluid type={'number'} label={"Operador"} step={"0.1"} name={`${item.id}_0`}
                                    value={this.state[`${item.id}_0`]} onChange={this.onChangeValue}/>
                        <Form.Input fluid type={'number'} label={"Aliado"} step={"0.1"} name={`${item.id}_1`}
                                    value={this.state[`${item.id}_1`]} onChange={this.onChangeValue}/>
                        <Form.Input fluid type={'number'} label={"Cliente"} step={"0.1"} name={`${item.id}_2`}
                                        value={this.state[`${item.id}_2`]} onChange={this.onChangeValue}/>
                </Form.Group>
            )
        }, this)
    }

    updatePrecios = (ruta, desde, hasta) => {
        const precios = {}

        Object.keys(this.state).forEach(function (key, idx) {
            const idPrecio = key.split('_')[0]

            if (idPrecio in precios) {
                precios[idPrecio].push(parseFloat(this.state[key]))
            } else {
                precios[idPrecio] = []
                precios[idPrecio].push(parseFloat(this.state[key]))
            }
        }, this)

        const params = {
            'id_ruta': ruta,
            'desde': desde,
            'hasta': hasta,
            'horarios': precios
        }

        this.props.requestPreciosUpdate(params)

        setTimeout(() => {
            this.props.requestEstructuras([`id_ruta=${ruta}`, 'activa=true'])
        }, 500)
    }

    render() {
        const {clientes, rutas, estructuras: {all, fecthing}, horarios: {precios}, login} = this.props
        const {invalidarRutas, requestRutas, requestEstructuras, invalidarEstructuras} = this.props

        return (
            <Container fluid style={{padding: "10px"}}>
                <h3 style={{textAlign: "left"}}>Precios</h3>

                    <FormaCargarHorariosRuta
                        clientes={clientes}
                        rutas={rutas}
                        login={login}
                        estructurasFetching={fecthing}
                        horariosFetching={precios.fetching}
                        onInvalidarRutas={invalidarRutas}
                        onRequestRutas={requestRutas}
                        onRequestEstructuras={requestEstructuras}
                        onUpdatePrecios={this.updatePrecios}
                        onInvalidarEstructuras={invalidarEstructuras}
                    />

                {
                    precios.received_date &&
                    <Message positive>
                        <Message.Header>Precios actualizados, se realizaron los siguientes cambios:</Message.Header>
                        <Item.Group>
                            {
                                Object.keys(precios.all).map(function (key) {
                                    return <Item>{key.replace('_', ' ')} - {precios.all[key]} bitácoras</Item>
                                })
                            }
                        </Item.Group>
                    </Message>
                }

                {
                    all.length &&
                    <Segment container="true">
                        <Form widths="equal">
                            {this.getFields()}
                        </Form>
                    </Segment>
                }
            </Container>
        )
    }
}

ActualizarPrecios.propTypes = {
    estructuras: PropTypes.object.isRequired,
    clientes: PropTypes.object.isRequired,
    rutas: PropTypes.object.isRequired,
    horarios: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    requestClientes: PropTypes.func.isRequired,
    requestPreciosUpdate: PropTypes.func.isRequired,
    requestEstructuras: PropTypes.func.isRequired,
    invalidarEstructuras: PropTypes.func.isRequired,
    invalidarRutas: PropTypes.func.isRequired,
    requestRutas: PropTypes.func.isRequired,
}

export default ActualizarPrecios
