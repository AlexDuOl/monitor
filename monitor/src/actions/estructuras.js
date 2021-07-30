import {
    REQUEST_ESTRUCTURAS,
    REQUEST_ESTRUCTURAS_SUCCESS,
    REQUEST_ESTRUCTURAS_FAILED,
    INVALIDATE_ESTRUCTURAS
} from '../constants/action_types'

export const requestEstructuras = (params) => ({
    type: REQUEST_ESTRUCTURAS,
    payload: {params}
})

export const onEstructurasRequestSuccess = (response) => ({
    type: REQUEST_ESTRUCTURAS_SUCCESS,
    payload: response
})

export const onEstructurasRequestFailed = (response) => ({
    type: REQUEST_ESTRUCTURAS_FAILED,
    payload: response
})

export const invalidarEstructuras = () => ({
    type: INVALIDATE_ESTRUCTURAS,
    //payload: response
})
