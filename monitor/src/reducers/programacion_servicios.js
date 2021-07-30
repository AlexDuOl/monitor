import {
  REQUEST_PROGRAMAR_SERVICIOS,
  REQUEST_PROGRAMAR_SERVICIOS_SUCCESS,
  REQUEST_PROGRAMAR_SERVICIOS_FAILED,
  REQUEST_EXCEPCION_SERVICIO,
  REQUEST_EXCEPCION_SERVICIO_SUCCESS,
  REQUEST_EXCEPCION_SERVICIO_FAILED
} from '../constants/action_types'

const initialState = {
  fetching: false,
  error: null,
  received_date: null,
  excepcion: {
    sending: false,
    error: null,
    response: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PROGRAMAR_SERVICIOS:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_PROGRAMAR_SERVICIOS_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
        fetching: false,
        received_date: Date.now()
      }
    case REQUEST_PROGRAMAR_SERVICIOS_FAILED:
      return {
        ...initialState,
        error: {
          cause: action.payload
        }
      }
    case REQUEST_EXCEPCION_SERVICIO:
      return {
        ...state,
        excepcion: {
          sending: true,
          error: null,
          response: null
        }
      }
    case REQUEST_EXCEPCION_SERVICIO_SUCCESS:
      return {
        ...state,
        excepcion: {
          sending: false,
          error: null,
          response: action.payload.response.data
        }
      }
    case REQUEST_EXCEPCION_SERVICIO_FAILED:
      return {
        ...state,
        excepcion: {
          sending: false,
          error: action.payload,
          response: null
        }
      }
    default:
      return state
  }
}
