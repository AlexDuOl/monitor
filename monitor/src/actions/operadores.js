import {
  REQUEST_OPERADORES,
  REQUEST_OPERADORES_SUCCESS,
  REQUEST_OPERADORES_FAILED,
  INVALIDAR_OPERADORES
} from '../constants/action_types'

export const requestOperadores = (params) => ({
  type: REQUEST_OPERADORES,
  payload: {params}
})

export const onOperadoresRequestSuccess = (response) => ({
  type: REQUEST_OPERADORES_SUCCESS,
  payload: response
})

export const onOperadoresRequestFailed = (response) => ({
  type: REQUEST_OPERADORES_FAILED,
  payload: response
})

export const invalidarOperadores = () => ({
  type: INVALIDAR_OPERADORES
})
