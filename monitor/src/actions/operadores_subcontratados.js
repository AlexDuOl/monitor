import {
  REQUEST_SUBCONTRATADOS,
  REQUEST_SUBCONTRATADOS_SUCCESS,
  REQUEST_SUBCONTRATADOS_FAILED,
  INVALIDAR_SUBCONTRATADOS
} from '../constants/action_types'

export const requestOperadoresSubcontratados = (params) => ({
  type: REQUEST_SUBCONTRATADOS,
  payload: { params }
})

export const onSubcontratadosRequestSuccess = (response) => ({
  type: REQUEST_SUBCONTRATADOS_SUCCESS,
  payload: response
})

export const onSubcontratadosRequestFailed = (response) => ({
  type: REQUEST_SUBCONTRATADOS_FAILED,
  payload: response
})

export const invalidarOperadoresSubcontratados = () => ({
  type: INVALIDAR_SUBCONTRATADOS
})
