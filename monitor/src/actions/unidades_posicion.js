import {
  REQUEST_POSICION_UNIDADES,
  REQUEST_POSICION_UNIDADES_SUCCESS,
  REQUEST_POSICION_UNIDADES_FAILED
} from '../constants/action_types'

export const requestPosicionUnidades = () => ({
  type: REQUEST_POSICION_UNIDADES
})

export const onPosicionUnidadesRequestSuccess = (response) => ({
  type: REQUEST_POSICION_UNIDADES_SUCCESS,
  payload: response
})

export const onPosicionUnidadesRequestFailed = (response) => ({
  type: REQUEST_POSICION_UNIDADES_FAILED,
  payload: response
})
