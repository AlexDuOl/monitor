import Operador from '../modelos/Operador'

import {
  REQUEST_OPERADORES,
  REQUEST_OPERADORES_SUCCESS,
  REQUEST_OPERADORES_FAILED,
  INVALIDAR_OPERADORES
} from '../constants/action_types'

const initialState = {
  all: [],
  selected: [],
  fetching: false,
  error: null,
  received_date: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_OPERADORES:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_OPERADORES_SUCCESS:
      return {
        ...state,
        fetching: false,
        all: action.payload.data.map(d => new Operador(d.data)),
        received_date: Date.now()
      }
    case REQUEST_OPERADORES_FAILED:
      return {
        ...initialState,
        error: {
          cause: action.payload
        }
      }
    case INVALIDAR_OPERADORES:
      return { ...initialState }
    default:
      return state
  }
}
