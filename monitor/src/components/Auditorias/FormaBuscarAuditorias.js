import React from 'react'
import {Button, Form, Segment} from "semantic-ui-react";
import moment from "moment";
import PropTypes from "prop-types";
import BaseComponent from "../BaseComponent";

class FormaBuscarAuditorias extends BaseComponent {

    constructor(props) {
        super(props);

        this.initialValues = {
            desde: moment().day(3 - 7).format('YYYY-MM-DD' + '%' + 'hh:mm:ss'),
            hasta: moment().day(2).format('YYYY-MM-DD' + '%' + 'hh:mm:ss'),
            fecha: "",
        }

        this.state = {
            ...this.initialValues
        }
    }

    onChangeValue = (event, data) => {
        if (data) {
            this.setState({[data.name]: data.value})
        } else {
            this.setState({[event.target.name]: event.target.value})
        }
    }

    onSubmit = () => {
        const params = []

        if (this.state.desde) {
            params.push(`fecha_captura=ge=${this.state.desde} 00:00:00`)
        }

        if (this.state.hasta) {
            params.push(`fecha_captura=le=${this.state.hasta} 23:59:00`)
        }

        this.props.onRequestAuditorias(params)
    }

    startCreateAuditoria = (e) => {
        e.preventDefault(e)
        this.props.startCreateAuditoria()
    }

    render() {
        return (
            <Segment container="true">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group widths='equal' inline>
                        <Form.Input fluid="true" label='Desde' name={'desde'} type='date' value={this.state.desde}
                                    onChange={this.onChangeValue}/>
                        <Form.Input fluid="true" label='Hasta' name={'hasta'} type='date' value={this.state.hasta}
                                    onChange={this.onChangeValue}/>
                    </Form.Group>
                    <Form.Group unstackable fluid="true">
                        <Button fluid="true" color='orange' loading={this.props.auditorias.fetching}>Buscar auditorías</Button>
                        <Button fluid="true" onClick={this.startCreateAuditoria}>Nueva auditoría</Button>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }

}

FormaBuscarAuditorias.propTypes = {
    auditorias: PropTypes.object.isRequired,
    onRequestAuditoria: PropTypes.func.isRequired,
    startCreateAuditoria: PropTypes.func
}

export default FormaBuscarAuditorias