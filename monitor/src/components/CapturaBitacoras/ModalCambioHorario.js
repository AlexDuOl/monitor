import React from 'react';
import {Button, Form, Modal, Segment, TextArea, Message} from "semantic-ui-react";
import PropTypes from 'prop-types'

import BaseComponent from "../BaseComponent";

class ModalCambioHorario extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            tiempoInicial: null,
            tiempoFinal: null,
            comentarios: ""
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.cambioIndividualHorario.bitacora) {

            let bitacora = nextProps.cambioIndividualHorario.bitacora

            this.setState({
                tiempoInicial: bitacora.tiempoInicial.substring(11, 16),
                tiempoFinal: bitacora.tiempoFinal.substring(11, 16),
            })
        }
    }

    onSubmit = () => {

        const id = this.props.cambioIndividualHorario.bitacora.id

        this.props.onCambioIndividualHorario(id, {
            'motivo_transferencia': this.state.comentarios,
            'tiempo_inicial': this.state.tiempoInicial,
            'tiempo_final': this.state.tiempoFinal,
        })
    }

    render() {
        const {cambioIndividualHorario: {bitacora, sending, error, done}} = this.props
        const {onFinalizarCambioIndividualHorario} = this.props

        if (!bitacora) {
            return null
        }

        return (
            <Modal open={true} size='large'>
                <Modal.Header widths="equal">
                    <p>Cambio Individual Horario(Id: {bitacora.id})</p>
                    <p>{bitacora.getNombreRuta()}</p>

                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {error && <Message error header={error.mensaje} list={error.detalles}/>}

                        {
                            !done &&
                            <Segment>
                                <Form form={'formaCambioIndividualHorario'}>
                                    <Form.Group widths="equal">
                                        <Form.Input fluid
                                                    label='TiempoInicial'
                                                    name="tiempoInicial"
                                                    type='time'
                                                    onChange={this.onChangeValue}
                                                    value={this.state.tiempoInicial}
                                        />
                                        <Form.Input fluid
                                                    label="TiempoFinal"
                                                    name="tiempoFinal"
                                                    type='time'
                                                    onChange={this.onChangeValue}
                                                    value={this.state.tiempoFinal}
                                        />
                                    </Form.Group>
                                    <Form.Field>
                                        <label>Comentarios</label>
                                        <TextArea label="Comentarios" name="comentarios" rows={3}
                                                  onChange={this.onChangeValue}/>
                                    </Form.Field>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Button.Group>
                                                <Button
                                                    onClick={() => onFinalizarCambioIndividualHorario()}>Cancelar</Button>
                                                <Button.Or text='O'/>
                                                <Button color={"orange"}
                                                        onClick={this.onSubmit} disabled={sending}
                                                        loading={sending}>Modificar</Button>
                                            </Button.Group>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Segment>
                        }

                        {
                            done &&
                            <Segment>
                                <Message success
                                         icon="check circle outline"
                                         header="Cambio de precio exitoso"
                                         list={[
                                             `Tiempo Inicial: ${done.data.attributes.tiempoInicial}`,
                                             `Tiempo Final: ${done.data.attributes.tiempoFinal}`,
                                         ]}/>

                                <Form form={'cambioIndividualHorarioSuccess'}>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Button.Group>
                                                <Button positive
                                                        onClick={() => onFinalizarCambioIndividualHorario()}>Cerrar</Button>
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

ModalCambioHorario.propTypes = {
    cambioIndividualHorario: PropTypes.object.isRequired,
    onCambioIndividualHorario: PropTypes.func.isRequired,
    onFinalizarCambioIndividualHorario: PropTypes.func.isRequired
}

export default ModalCambioHorario
