import {
  REQUEST_SERVICIOS_PROGRAMADOS,
  REQUEST_SERVICIOS_PROGRAMADOS_FAILED,
  REQUEST_SERVICIOS_PROGRAMADOS_SUCCESS
} from "../constants/action_types";

export const requestServiciosProgramados = (params) => ({
  type: REQUEST_SERVICIOS_PROGRAMADOS,
  payload: { params }
})

export const onRequestServiciosProgramadosSuccess = (response) => ({
  type: REQUEST_SERVICIOS_PROGRAMADOS_SUCCESS,
  payload: response
})

export const onRequestServiciosProgramadosFailed = (response) => ({
  type: REQUEST_SERVICIOS_PROGRAMADOS_FAILED,
  payload: response
})
