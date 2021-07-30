import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Label, Button, Popup, Segment, Table, Grid} from "semantic-ui-react";

import DetalleBitacoras from "./DetalleBitacoras";
import BaseComponent from "../BaseComponent";

class TablaBitacoras extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            pagoChofer: null,
            pagoSubcontratado: null,
            precioCliente: null,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.bitacoras.cambioIndividualPrecio.bitacora) {

            this.setState({
                pagoChofer: nextProps.bitacoras.cambioIndividualPrecio.bitacora.pagoOperador,
                pagoSubcontratado: nextProps.bitacoras.cambioIndividualPrecio.bitacora.pagoAliado,
                precioCliente: nextProps.bitacoras.cambioIndividualPrecio.bitacora.precioCliente,
            })
        }
    }

    onSubmit = () => {

        const id = this.props.bitacoras.cambioIndividualPrecio.bitacora.id

        this.props.onCambioPrecio(id, {
            'pago_chofer': this.state.pagoChofer,
            'pago_subcontratado': this.state.pagoSubcontratado,
            'precio_cliente': this.state.precioCliente,
        })

        this.props.onFinalizarCambioPrecio()
    }

    render() {
        const {
            bitacoras,
            user,
            onCambioPrecio,
            onIniciarCambioPrecio,
            onFinalizarCambioPrecio,
            bitacoras: {cambioIndividualPrecio}
        } = this.props

        return (
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Segment style={{overflow: 'auto', maxHeight: "100vh"}}>
                {
                    cambioIndividualPrecio.bitacora &&
                    <Segment widths="equal">
                        <Form form={'formaCambioIndividualPrecio'}>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <Input fluid
                                           label='PagoChofer'
                                           name="pagoChofer"
                                           disabled={cambioIndividualPrecio.bitacora.permitirCambioDePrecio()}
                                           type='number'
                                           onChange={this.onChangeValue}
                                           value={this.state.pagoChofer}
                                    />
                                    {
                                        cambioIndividualPrecio.bitacora.pagarServicio === true &&
                                        <Label pointing prompt>
                                            El Servicio ya fue pagado
                                        </Label>
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <Input fluid
                                           label="PagoSubcontratado"
                                           name="pagoSubcontratado"
                                           disabled={cambioIndividualPrecio.bitacora.permitirCambioDePrecio()}
                                           type='number'
                                           onChange={this.onChangeValue}
                                           value={this.state.pagoSubcontratado}
                                    />
                                    {
                                        cambioIndividualPrecio.bitacora.pagarServicio === true &&
                                        <Label pointing prompt>
                                            El Servicio ya fue pagado
                                        </Label>
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <Input fluid
                                           label='PrecioCliente'
                                           name="precioCliente"
                                           type='number'
                                           onChange={this.onChangeValue}
                                           value={this.state.precioCliente}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <Button.Group>
                                        <Button onClick={() => this.props.onFinalizarCambioPrecio()}>Cancelar</Button>
                                        <Button.Or/>
                                        <Button positive onClick={this.onSubmit}
                                                disabled={cambioIndividualPrecio.bitacora.sending}
                                                loading={cambioIndividualPrecio.bitacora.sending}>Modificar</Button>
                                    </Button.Group>
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Segment>
                }
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row textAlign='center'>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Fecha</Table.HeaderCell>
                            <Table.HeaderCell>Ruta</Table.HeaderCell>
                            <Table.HeaderCell>Aforo</Table.HeaderCell>
                            <Table.HeaderCell>Unidad</Table.HeaderCell>
                            <Table.HeaderCell>
                                <Popup
                                    content={'¿Servicio confirmado?'}
                                    trigger={<span>C</span>}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Popup
                                    content={'¿Servicio terminado?'}
                                    trigger={<span>T</span>}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Popup
                                    content={'¿Se pagó a operador?'}
                                    trigger={<span>P</span>}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Popup
                                    content={'Pago Operador'}
                                    trigger={<span>P.O.</span>}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Popup
                                    content={'Pago Aliado'}
                                    trigger={<span>P.A.</span>}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Popup
                                    content={'Precio Cliente'}
                                    trigger={<span>P.C.</span>}
                                />
                            </Table.HeaderCell>
                            {
                                user.puedeCambiarPrecios() &&
                                <Table.HeaderCell>
                                    <Popup
                                        content={'Cambio individual precios'}
                                        trigger={<span>Cambio Precio</span>}
                                    />
                                </Table.HeaderCell>
                            }
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <DetalleBitacoras
                            bitacoras={bitacoras}
                            user={user}
                            onCambioPrecio={onCambioPrecio}
                            onIniciarCambioPrecio={onIniciarCambioPrecio}
                            onFinalizarCambioPrecio={onFinalizarCambioPrecio}
                        />
                    </Table.Body>
                </Table>
            </Segment>
            </Grid.Column>
        )
    }
}

TablaBitacoras.propTypes = {
    bitacoras: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    onCambioPrecio: PropTypes.func.isRequired,
    onIniciarCambioPrecio: PropTypes.func.isRequired,
    onFinalizarCambioPrecio: PropTypes.func.isRequired
}

export default TablaBitacoras
