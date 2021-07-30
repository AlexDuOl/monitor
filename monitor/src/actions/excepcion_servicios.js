import {
  REQUEST_EXCEPCION_SERVICIO,
  REQUEST_EXCEPCION_SERVICIO_SUCCESS,
  REQUEST_EXCEPCION_SERVICIO_FAILED
} from '../constants/action_types'

export const excepcionServicio = (params) => {
  return {
    type: REQUEST_EXCEPCION_SERVICIO,
    payload: { params }
  }
}

export const onExcepcionServicioSuccess = (response) => {
  return {
    type: REQUEST_EXCEPCION_SERVICIO_SUCCESS,
    payload: { response }
  }
}

export const onExcepcionServicioFailed = (response) => {
  return {
    type: REQUEST_EXCEPCION_SERVICIO_FAILED,
    payload: { response }
  }
}
