import moment from 'moment';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Grid, Button, Dropdown, Form, Divider} from 'semantic-ui-react';
import PropTypes from 'prop-types'

import '../../styles/FiltrosBusquedaSanitizaciones.css';

import {requestClientes} from '../../actions/clientes';
import {requestUnidades} from '../../actions/unidades';
import {requestSanitizaciones, invalidarSanitizaciones} from '../../actions/sanitizaciones';

import {
    extraerOpcionesClientes,
    extraerOpcionesUnidades,
    extraerParametrosBusqueda
} from '../../helpers';

class FiltrosBusquedaSanitizaciones extends Component {

    state = {
        desde: moment().startOf('week').format('YYYY-MM-DD'),
        hasta: moment().endOf('week').format('YYYY-MM-DD'),
        cliente_id: -1,
        unidad_id: -1
    }

    paramsMap = {
        desde: "fecha=ge",
        hasta: "fecha=le",
        cliente_id: 'cliente_id',
        unidad_id: 'unidad_id'
    }

    // Falta loading animation & Mensaje de no encontrados

    componentDidMount() {
        this.props.requestClientes(['activo=true', 'id_categoria=1', 'or(id=5)', 'sort(+nombre_empresa)'])
        this.props.requestUnidades(['activa=true'])
        this.props.requestSanitizaciones(extraerParametrosBusqueda(this.state, this.paramsMap))
    }

    onChangeCliente = (event, data) => {
        this.setState({cliente_id: data.value})
    }

    onChangeUnidad = (event, data) => {
        this.setState({unidad_id: data.value})
    }

    onChangeFechaInicial = (event, data) => {
        this.setState({desde: data.value})
    }

    onChangeFechaFinal = (event, data) => {
        this.setState({hasta: data.value})
    }


    // Al limpiar todavia tarda dos click en hacer el cambio de estado
    onLimpiarBusqueda = () => {
        this.setState({
            desde: moment().startOf('week').format('YYYY-MM-DD'),
            hasta: moment().endOf('week').format('YYYY-MM-DD'),
            cliente_id: -1,
            unidad_id: -1
        })
        this.props.invalidarSanitizaciones()
    }

    onSubmit = () => {

        extraerParametrosBusqueda(this.state, this.paramsMap)
        this.props.requestSanitizaciones(extraerParametrosBusqueda(this.state, this.paramsMap))
    }

    render() {
        const {hasta, desde, cliente_id, unidad_id} = this.state
        return (

            <Container>
                <h3 style={{textAlign: "left"}}>Sanitizaciones</h3>
                <Divider hidden/>
                <Grid className="FiltrosContainer">
                    <Grid.Column width={6} textAlign='center'>
                        <Grid.Row>
                            <h4>Cliente</h4>
                        </Grid.Row>
                        <Grid.Row className="botonMargen">
                            <Dropdown
                                placeholder='Cliente'
                                fluid
                                value={cliente_id}
                                onChange={this.onChangeCliente}
                                selection
                                options={this.props.clientes.all.map(extraerOpcionesClientes)}
                            />
                        </Grid.Row>
                        <Grid.Row>
                            <h4>Unidad</h4>
                        </Grid.Row>
                        <Grid.Row className="botonMargen">
                            <Dropdown
                                placeholder='Unidad'
                                fluid
                                value={unidad_id}
                                onChange={this.onChangeUnidad}
                                selection
                                options={this.props.unidades.all.map(extraerOpcionesUnidades)}
                            />
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='center'>
                        <Grid.Row>
                            <h4>Desde</h4>
                        </Grid.Row>
                        <Grid.Row className="botonMargen">
                            <Form.Input
                                value={desde}
                                onChange={this.onChangeFechaInicial}
                                type='date'
                                name='desde'

                            />
                        </Grid.Row>
                        <Grid.Row>
                            <h4>Hasta</h4>
                        </Grid.Row>
                        <Grid.Row className="botonMargen">
                            <Form.Input
                                value={hasta}
                                onChange={this.onChangeFechaFinal}
                                type='date'
                                name='hasta'
                            />
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={4} verticalAlign='bottom' textAlign='center'>
                        <Grid.Row>
                            <Button color={"orange"} type='submit' onClick={this.onSubmit}>Buscar</Button>
                            <Button type='submit' onClick={this.onLimpiarBusqueda}>Limpiar</Button>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
                <Divider hidden/>
            </Container>
        )
    }
}

FiltrosBusquedaSanitizaciones.propTypes = {
    clientes: PropTypes.object.isRequired,
    unidades: PropTypes.object.isRequired,
    invalidarSanitizaciones: PropTypes.func.isRequired,
    requestClientes: PropTypes.func.isRequired,
    requestUnidades: PropTypes.func.isRequired,
    requestSanitizaciones: PropTypes.func.isRequired,
}

const mapStateToProps = ({clientes, unidades, sanitizaciones}) => {
    return {clientes, unidades, sanitizaciones}
}

const mapActionToProps = {
    requestClientes,
    requestUnidades,
    requestSanitizaciones,
    invalidarSanitizaciones
}

export default connect(mapStateToProps, mapActionToProps)(FiltrosBusquedaSanitizaciones);