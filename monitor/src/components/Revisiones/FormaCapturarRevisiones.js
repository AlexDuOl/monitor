import React from 'react'
import moment from "moment";
import {
    Button,
    Form,
    Grid,
    Header, 
    Radio,
    Segment,
    Table,
    TextArea
} from "semantic-ui-react";

import BaseComponent from "../BaseComponent";

import PropTypes from "prop-types";
import {
    extraerOpcionesOperadores,
    extraerOpcionesProveedores,
    extraerOpcionesRutas,
    extraerOpcionesUnidades,
} from "../../helpers";

class FormaCapturarRevisiones extends BaseComponent {

    constructor(props) {
        super(props);

        this.initialValues = { // LLEVA LOS VALORES DE LOS INPUS
            fecha: moment().format('YYYY-MM-DD'),
            usuario: this.props.login.user.id,
            proveedor: 0,
            operador: 0,
            rutas: 0,
            unidad: 0,
            kilometraje: 0,
            operador_subcontratado: 1,
            kit_limpieza: false,
            golpes: false,
            rayones: false,
            llenado_combustible: false,
            extintor: false,
            kit_auxilio: false,
            uniforme: false,
            tarjeta_circulacion: false,
            licencia_vigente: false,
            poliza_seguros: false,
            nota: '',
            limpieza_exterior: 1,
            limpieza_interior: 1,
            llantas: 0,
            nota_mantenimiento: '',
            presion_llantas: '',
            estado_llantas: 1,
            latitud: 0.0,
            longitud: 0.0,
            faros: false,
            multas: false,
            firma_recibos: false,
            reporte_base: false,
            disponibilidad_celular: false,
            queja_clientes: false,
            dinero_efectivo: false,
            kardex_mantenimiento: false,
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
            fecha, usuario, proveedor, operador, rutas, unidad, kilometraje,
            kit_limpieza, golpes, rayones, llenado_combustible, extintor, kit_auxilio, uniforme,
            tarjeta_circulacion, licencia_vigente, poliza_seguros, nota, limpieza_exterior,
            limpieza_interior, llantas, estado_llantas, nota_mantenimiento,
        } = this.state

        const paramsAliado = {
            fecha: fecha,
            usuario: usuario,
            proveedor: proveedor,
            ruta: rutas,
            kilometraje: kilometraje,
            kit_limpieza: kit_limpieza,
            golpes: golpes,
            rayones: rayones,
            llenado_combustible: llenado_combustible,
            extintor: extintor,
            kit_auxilio: kit_auxilio,
            uniforme: uniforme,
            tarjeta_circulacion: tarjeta_circulacion,
            licencia_vigente: licencia_vigente,
            poliza_seguros: poliza_seguros,
            nota: nota,
            limpieza_exterior: limpieza_exterior,
            limpieza_interior: limpieza_interior,
            llantas: llantas,
            nota_mantenimiento: nota_mantenimiento,
            estado_llantas: estado_llantas,
            latitud: 0.0,
            longitud: 0.0,
            faros: false,
            multas: false,
            firma_recibos: false,
            reporte_base: false,
            disponibilidad_celular: false,
            queja_clientes: false,
            dinero_efectivo: false,
            kardex_mantenimiento: false
        }

        const paramsSuma = {
            fecha: fecha,
            usuario: usuario,
            proveedor: proveedor,
            operador_suma: operador,
            ruta: rutas,
            unidad: unidad,
            kilometraje: kilometraje,
            kit_limpieza: kit_limpieza,
            golpes: golpes,
            rayones: rayones,
            llenado_combustible: llenado_combustible,
            extintor: extintor,
            kit_auxilio: kit_auxilio,
            uniforme: uniforme,
            tarjeta_circulacion: tarjeta_circulacion,
            licencia_vigente: licencia_vigente,
            poliza_seguros: poliza_seguros,
            nota: nota,
            limpieza_exterior: limpieza_exterior,
            limpieza_interior: limpieza_interior,
            llantas: llantas,
            nota_mantenimiento: nota_mantenimiento,
            estado_llantas: estado_llantas,
            latitud: 0.0,
            longitud: 0.0,
            faros: false,
            multas: false,
            firma_recibos: false,
            reporte_base: false,
            disponibilidad_celular: false,
            queja_clientes: false,
            dinero_efectivo: false,
            kardex_mantenimiento: false
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

        this.props.onRequestCreateRevisiones(payload)
    }

    onReset = (e) => {
        e.preventDefault()

        this.setState({
            ...this.initialValues
        })

        this.props.endCreateRevisiones()
    }

    render() {

        const {
            login: {user},
            operadores,
            proveedores,
            rutas,
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

                        <Form.Select
                            style={{margin: "0 0 1em"}}
                            fluid search selection
                            name='rutas'
                            label='Rutas'
                            placeholder='Selecciona una ruta'
                            loading={rutas.fetching}
                            value={this.state.rutas}
                            options={rutas.all.map(extraerOpcionesRutas)}
                            onChange={this.onChangeValue}
                            required
                        />
                        <Form.Input id="kilometraje" name="kilometraje" fluid type="number"
                                    label='Kilometraje' placeholder='Ingresa el kilometraje'
                                    value={this.state.kilometraje} required autoComplete="off"
                                    onChange={this.onChangeValue}/>
                    </Form.Group>
            } else {
                selectOperador =
                    <Form.Group widths='equal'>
                        <Form.Select
                            style={{margin: "0 0 1em"}}
                            fluid search selection
                            name='rutas'
                            label='Rutas'
                            placeholder='Selecciona una ruta'
                            loading={rutas.fetching}
                            value={this.state.rutas}
                            options={rutas.all.map(extraerOpcionesRutas)}
                            onChange={this.onChangeValue}
                            required
                        />

                        <Form.Input id="kilometraje" name="kilometraje" fluid type="number"
                                    label='Kilometraje' placeholder='Ingresa el kilometraje'
                                    value={this.state.kilometraje} autoComplete="off"
                                    onChange={this.onChangeValue} required/>

                    </Form.Group>
            }
        }

        return (
            <Segment container="true">
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Header as='h3'>Formato de revisión</Header>
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

                    <Grid padded>
                        <Grid.Column mobile={16} tablet={16} computer={8}>
                            <Table>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Form.Field widths='equal'>
                                                <Form.Group widths='equal'
                                                            style={{flexDirection: "column", fontWeight: 200}}>
                                                    <Form.Checkbox name='llantas'
                                                                   label='Llanta de refacción, gato, cruceta'
                                                                   checked={this.state.llantas}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                    <Form.Checkbox name='kit_limpieza' label='Kit de limpieza'
                                                                   checked={this.state.kit_limpieza}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                    <Form.Checkbox name='golpes' label='Golpes'
                                                                   checked={this.state.golpes}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                    <Form.Checkbox name='rayones' label='Rayones'
                                                                   checked={this.state.rayones}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                    <Form.Checkbox name='llenado_combustible'
                                                                   label='Gasolina 1/2 tanque'
                                                                   checked={this.state.llenado_combustible}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                    <Form.Checkbox name='extintor' label='Extintor'
                                                                   checked={this.state.extintor}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                </Form.Group>
                                            </Form.Field>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field widths='equal'>
                                                <Form.Group widths='equal'
                                                            style={{flexDirection: "column", fontWeight: 200}}>
                                                    <Form.Checkbox name='kit_auxilio' label='Botiquín'
                                                                   checked={this.state.kit_auxilio}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                    <Form.Checkbox name='uniforme' label='Uniforme'
                                                                   checked={this.state.uniforme}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                    <Form.Checkbox name='tarjeta_circulacion'
                                                                   label='Tarjeta de circulación'
                                                                   checked={this.state.tarjeta_circulacion}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                    <Form.Checkbox name='licencia_vigente' label='Licencia vigente'
                                                                   checked={this.state.licencia_vigente}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                    <Form.Checkbox name='poliza_seguros' label='Póliza de seguros'
                                                                   checked={this.state.poliza_seguros}
                                                                   onChange={this.onChangeValue}
                                                                   style={{margin: "5px 0"}}/>
                                                </Form.Group>
                                            </Form.Field>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={8}>
                            <Table>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Form.Field as='h4'>Limpieza interior</Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Malo' name='limpieza_interior' value={1}
                                                       checked={this.state.limpieza_interior === 1}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Regular' name='limpieza_interior' value={2}
                                                       checked={this.state.limpieza_interior === 2}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Bueno' name='limpieza_interior' value={3}
                                                       checked={this.state.limpieza_interior === 3}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Excelente' name='limpieza_interior' value={4}
                                                       checked={this.state.limpieza_interior === 4}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field as='h4'>Limpieza exterior</Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Malo' name='limpieza_exterior' value={1}
                                                       checked={this.state.limpieza_exterior === 1}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Regular' name='limpieza_exterior' value={2}
                                                       checked={this.state.limpieza_exterior === 2}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Bueno' name='limpieza_exterior' value={3}
                                                       checked={this.state.limpieza_exterior === 3}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Excelente' name='limpieza_exterior' value={4}
                                                       checked={this.state.limpieza_exterior === 4}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field as='h4'>Estado de llantas</Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Malo' name='estado_llantas' value={1}
                                                       checked={this.state.estado_llantas === 1}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Regular' name='estado_llantas' value={2}
                                                       checked={this.state.estado_llantas === 2}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Bueno' name='estado_llantas' value={3}
                                                       checked={this.state.estado_llantas === 3}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                            <Form.Field style={{fontWeight: 200}}>
                                                <Radio label='Excelente' name='estado_llantas' value={4}
                                                       checked={this.state.estado_llantas === 4}
                                                       onChange={this.onChangeValue}
                                                />
                                            </Form.Field>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>

                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Table>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Form.Field>
                                                <TextArea id="nota" placeholder='Notas' name="nota"
                                                          value={this.state.nota}
                                                          style={{minHeight: 150, maxHeight: 300}}
                                                          onChange={this.onChangeValue}/>
                                            </Form.Field>
                                            <Form.Field>
                                                <TextArea id="notas_mantenimiento" name="nota_mantenimiento"
                                                          value={this.state.nota_mantenimiento}
                                                          placeholder='Notas de mantenimiento'
                                                          style={{minHeight: 150, maxHeight: 300}}
                                                          onChange={this.onChangeValue}/>
                                            </Form.Field>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8} floated={"right"}>
                            <Grid.Row>
                                <Form.Group unstackable fluid>
                                    <Button id="btn-formulario" type='submit' color='orange' fluid>Guardar</Button>
                                    <Button onClick={this.onReset} fluid>Cerrar</Button>
                                </Form.Group>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                    <br/>

                </Form>
            </Segment>
        )
    }
}

FormaCapturarRevisiones.propTypes = {
    revisiones: PropTypes.object,
}

export default FormaCapturarRevisiones