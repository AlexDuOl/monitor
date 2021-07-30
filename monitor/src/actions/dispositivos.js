import {
  REQUEST_DISPOSITIVOS,
  REQUEST_DISPOSITIVOS_SUCCESS,
  REQUEST_DISPOSITIVOS_FAILED
} from '../constants/action_types'

export const requestDispositivos = (params) => ({
  type: REQUEST_DISPOSITIVOS,
  payload: {
    params
  }
})

export const onRequestDispositivosSuccess = (response) => ({
  type: REQUEST_DISPOSITIVOS_SUCCESS,
  payload: response
})

export const onRequestDispositivosFailed = (response) => ({
  type: REQUEST_DISPOSITIVOS_FAILED,
  payload: response
})
