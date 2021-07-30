import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED,
  INVALIDAR_LOGIN
} from '../constants/action_types'

import Usuario from '../modelos/Usuario'

const initialState = {
  user: null,
  fetching: false,
  error: null,
  received_date: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        fetching: true
      }
    case REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        user: new Usuario(action.payload.data.data),
        fetching: false,
        error: null,
        received_date: Date.now()
      };
    case REQUEST_LOGIN_FAILED:
      return {
        ...state,
        user: null,
        fetching: false,
        error: action.payload,
        received_date: Date.now()
      }
    case INVALIDAR_LOGIN:
      return {
        ...initialState
      }
    default:
      return state
  }
}
