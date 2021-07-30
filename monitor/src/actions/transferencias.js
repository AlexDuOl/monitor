import {
  REQUEST_TRANSFERIR_SERVICIOS,
  REQUEST_TRANSFERIR_SERVICIOS_SUCCESS,
  REQUEST_TRANSFERIR_SERVICIOS_FAILED
} from '../constants/action_types'

export const requestTransferirServicios = (params) => ({
  type: REQUEST_TRANSFERIR_SERVICIOS,
  payload: { params }
})

export const onTransferirServiciosRequestSuccess = (response) => ({
  type: REQUEST_TRANSFERIR_SERVICIOS_SUCCESS,
  payload: response
})

export const onTransferirServiciosRequestFailed = (response) => ({
  type: REQUEST_TRANSFERIR_SERVICIOS_FAILED,
  payload: response
})
