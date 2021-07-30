import moment from 'moment'
import React from 'react'
import {Button, Form, Modal, Segment, TextArea, Message} from "semantic-ui-react";
import PropTypes from 'prop-types'

import BaseComponent from "../BaseComponent";

import {
    extraerOpcionesCausas,
    extraerOpcionesEfectos
} from "../../helpers";

class ModalIncidenteServicio extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            fecha: moment().format('YYYY-MM-DD'),
            afecto_servicio: true,
            responsabilidad_suma: true,
            facturar: true,
            causa_id: -1,
            efecto_id: -1,
            detalle: "",
            nota_facturacion: ""
        }
    }

    componentDidMount() {
        this.props.onFetchCausas()
        this.props.onFetchEfectos()
    }

    onSubmit = () => {

        const {incidente: {bitacora}} = this.props
        const idUsuario = this.props.usuario.id

        const {
            causa_id,
            efecto_id,
            afecto_servicio,
            responsabilidad_suma,
            facturar,
            detalle,
            nota_facturacion,
            fecha
        } = this.state

        this.props.onIncidenteServicio(bitacora.id, {
            'detalle': detalle,
            'nota_facturacion': nota_facturacion,
            'usuario_id': idUsuario,
            'causa_id': causa_id,
            'efecto_id': efecto_id,
            'responsabilidad_suma': responsabilidad_suma,
            'afecto_servicio': afecto_servicio,
            'facturar_servicio': facturar,
            'fecha': fecha
        })
    }

    render() {
        const {incidente: {bitacora, sending, error, done}} = this.props
        const {causas, efectos} = this.props
        const {onFinalizarIncidente} = this.props
        const {fecha, causa_id, efecto_id} = this.state

        if (!bitacora) {
            return null
        }

        return (
            <Modal open={true} size='large'>
                <Modal.Header>
                    <p>Registrar incidente (Id de bitácora: {bitacora.id})</p>
                    <p>{bitacora.getNombreRuta()}</p>
                    <p>{bitacora.getOperador() ? bitacora.getOperador().nombre : "Sin definir"}</p>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {error && <Message error header={error.mensaje} list={error.detalles}/>}

                        {
                            !done &&
                            <Segment>
                                <Form form={'formaIncidenteServicio'}>
                                    <Form.Group>
                                        <Form.Field>
                                            <Form.Group widths='equal'>
                                                <Form.Field>
                                                    <Form.Input name='fecha' type='date' label="Fecha" value={fecha}
                                                                onChange={this.onChangeValue}/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>&nbsp;</label>
                                                    <Form.Checkbox name='afecto_servicio' label='Afectó el servicio?'
                                                                   checked={this.state.afecto_servicio}
                                                                   onChange={this.onChangeValue}/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>&nbsp;</label>
                                                    <Form.Checkbox name='responsabilidad_suma'
                                                                   label='Es responsabilidad de Suma?'
                                                                   checked={this.state.responsabilidad_suma}
                                                                   onChange={this.onChangeValue}/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>&nbsp;</label>
                                                    <Form.Checkbox name='facturar' label='Se factura el servicio?'
                                                                   checked={this.state.facturar}
                                                                   onChange={this.onChangeValue}/>
                                                </Form.Field>
                                            </Form.Group>
                                        </Form.Field>
                                    </Form.Group>

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

                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Button.Group>
                                                <Button onClick={() => onFinalizarIncidente()}>Cancelar</Button>
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

                                <Form form={'incidenteSuccess'}>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Button.Group>
                                                <Button positive onClick={() => onFinalizarIncidente()}>Cerrar</Button>
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

ModalIncidenteServicio.propTypes = {
    usuario: PropTypes.object.isRequired,
    incidente: PropTypes.object.isRequired,
    causas: PropTypes.object.isRequired,
    efectos: PropTypes.object.isRequired,
    onFinalizarIncidente: PropTypes.func.isRequired,
    onFetchCausas: PropTypes.func.isRequired,
    onFetchEfectos: PropTypes.func.isRequired,
    onIncidenteServicio: PropTypes.func.isRequired,
}
export default ModalIncidenteServicio
