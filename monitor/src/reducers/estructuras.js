import Estructura from '../modelos/Estructura'

import {
  REQUEST_ESTRUCTURAS,
  REQUEST_ESTRUCTURAS_SUCCESS,
  REQUEST_ESTRUCTURAS_FAILED,
  INVALIDATE_ESTRUCTURAS
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
    case REQUEST_ESTRUCTURAS:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_ESTRUCTURAS_SUCCESS:
      return {
        ...state,
        fetching: false,
        all: action.payload.data.map(d => new Estructura(d.data)),
        received_date: Date.now()
      }
    case REQUEST_ESTRUCTURAS_FAILED:
      return {
        ...initialState,
        error: {
          cause: action.payload
        }
      }
    case INVALIDATE_ESTRUCTURAS:
      return {
        ...initialState
      }
    default:
      return state
  }
}
