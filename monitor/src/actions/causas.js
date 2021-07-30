import {
  REQUEST_CAUSAS,
  REQUEST_CAUSAS_FAILED,
  REQUEST_CAUSAS_SUCCESS
} from '../constants/action_types'

export const requestCausas = () => ({
  type: REQUEST_CAUSAS
})

export const onRequestCausasSuccess = (response) => ({
  type: REQUEST_CAUSAS_SUCCESS,
  payload: response
})

export const onRequestCausasFailed = (response) => ({
  type: REQUEST_CAUSAS_FAILED,
  payload: response
})
