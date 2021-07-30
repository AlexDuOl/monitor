import React from 'react'
import {Button, Form, Modal, Segment, TextArea, Message} from "semantic-ui-react";
import PropTypes from 'prop-types'

import BaseComponent from "../BaseComponent";

import {
    extraerOpcionesCausas,
    extraerOpcionesEfectos, extraerOpcionesOperadores, extraerOpcionesProveedores
} from "../../helpers";

class ModalRescateServicio extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            causa_id: -1,
            efecto_id: -1,
            proveedor_destino_id: 1,
            operador_destino_id: -1,
            afecto_servicio: 1,
            responsabilidad_suma: 1,
            detalle: "",
            nota_facturacion: ""
        }
    }

    componentDidMount() {
        this.props.onFetchCausas()
        this.props.onFetchEfectos()
    }

    triggerChangeProveedor = (event, data) => {
        this.onChangeValue(event, data)

        this.setState({
            operador_destino_id: -1
        })

        if (data.value !== 1) {
            this.props.onFetchSubcontratados(['activo=true', 'sort(+nombre)', `id_proveedor=${data.value}`])
        }
    }

    onSubmit = () => {
        const {rescate: {bitacora}} = this.props
        const idUsuario = this.props.usuario.id

        const {
            causa_id,
            efecto_id,
            proveedor_destino_id,
            operador_destino_id,
            afecto_servicio,
            responsabilidad_suma,
            detalle,
            nota_facturacion
        } = this.state

        this.props.onRescatarServicio(bitacora.id, {
            'detalle': detalle,
            'nota_facturacion': nota_facturacion,
            'usuario_id': idUsuario,
            'causa_id': causa_id,
            'efecto_id': efecto_id,
            'responsabilidad_suma': responsabilidad_suma,
            'afecto_servicio': afecto_servicio,
            'proveedor_origen_id': bitacora.idProveedor,
            'operador_origen_id': bitacora.idOperador,
            'proveedor_destino_id': proveedor_destino_id,
            'operador_destino_id': operador_destino_id
        })
    }

    render() {
        const {rescate: {bitacora, sending, error, done}} = this.props
        const {causas, efectos, proveedores, operadores, subcontratados} = this.props
        const {onFinalizarRescate} = this.props
        const {causa_id, efecto_id, proveedor_destino_id, operador_destino_id} = this.state

        const opcionesOperadores = (proveedor_destino_id === 1) ? operadores : subcontratados

        if (!bitacora) {
            return null
        }

        return (
            <Modal open={true} size='large'>
                <Modal.Header>
                    <p>Rescatar servicio (Id: {bitacora.id})</p>
                    <p>{bitacora.getNombreRuta()}</p>
                    <p>{bitacora.getOperador() ? bitacora.getOperador().nombre : "Sin definir"}</p>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {error && <Message error header={error.mensaje} list={error.detalles}/>}

                        {
                            !done &&
                            <Segment>
                                <Form form={'formaRescateServicio'}>
                                    <Form.Group widths="equal">
                                        <Form.Select name='causa_id' label='Causa' fluid search selection
                                                     loading={causas.fetching}
                                                     options={causas.all.map(extraerOpcionesCausas)} value={causa_id}
                                                     onChange={this.onChangeValue}/>

                                        <Form.Select name='efecto_id' label='Efecto' fluid search selection
                                                     loading={efectos.fetching}
                                                     options={efectos.all.map(extraerOpcionesEfectos)} value={efecto_id}
                                                     onChange={this.onChangeValue}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Field>
                                            <label>Otros detalles</label>
                                            <Form.Group widths='equal'>
                                                <Form.Checkbox name='afecto_servicio' label='Afectó el servicio?'
                                                               checked={this.state.afecto_servicio}
                                                               onChange={this.onChangeValue}/> &nbsp;
                                                <Form.Checkbox name='responsabilidad_suma'
                                                               label='Es responsabilidad de Suma?'
                                                               checked={this.state.responsabilidad_suma}
                                                               onChange={this.onChangeValue}/> &nbsp;
                                            </Form.Group>
                                        </Form.Field>
                                    </Form.Group>

                                    <Form.Group widths="equal">
                                        <Form.Field required>
                                            <label>Detalle</label>
                                            <TextArea label="Detalle" name="detalle" rows={3}
                                                      onChange={this.onChangeValue}/>
                                        </Form.Field>

                                        <Form.Field required>
                                            <label>Nota para facturación</label>
                                            <TextArea label="Nota para facturación" name="nota_facturacion" rows={3}
                                                      onChange={this.onChangeValue}/>
                                        </Form.Field>
                                    </Form.Group>

                                    <hr/>

                                    <Form.Group widths="equal">
                                        <Form.Select name='proveedor_destino_id' label='Proveedor' fluid search
                                                     selection
                                                     loading={proveedores.fetching}
                                                     options={proveedores.all.map(extraerOpcionesProveedores)}
                                                     value={proveedor_destino_id}
                                                     onChange={this.triggerChangeProveedor}/>

                                        <Form.Select name='operador_destino_id' label='Operador' fluid search selection
                                                     loading={opcionesOperadores.fetching}
                                                     options={opcionesOperadores.all.map(extraerOpcionesOperadores)}
                                                     value={operador_destino_id}
                                                     onChange={this.onChangeValue}/>
                                    </Form.Group>

                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Button.Group>
                                                <Button onClick={() => onFinalizarRescate()}>Cancelar</Button>
                                                <Button.Or text='O'/>
                                                <Button color={"orange"} onClick={this.onSubmit} disabled={sending}
                                                        loading={sending}>Enviar</Button>
                                            </Button.Group>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Segment>
                        }

                        {
                            done &&
                            <Segment>
                                <Message success header={done.mensaje} list={done.detalles}/>

                                <Form form={'rescateSuccess'}>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Button.Group>
                                                <Button positive onClick={() => onFinalizarRescate()}>Cerrar</Button>
                                            </Button.Group>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Segment>
                        }

                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

ModalRescateServicio.propTypes = {
    usuario: PropTypes.object.isRequired,
    rescate: PropTypes.object.isRequired,
    causas: PropTypes.object.isRequired,
    efectos: PropTypes.object.isRequired,
    proveedores: PropTypes.object.isRequired,
    operadores: PropTypes.object.isRequired,
    subcontratados: PropTypes.object.isRequired,
    onFinalizarRescate: PropTypes.func.isRequired,
    onFetchSubcontratados: PropTypes.func.isRequired,
    onRescatarServicio: PropTypes.func.isRequired
}

export default ModalRescateServicio
