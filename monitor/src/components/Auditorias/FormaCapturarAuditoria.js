import React from 'react'
import moment from "moment";
import {
    Button,
    Form,
    Grid,
    Header, Radio,
    Segment,
    TextArea
} from "semantic-ui-react";

import BaseComponent from "../BaseComponent";

import PropTypes from "prop-types";
import {
    extraerOpcionesOperadores,
    extraerOpcionesProveedores,
    extraerOpcionesUnidades,
} from "../../helpers";

class FormaCapturarAuditoria extends BaseComponent {

    constructor(props) {
        super(props);

        this.initialValues = { // LLEVA LOS VALORES DE LOS INPUS
            fecha: moment().format('YYYY-MM-DD'),
            usuario: this.props.login.user.id,
            aseoOperador: 1,
            cortePelo: 1,
            limpiezaExteriorUnidad: 1,
            limpiezaInteriorUnidad: 1,
            limpiezaUniforme: 1,
            usoUniforme: 1,
            comentarios: "",
            operador: 0,
            unidad: 0,
            proveedor: "",
        }

        this.state = {
            ...this.initialValues
        }
    }

    onChangeValue = (event, data) => {
        if (data) {
            switch (data.type) {
                case "checkbox":
                    this.setState({[data.name]: data.checked}) //Obtenemos el valor del checkbox seleccionado
                    return
                default:
                    this.setState({[data.name]: data.value}) //Obtenemos el valor seleccionado en el select
            }
        } else {
            switch (event.target.type) {
                case "checkbox":
                    this.setState({[event.target.name]: event.target.checked})
                    return
                default:
                    this.setState({[event.target.name]: event.target.value})
            }
        }
    }

    onSubmit = () => {
        const {
            fecha, usuario, operador, proveedor, aseoOperador, cortePelo, limpiezaExteriorUnidad,limpiezaInteriorUnidad, 
            limpiezaUniforme, usoUniforme, comentarios, unidad,
        } = this.state

        const paramsAliado = {
            fecha_captura: fecha,
            usuario: usuario,
            proveedor: proveedor,
            operador: operador,
            calificacion_aseo_operador: aseoOperador,
            calificacion_corte_pelo: cortePelo,
            calificacion_limpieza_exterior_unidad: limpiezaExteriorUnidad,
            calificacion_limpieza_interior_unidad: limpiezaInteriorUnidad,
            calificacion_limpieza_uniforme: limpiezaUniforme,
            calificacion_uso_uniforme: usoUniforme,
            comentarios: comentarios,
        }

        const paramsSuma = {
            fecha_captura: fecha,
            usuario: usuario,
            proveedor: proveedor,
            operador: operador,
            unidad: unidad,
            calificacion_aseo_operador: aseoOperador,
            calificacion_corte_pelo: cortePelo,
            calificacion_limpieza_exterior_unidad: limpiezaExteriorUnidad,
            calificacion_limpieza_interior_unidad: limpiezaInteriorUnidad,
            calificacion_limpieza_uniforme: limpiezaUniforme,
            calificacion_uso_uniforme: usoUniforme,
            comentarios: comentarios,
        };

        let payload = {}

        if (proveedor === 1) {
            payload = {
                ...paramsSuma
            }
        } else {

            payload = {
                ...paramsAliado
            }
        }
        this.props.onRequestCreateAuditoria(payload)
    }

    onReset = () => {
        //e.preventDefault(e)

        this.setState({
            ...this.initialValues
        })
    }

    render() {

        const {
            login: {user},
            operadores,
            proveedores,
            unidades,
        } = this.props

       const valueSelected = this.state.proveedor
        let selectOperador

        if (valueSelected) {
            if (valueSelected === 1) {
                selectOperador =
                    <Form.Group widths='equal'>
                        <Form.Select
                            fluid search selection
                            name='operador'
                            label='Operador'
                            placeholder='Selecciona un operador'
                            loading={operadores.fetching}
                            value={this.state.operadores}
                            options={operadores.all.map(extraerOpcionesOperadores)}
                            onChange={this.onChangeValue}
                            required
                        />

                        <Form.Select
                            style={{margin: "0 0 1em"}}
                            fluid search selection
                            name='unidad'
                            label='Unidad'
                            placeholder='Selecciona una unidades'
                            loading={unidades.fetching}
                            value={this.state.unidades}
                            options={unidades.all.map(extraerOpcionesUnidades)}
                            onChange={this.onChangeValue}
                            required
                        />
                    </Form.Group>
            } else {
                selectOperador =
                    <Form.Group widths='equal'>
                        <Form.Select
                            fluid search selection
                            name='operador'
                            label='Operador'
                            placeholder='Selecciona un operador'
                            loading={operadores.fetching}
                            value={this.state.operadores}
                            options={operadores.all.map(extraerOpcionesOperadores)}
                            onChange={this.onChangeValue}
                            required
                        />

                    </Form.Group>
            }
        }

        return (
            <Segment container="true">
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Header as='h3'>Formato de Auditoria</Header>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Header as='h5'>Auditor: &nbsp; {user.nombre}</Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Form onSubmit={this.onSubmit} name="formulario" method="post"
                      style={{textAlign: "left", fontWeight: 200}}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Fecha' name={'Fecha'} type='date' value={this.state.fecha}/>
                        <Form.Select
                            fluid search selection
                            name='proveedor'
                            label='Proveedor'
                            placeholder='Selecciona un proveedor'
                            loading={proveedores.fetching}
                            value={this.state.proveedor}
                            options={proveedores.all.map(extraerOpcionesProveedores)}
                            onChange={this.onChangeValue}
                            required
                        />
                    </Form.Group>

                    {selectOperador}

                    <Form.Group widths='equal'>
                        <Form.Field as='h4'>Limpieza uniforme</Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Malo' name='limpiezaUniforme' value={1}
                                    checked={this.state.limpiezaUniforme === 1}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Regular' name='limpiezaUniforme' value={2}
                                    checked={this.state.limpiezaUniforme === 2}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Bueno' name='limpiezaUniforme' value={3}
                                    checked={this.state.limpiezaUniforme === 3}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field as='h4'>Uso uniforme</Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Malo' name='usoUniforme' value={1}
                                    checked={this.state.usoUniforme === 1}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Regular' name='usoUniforme' value={2}
                                    checked={this.state.usoUniforme === 2}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Bueno' name='usoUniforme' value={3}
                                    checked={this.state.usoUniforme === 3}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field as='h4'>Aseo operador</Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Malo' name='aseoOperador' value={1}
                                    checked={this.state.aseoOperador === 1}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Regular' name='aseoOperador' value={2}
                                    checked={this.state.aseoOperador === 2}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Bueno' name='aseoOperador' value={3}
                                    checked={this.state.aseoOperador === 3}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field as='h4'>Corte de pelo</Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Malo' name='cortePelo' value={1}
                                    checked={this.state.cortePelo === 1}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Regular' name='cortePelo' value={2}
                                    checked={this.state.cortePelo === 2}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Bueno' name='cortePelo' value={3}
                                    checked={this.state.cortePelo === 3}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field as='h4'>Limpieza interior unidad</Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Malo' name='limpiezaInteriorUnidad' value={1}
                                    checked={this.state.limpiezaInteriorUnidad === 1}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Regular' name='limpiezaInteriorUnidad' value={2}
                                    checked={this.state.limpiezaInteriorUnidad === 2}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Bueno' name='limpiezaInteriorUnidad' value={3}
                                    checked={this.state.limpiezaInteriorUnidad === 3}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field as='h4'>Limpieza exterior unidad</Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Malo' name='limpiezaExteriorUnidad' value={1}
                                    checked={this.state.limpiezaExteriorUnidad === 1}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Regular' name='limpiezaExteriorUnidad' value={2}
                                    checked={this.state.limpiezaExteriorUnidad === 2}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                        <Form.Field style={{fontWeight: 200}}>
                            <Radio label='Bueno' name='limpiezaExteriorUnidad' value={3}
                                    checked={this.state.limpiezaExteriorUnidad === 3}
                                    onChange={this.onChangeValue}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field>
                            <TextArea id="comentarios" name="comentarios"
                                        value={this.state.comentarios}
                                        placeholder='Comentarios'
                                        style={{minHeight: 150, maxHeight: 300}}
                                        onChange={this.onChangeValue}/>
                        </Form.Field>
                    </Form.Group>

                    <Form.Group unstackable fluid="true">
                        <Button id="btn-formulario" type='submit' color='orange' fluid>Guardar</Button>
                        <Button onClick={this.onReset} fluid>Cerrar</Button>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

FormaCapturarAuditoria.propTypes = {
    auditorias: PropTypes.object,
}

export default FormaCapturarAuditoria