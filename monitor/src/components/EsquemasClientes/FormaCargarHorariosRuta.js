import moment from "moment";
import React from 'react'
import {Button, Form, Segment} from "semantic-ui-react";
import PropTypes from 'prop-types'

import BaseComponent from "../BaseComponent";

import {
    extraerOpcionesClientes,
    extraerOpcionesRutas,
} from "../../helpers";

class FormaCargarHorariosRuta extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            cliente: -1,
            ruta: -1,
            desde: moment().format("YYYY-MM-DD"),
            hasta: moment().endOf("year").format("YYYY-MM-DD"),
            received_date: null
        }
    }

    triggerClienteChange = (event, data) => {

        const {onInvalidarRutas, onRequestRutas} = this.props

        onInvalidarRutas()

        this.setState({
            ruta: -1
        })

        onRequestRutas([`id_cliente=${data.value}`, 'sort(+nombre)', 'activa=true'])

        this.onChangeValue(event, data)
    }

    triggerRutaChange = (event, data) => {
        this.onChangeValue(event, data)

        this.props.onRequestHorariosRuta(data.value)
    }

    onSubmit = (event) => {
        event.preventDefault()
        const {ruta, desde, hasta} = this.state

        this.props.onUpdateHorariosRuta(ruta, desde, hasta)
    }


    render() {
        const {clientes, rutas, horariosFetching, user} = this.props
        const {cliente, ruta, desde, hasta} = this.state
        const submitDisabled = (horariosFetching || ruta === -1)

        return (
            <div>
                <Segment>
                    <Form form={'formaCargarHorarios'} onSubmit={this.onSubmit}>

                            {
                                user.puedeProgramarServicios()
                                && <Form.Group widths={"equal"}>
                                    <Form.Input fluid name='desde' label='Desde' type='date' value={desde}
                                                onChange={this.onChangeValue}
                                    />

                                    <Form.Input fluid name='hasta' label='Hasta' type='date' value={hasta}
                                                onChange={this.onChangeValue}
                                    />
                                </Form.Group>
                            }

                        <Form.Group widths={"equal"}>
                            <Form.Select name='cliente' label='Cliente' fluid search selection
                                         loading={clientes.fetching}
                                         options={clientes.all.map(extraerOpcionesClientes)} value={cliente}
                                         onChange={this.triggerClienteChange}
                            />

                            <Form.Select name='ruta' label='Ruta' fluid search selection loading={rutas.fetching}
                                         options={rutas.all.map(extraerOpcionesRutas)} value={ruta}
                                         onChange={this.triggerRutaChange}
                            />
                        </Form.Group>

                        {
                            user.puedeProgramarServicios() &&
                            <Form.Field>
                                <label>&nbsp;</label>
                                <Button color={"orange"} type="submit" disabled={submitDisabled}
                                        loading={horariosFetching}>Actualizar horarios</Button>
                            </Form.Field>
                        }

                    </Form>
                </Segment>
            </div>
        )
    }
}

FormaCargarHorariosRuta.propTypes = {
    clientes: PropTypes.object.isRequired,
    rutas: PropTypes.object.isRequired,
    horariosFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    onInvalidarRutas: PropTypes.func.isRequired,
    onRequestRutas: PropTypes.func.isRequired,
    onUpdateHorariosRuta: PropTypes.func.isRequired,
}

export default FormaCargarHorariosRuta
