import React from 'react'
import {Button, Form, Segment} from "semantic-ui-react";
import moment from "moment";
import PropTypes from "prop-types";
import _ from 'lodash'
import BaseComponent from "../BaseComponent";
import {extraerParametrosBusqueda} from "../../helpers";
import {endCreateRevisiones} from "../../actions/revisiones";

class FormaBuscarRevisiones extends BaseComponent {

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
            params.push(`fecha=ge=${this.state.desde} 00:00:00`)
        }

        if (this.state.hasta) {
            params.push(`fecha=le=${this.state.hasta} 23:59:00`)
        }
        this.props.onRequestRevisiones(params)
    }
    
    /*onReset = (e) => {
        e.preventDefault(e)

        this.setState({
            ...this.initialValues
        })
    }*/

    startCreateRevision = (e) => {
        e.preventDefault(e)
        this.props.startCreateRevisiones()
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
                        <Button fluid="true" color='orange' loading={this.props.revisiones.fetching}>Buscar
                            revisión</Button>
                        <Button fluid="true" onClick={this.startCreateRevision}>Nueva revisión</Button>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }

}

FormaBuscarRevisiones.propTypes = {
    revisiones: PropTypes.object.isRequired,
    onRequestRevisiones: PropTypes.func.isRequired,
    startCreateRevisiones: PropTypes.func
}

export default FormaBuscarRevisiones