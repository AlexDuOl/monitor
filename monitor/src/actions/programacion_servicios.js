import {
  REQUEST_PROGRAMAR_SERVICIOS,
  REQUEST_PROGRAMAR_SERVICIOS_SUCCESS,
  REQUEST_PROGRAMAR_SERVICIOS_FAILED
} from '../constants/action_types'

export const requestProgramarServicios = (params) => ({
  type: REQUEST_PROGRAMAR_SERVICIOS,
  payload: params
})

export const onProgramarServiciosSuccess = (response) => ({
  type: REQUEST_PROGRAMAR_SERVICIOS_SUCCESS,
  payload: response
})

export const onProgramarServiciosFailed = (response) => ({
  type: REQUEST_PROGRAMAR_SERVICIOS_FAILED,
  payload: response
})
