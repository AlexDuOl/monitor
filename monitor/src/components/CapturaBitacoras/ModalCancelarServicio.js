import React from 'react'
import {Button, Form, Modal, Segment, TextArea, Message} from "semantic-ui-react";
import PropTypes from 'prop-types'

import BaseComponent from "../BaseComponent";

class ModalCancelarServicio extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            motivo: "",
            valid: false
        }
    }

    onSubmit = () => {
        const id = this.props.cancelacion.bitacora.id
        const idUsuario = this.props.usuario.id

        this.props.onCancelarServicio(id, {
            'detalle': this.state.motivo,
            'usuario_id': idUsuario
        })
    }

    render() {
        const {cancelacion: {bitacora, sending, error, done}} = this.props
        const {onFinalizarCancelacion} = this.props

        if (!bitacora) {
            return null
        }

        return (
            <Modal open={true} size='large'>
                <Modal.Header>
                    <p>Cancelar servicio (Id: {bitacora.id})</p>
                    <p>{bitacora.getNombreRuta()}</p>
                    <p>{bitacora.getOperador() ? bitacora.getOperador().nombre : "Sin definir"}</p>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {error && <Message error header={error.mensaje} list={error.detalles}/>}

                        {
                            !done &&
                            <Segment>
                                <Form form={'formaCancelarServicio'}>
                                    <Form.Field required>
                                        <label>Motivo</label>
                                        <TextArea label="Motivo" name="motivo" rows={3} onChange={this.onChangeValue}/>
                                    </Form.Field>

                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Button.Group>
                                                <Button onClick={() => onFinalizarCancelacion()}>Cancelar</Button>
                                                <Button.Or text='O'/>
                                                <Button color={"orange"} onClick={this.onSubmit}
                                                        disabled={!this.state.motivo.length || sending}
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

                                <Form form={'cancelarSuccess'}>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Button.Group>
                                                <Button positive
                                                        onClick={() => onFinalizarCancelacion()}>Cerrar</Button>
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

ModalCancelarServicio.propTypes = {
    cancelacion: PropTypes.object.isRequired,
    onCancelarServicio: PropTypes.func.isRequired,
    onFinalizarCancelacion: PropTypes.func.isRequired
}

export default ModalCancelarServicio
