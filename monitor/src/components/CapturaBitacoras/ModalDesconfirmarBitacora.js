import React from 'react'
import {Button, Form, Modal, Segment, TextArea, Message} from "semantic-ui-react";
import PropTypes from 'prop-types'

import BaseComponent from "../BaseComponent";

class ModalDesconfirmarBitacora extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            motivo: "",
            force: true
        }
    }

    onSubmit = () => {
        const id = this.props.desconfirmar.bitacora.id
        const idUsuario = this.props.usuario.id

        this.props.onDesconfirmarBitacora(id, {
            'detalle': this.state.motivo,
            'usuario_id': idUsuario
        })
    }

    render() {
        const {desconfirmar: {bitacora, sending, error, done, force}} = this.props
        const {onFinalizarDesconfirmar} = this.props

        if (!bitacora) {
            return null
        }

        return (
            <Modal open={true} size='large'>
                <Modal.Header>
                    <p>Desconfirmar Bitacora (Id: {bitacora.id})</p>
                    <p>{bitacora.getNombreRuta()}</p>
                    <p>{bitacora.getOperador() ? bitacora.getOperador().nombre : "Sin definir"}</p>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {error &&
                            <Message negative list={error.detalles}>
                                <Message.Header>Ocurrió un error al desprogramar la bitacora</Message.Header>
                            </Message>
                        }

                        {
                            !done &&
                            <Segment>
                                <Form form={'formaDesconfirmarBitacora'}>
                                    <Form.Field required>
                                        <label>Motivo</label>
                                        <TextArea label="Motivo" name="motivo" rows={3} onChange={this.onChangeValue}/>
                                    </Form.Field>

                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Button.Group>
                                                <Button onClick={() => onFinalizarDesconfirmar()}>Cancelar</Button>
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
                                <Message positive header={done.mensaje} list={done.detalles}>
                                    <Message.Header>Bitacora desconfirmada correctamente</Message.Header>
                                </Message>

                                <Form form={'desconfirmarSuccess'}>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Button.Group>
                                                <Button positive
                                                        onClick={() => onFinalizarDesconfirmar()}>Cerrar</Button>
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

ModalDesconfirmarBitacora.propTypes = {
    desconfirmar: PropTypes.object.isRequired,
    onDesconfrimarBitacora: PropTypes.func,
    onFinalizarDesconfirmar: PropTypes.func.isRequired
}

export default ModalDesconfirmarBitacora
