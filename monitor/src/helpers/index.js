import React from 'react'
import _ from 'lodash'
import {Table, Label, Icon, Form} from 'semantic-ui-react'
import moment from 'moment'

export const isEmpty = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            return false
    }
    return true
}

export const capitalize = (cadena, separador = ' ') => {
    return cadena.split(separador)
        .map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
        .join(separador)
}

/**
 * @param formValues Object
 * @param paramsMap Object
 */
export const extraerParametrosBusqueda = (formValues, paramsMap) => {
    return Object.keys(formValues).map(key => {
        if (formValues[key] && formValues[key] !== -1) {
            switch (key) {
                case 'desde':
                    return `${paramsMap[key]}=${formValues[key]} 00:00:00`
                case 'hasta':
                    return `${paramsMap[key]}=${formValues[key]} 23:59:59`
                default:
                    return `${paramsMap[key]}=${formValues[key]}`
            }
        }
    }).filter(item => item)
}

export const extraerOpcionesOperadores =
    operador => ({key: operador.id, text: operador.nombre, value: operador.id})

export const extraerOpcionesProveedores =
    proveedor => ({key: proveedor.id, text: proveedor.nombre, value: proveedor.id})

export const extraerOpcionesClientes =
    cliente => {
        return {key: cliente.id, text: cliente.nombreEmpresa, value: cliente.id}
    }

export const extraerOpcionesUnidades =
    unidad => {
        return {key: unidad.id, text: `${unidad.numeroEconomico} ${unidad.descripcion} `, value: unidad.id}
    }

export const extraerOpcionesRutas =
    ruta => {
        return {key: ruta.id, text: ruta.nombre, value: ruta.id}
    }

export const extraerOpcionesEstructuras =
    estructura => {
        return {key: estructura.id, text: estructura.detalle(), value: estructura.id}
    }

export const extraerOpcionesCausas =
    causa => {
        return {key: causa.id, text: causa.descripcion, value: causa.id}
    }

export const extraerOpcionesEfectos =
    efecto => {
        return {key: efecto.id, text: efecto.descripcion, value: efecto.id}
    }

export const filtrarClientesFromServicios = (servicios, clientes) => {
    const idsClientes = _.uniq(servicios.map(servicio => {
        return servicio.idRuta ? servicio.idCliente : -1
    }))

    return clientes.filter(cliente => idsClientes.includes(cliente.id))
        .map(extraerOpcionesClientes)
}

/**
 * Generate the headers of a table from a List of Strings
 * @param {Array} xs List of Strings
 * TODO: Handle Icons, Colspans
 */
export const table_header = (xs) => (
    <Table.Header>
        <Table.Row>
            {xs.map((x, idx) => (<Table.HeaderCell key={idx}>{x}</Table.HeaderCell>))}
        </Table.Row>
    </Table.Header>
)

export const getDias = (state) => {
    const dias = []

    if (state.lunes) { dias.push(1) }
    if (state.martes) { dias.push(2) }
    if (state.miercoles) { dias.push(3) }
    if (state.jueves) { dias.push(4) }
    if (state.viernes) { dias.push(5) }
    if (state.sabado) { dias.push(6) }
    if (state.domingo) { dias.push(7) }

    return dias;
}

export const getStatusServicio = (servicio) => {
    if (servicio.cancelado) {
        return <Label color='grey' size="tiny" horizontal>Cancelado</Label>
    }

    if (moment(servicio.tiempoInicial).diff(moment(), 'minutes') < 30 && !servicio.confirmado) {
        return <Label color='red' size="tiny" horizontal>Sin confirmar</Label>
    }

    switch (servicio.estatus) {
        case 1:
            return <Label color='green' size="tiny" horizontal>En ruta</Label>
        case 2:
            return <Label color='grey' size="tiny" horizontal>Finalizado</Label>
        default:
            return <Label color='blue' size="tiny" horizontal>Programado</Label>
    }
}

export const getIconoTipoServicio = (servicio) => {
    switch (servicio.modalidad) {
        case 'Empresarial':
            return <Icon circular color='grey' name='bus'/>
        case 'Especial':
            return <Icon circular color='violet' name='bus'/>
        default:
            return <Icon circular color='black' name='bus'/>
    }
}

export const extraerIniciales = (word) => {
    return word
        .split(" ")
        .map(function (w) {
            return w[0]
        })
        .join('')
}

export const isEven = (number) => {
    return parseInt(number) % 2 === 0
}