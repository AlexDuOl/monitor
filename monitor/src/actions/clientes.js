import {
    REQUEST_CLIENTES,
    REQUEST_SUCCESS_CLIENTES,
    REQUEST_FAILED_CLIENTES,
    INVALIDAR_CLIENTES
} from '../constants/action_types'

export const requestClientes = (params) => ({
    type: REQUEST_CLIENTES,
    payload: {params}
})

export const onClientesRequestSuccess = (response) => ({
    type: REQUEST_SUCCESS_CLIENTES,
    payload: response
})

export const onClientesRequestFailed = (response) => ({
    type: REQUEST_FAILED_CLIENTES,
    payload: response
})

export const invalidarServicios = () => ({
    type: INVALIDAR_CLIENTES
})
