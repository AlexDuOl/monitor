import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'

import {Segment, Form, Button} from 'semantic-ui-react'

import BaseComponent from "../BaseComponent";

import {
    extraerParametrosBusqueda,
    extraerOpcionesProveedores,
    extraerOpcionesOperadores,
    extraerOpcionesClientes,
    extraerOpcionesRutas,
    extraerOpcionesEstructuras
} from '../../helpers'

class FormaBuscarBitacoras extends BaseComponent {

    constructor(props) {
        super(props);

        this.initialValues = {
            desde: moment().day(3 - 7).format('YYYY-MM-DD'),
            hasta: moment().day(2).format('YYYY-MM-DD'),
            proveedor: 1,
            cliente: -1,
            ruta: -1,
            estructura: -1,
            operador: -1,
            unidad: "",
        };

        this.state = {
            ...this.initialValues
        };
    }

    onSubmit = (event) => {
        event.preventDefault();

        const paramsMap = {
            desde: 'fecha=ge',
            hasta: 'fecha=le',
            operador: 'id_operador',
            cliente: 'cliente_id',
            ruta: 'id_ruta',
            estructura: 'id_estructura',
            proveedor: 'id_proveedor',
            unidad: 'id_unidad',
        };

        const params = extraerParametrosBusqueda(this.state, paramsMap);

        params.push('sort(+hora_arranque)');

        this.props.requestBitacoras(params)
    }

    onReset = (e) => {
        e.preventDefault(e)
        this.setState({
            ...this.initialValues
        })
    }

    triggerChangeCliente = (event, data) => {
        this.onChangeValue(event, data);

        const {invalidarRutas, invalidarEstructuras, requestRutas} = this.props;

        invalidarRutas();
        invalidarEstructuras();

        this.setState({
            ruta: -1,
            estructura: -1
        });

        requestRutas([`id_cliente=${data.value}`, 'sort(+nombre)', 'activa=true'])
    }

    triggerChangeRuta = (event, data) => {
        this.onChangeValue(event, data);

        this.props.invalidarEstructuras();

        this.setState({
            estructura: -1
        });

        this.props.requestEstructuras([`id_ruta=${data.value}`, 'sort(+nombre)', 'activa=true'])
    }

    triggerChangeProveedor = (event, data) => {
        this.onChangeValue(event, data);

        this.setState({
            operador: -1
        });

        if (this.state.proveedor !== 1) {
            this.props.requestOperadoresSubcontratados(['activo=true', 'sort(+nombre)', `id_proveedor=${data.value}`])
        }
    }

    render() {
        const {
            desde,
            hasta,
            proveedor,
            cliente,
            ruta,
            estructura,
            operador,
            unidad,
        } = this.state;

        const {
            clientes,
            rutas,
            estructuras,
            proveedores,
            operadores,
            subcontratados,
            bitacoras,
        } = this.props;

        const opcionesOperadores = (proveedor === 1) ? operadores : subcontratados;

        return (
            <Segment>
                <Form form={'formaBuscarBitacoras'} onSubmit={this.onSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input name='desde' label='Desde' type='date' value={desde} onChange={this.onChangeValue}/>
                        <Form.Input name='hasta' label='Hasta' type='date' value={hasta} onChange={this.onChangeValue}/>
                        <Form.Select name='proveedor' label='Proveedor' fluid search selection
                                     loading={proveedores.fetching}
                                     options={proveedores.all.map(extraerOpcionesProveedores)} value={proveedor}
                                     onChange={this.triggerChangeProveedor}/>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Select name='cliente' label='Cliente' fluid search selection loading={clientes.fetching}
                                     options={clientes.all.map(extraerOpcionesClientes)} value={cliente}
                                     onChange={this.triggerChangeCliente}/>

                        <Form.Select name='ruta' label='Ruta' fluid search selection loading={rutas.fetching}
                                     options={rutas.all.map(extraerOpcionesRutas)} value={ruta}
                                     onChange={this.triggerChangeRuta}/>

                        <Form.Select name='estructura' label='Estructura' fluid search selection
                                     loading={estructuras.fetching}
                                     options={estructuras.all.map(extraerOpcionesEstructuras)} value={estructura}
                                     onChange={this.onChangeValue}/>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Select name='operador' label='Operador' fluid search selection
                                     loading={opcionesOperadores.fetching}
                                     options={opcionesOperadores.all.map(extraerOpcionesOperadores)} value={operador}
                                     onChange={this.onChangeValue}/>

                        <Form.Input name='unidad' label='Unidad' type='number' step='1' fluid value={unidad}
                                    onChange={this.onChangeValue}/>

                        <Form.Field>
                            <label>&nbsp;</label>
                            <Button.Group widths={2}>
                                <Button color={"orange"} fluid disabled={false}
                                        loading={bitacoras.fetching}>Buscar</Button>
                                <Button fluid onClick={this.onReset}>Limpiar</Button>
                            </Button.Group>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

FormaBuscarBitacoras.propTypes = {
    clientes: PropTypes.object.isRequired,
    rutas: PropTypes.object.isRequired,
    estructuras: PropTypes.object.isRequired,
    proveedores: PropTypes.object.isRequired,
    operadores: PropTypes.object.isRequired,
    subcontratados: PropTypes.object.isRequired,
    bitacoras: PropTypes.object.isRequired,
    invalidarRutas: PropTypes.func.isRequired,
    invalidarEstructuras: PropTypes.func.isRequired,
    requestRutas: PropTypes.func.isRequired,
    requestBitacoras: PropTypes.func.isRequired,
    requestEstructuras: PropTypes.func.isRequired,
    requestOperadoresSubcontratados: PropTypes.func.isRequired,
}

export default FormaBuscarBitacoras
