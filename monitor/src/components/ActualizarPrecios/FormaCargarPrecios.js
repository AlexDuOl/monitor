import moment from "moment";
import React from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Segment} from "semantic-ui-react";

import BaseComponent from "../BaseComponent";

import {
    extraerOpcionesClientes,
    extraerOpcionesRutas,
} from "../../helpers";

class FormaCargarPrecios extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            cliente: -1,
            ruta: -1,
            desde: moment().startOf("week").format("YYYY-MM-DD"),
            hasta: moment().endOf("month").format("YYYY-MM-DD")
        }
    }

    triggerClienteChange = (event, data) => {

        const {onInvalidarRutas, onRequestRutas, onInvalidarEstructuras} = this.props

        onInvalidarRutas()

        this.setState({
            ruta: -1
        })

        onInvalidarEstructuras()
        onRequestRutas([`id_cliente=${data.value}`, 'sort(+nombre)', 'activa=true'])

        this.onChangeValue(event, data)
    }

    triggerRutaChange = (event, data) => {
        this.onChangeValue(event, data)

        this.props.onRequestEstructuras([`id_ruta=${data.value}`, 'activa=true'])
    }

    onSubmit = (event) => {
        event.preventDefault()
        const {ruta, desde, hasta} = this.state

        this.props.onUpdatePrecios(ruta, desde, hasta)
    }

    render() {
        const {clientes, rutas, estructurasFetching, horariosFetching, login: {user}} = this.props
        const {cliente, ruta, desde, hasta} = this.state
        const submitDisabled = estructurasFetching || horariosFetching || ruta === -1
        const isFetching = estructurasFetching || horariosFetching

        return (
            <Segment container="true">
                <Form form={'formaCargarHorarios'} onSubmit={this.onSubmit}>
                    {
                        user.puedeCambiarPrecios() && (
                            <Form.Group widths='equal'>
                                <Form.Input fluid name='desde' label='Desde' type='date' value={desde}
                                            onChange={this.onChangeValue}/>
                                <Form.Input fluid name='hasta' label='Hasta' type='date' value={hasta}
                                            onChange={this.onChangeValue}/>
                            </Form.Group>
                        )
                    }

                    <Form.Group widths={2}>
                        <Form.Select name='cliente' label='Cliente' fluid search selection
                                        loading={clientes.fetching}
                                        style={{margin: "0 0 1em"}}
                                        options={clientes.all.map(extraerOpcionesClientes)} value={cliente}
                                        onChange={this.triggerClienteChange}/>

                        <Form.Select name='ruta' label='Ruta' fluid search selection loading={rutas.fetching}
                                        style={{margin: "0 0 1em"}}
                                        options={rutas.all.map(extraerOpcionesRutas)} value={ruta}
                                        onChange={this.triggerRutaChange}/>
                    </Form.Group>

                    {
                        user.puedeCambiarPrecios() &&
                            <Form.Group unstackable fluid="true" widths='equal'>
                                <Button color={"orange"} type="submit" disabled={submitDisabled}
                                        loading={isFetching}>Actualizar precios</Button>
                            </Form.Group>
                    }
                </Form>
            </Segment>
        )
    }
}

FormaCargarPrecios.propTypes = {
    clientes: PropTypes.object.isRequired,
    rutas: PropTypes.object.isRequired,
    //estructurasFetching: PropTypes.bool,
    horariosFetching: PropTypes.bool.isRequired,
    login: PropTypes.object.isRequired,
    onInvalidarRutas: PropTypes.func.isRequired,
    onRequestRutas: PropTypes.func.isRequired,
    onInvalidarEstructuras: PropTypes.func.isRequired,
    onRequestEstructuras: PropTypes.func.isRequired,
    onUpdatePrecios: PropTypes.func.isRequired,
}

export default FormaCargarPrecios
