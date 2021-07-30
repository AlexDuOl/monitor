import {
  REQUEST_EFECTOS, REQUEST_EFECTOS_FAILED, REQUEST_EFECTOS_SUCCESS
} from '../constants/action_types'

export const requestEfectos = (params) => ({
  type: REQUEST_EFECTOS,
  payload: params
})

export const onRequestEfectosSuccess = (response) => ({
  type: REQUEST_EFECTOS_SUCCESS,
  payload: response
})

export const onRequestEfectosFailed = (response) => ({
  type: REQUEST_EFECTOS_FAILED,
  payload: response
})
