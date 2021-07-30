import Cliente from '../modelos/Cliente'

import {
  REQUEST_CLIENTES,
  REQUEST_SUCCESS_CLIENTES,
  REQUEST_FAILED_CLIENTES,
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
    case REQUEST_CLIENTES:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_SUCCESS_CLIENTES:
      return {
        ...state,
        fetching: false,
        all: action.payload.data.map(d => new Cliente(d.data)),
        received_date: Date.now()
      }
    case REQUEST_FAILED_CLIENTES:
      return {
        ...initialState,
        error: {
          cause: action.payload
        }
      }
    default:
      return state
  }
}
