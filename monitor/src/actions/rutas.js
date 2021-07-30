import {
  REQUEST_RUTAS,
  REQUEST_RUTAS_SUCCESS,
  REQUEST_RUTAS_FAILED,
  INVALIDAR_RUTAS
} from '../constants/action_types'

export const requestRutas = (params) => {
  return {
    type: REQUEST_RUTAS,
    payload: {params}
  }
}

export const onRutasRequestSuccess = (response) => {
  return {
    type: REQUEST_RUTAS_SUCCESS,
    payload: response
  }
}

export const onRutasRequestFailed = (response) => {
  return {
    type: REQUEST_RUTAS_FAILED,
    payload: response
  }
}

export const invalidarRutas = () => {
  return {
    type: INVALIDAR_RUTAS
  }
}
