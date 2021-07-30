import moment from 'moment'
import React, {useState} from 'react'
import {Form, Segment, Button, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {extraerOpcionesClientes, extraerOpcionesProveedores, extraerOpcionesRutas} from "../../helpers";

const FormaBuscarProgramaciones = ({
                                       clientes,
                                       rutas,
                                       proveedores,
                                       onLoadingDetalle,
                                       onRequestRutas,
                                       onRequestDetalleProgramados
                                   }) => {

    const [fechaInicial, setFechaInicial] = useState(moment().startOf("month").format("YYYY-MM-DD"))
    const [fechaFinal, setFechaFinal] = useState(moment().endOf("month").format("YYYY-MM-DD"))
    const [cliente, setCliente] = useState(-1)
    const [ruta, setRuta] = useState(-1)
    const [proveedor, setProveedor] = useState(-1)
    const [detalleExtendido, setDetalleExtendido] = useState(false)

    const onSubmit = () => {

        onRequestDetalleProgramados([
            `id_cliente=${cliente}`,
            `fecha_inicial=${fechaInicial}`,
            `fecha_final=${fechaFinal}`,
            `detalle_extendido=${detalleExtendido ? 1 : 0}`,
            `id_ruta=${ruta}`,
            `id_proveedor=${proveedor}`,
        ])

    }

    const onClienteChange = data => {
        setCliente(data.value)
        setRuta(-1)
        setProveedor(-1)

        onRequestRutas([`id_cliente=${data.value}`, 'sort(+nombre)', 'activa=true'])
    }

    const onProveedorSelected = data => {
        setCliente(-1)
        setRuta(-1)

        setProveedor(data.value)
    }

    return (
        <Grid.Column mobile={16} tablet={16} computer={16}>
            <h3 style={{textAlign: "left"}}>Vista programados</h3>
        <Segment>
            <Form form={'formaBuscarProgramaciones'} onSubmit={onSubmit}>
                <Form.Group widths='equal'>
                    <Form.Select name='cliente' label='Cliente' fluid search selection loading={clientes.fetching}
                                 options={clientes.all.map(extraerOpcionesClientes)} value={cliente}
                                 onChange={(_, data) => {
                                     onClienteChange(data)
                                 }}/>
                    <Form.Select name='ruta' label='Ruta' fluid search selection loading={rutas.fetching}
                                 options={rutas.all.map(extraerOpcionesRutas)} value={ruta} onChange={(_, data) => {
                        setRuta(data.value)
                    }}/>
                    <Form.Select name='proveedor' label='Proveedor' fluid search selection
                                 loading={proveedores.fetching}
                                 options={proveedores.all.map(extraerOpcionesProveedores)} value={proveedor}
                                 onChange={(_, data) => {
                                     onProveedorSelected(data)
                                 }}/>
                    <Form.Input name='fechaInicial' label='Fecha inicial' type='date' value={fechaInicial}
                                onChange={event => setFechaInicial(event.target.value)}/>
                    <Form.Input name='fechaFinal' label='Fecha final' type='date' value={fechaFinal}
                                onChange={event => setFechaFinal(event.target.value)}/>
                    <Form.Field>
                        <label>&nbsp;</label>
                        <Button color={"orange"} fluid loading={onLoadingDetalle}>Buscar</Button>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Checkbox toggle name='detalle_extendido' label='Detalle extendido'
                                   checked={detalleExtendido} onChange={(_, data) => {
                        setDetalleExtendido(data.checked)
                    }}/>
                </Form.Group>
            </Form>
        </Segment>
        </Grid.Column>
    )
}

FormaBuscarProgramaciones.propTypes = {
    clientes: PropTypes.object.isRequired,
    rutas: PropTypes.object.isRequired,
    proveedores: PropTypes.object.isRequired,
    onLoadingDetalle: PropTypes.bool.isRequired,
    onRequestRutas: PropTypes.func.isRequired,
    onRequestDetalleProgramados: PropTypes.func.isRequired,
}

export default FormaBuscarProgramaciones
