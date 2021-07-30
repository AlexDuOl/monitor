import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED,
  INVALIDAR_LOGIN
} from '../constants/action_types'


export const requestLogin = (params) => ({
  type: REQUEST_LOGIN,
  payload: {
    params
  }
})


export const onLoginSuccess = (response) => ({
  type: REQUEST_LOGIN_SUCCESS,
  payload: response
})


export const onLoginFailed = (response) => ({
  type: REQUEST_LOGIN_FAILED,
  payload: response
})


export const invalidarLogin = () => ({
  type: INVALIDAR_LOGIN
})
