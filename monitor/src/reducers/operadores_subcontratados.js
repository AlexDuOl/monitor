import Operador from '../modelos/Operador'

import {
  REQUEST_SUBCONTRATADOS,
  REQUEST_SUBCONTRATADOS_SUCCESS,
  REQUEST_SUBCONTRATADOS_FAILED,
  INVALIDAR_SUBCONTRATADOS
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
    case REQUEST_SUBCONTRATADOS:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_SUBCONTRATADOS_SUCCESS:
      return {
        ...state,
        fetching: false,
        all: action.payload.data.map(d => new Operador(d.data)),
        received_date: Date.now()
      }
    case REQUEST_SUBCONTRATADOS_FAILED:
      return {
        ...initialState,
        error: {
          cause: action.payload
        }
      }
    case INVALIDAR_SUBCONTRATADOS:
      return {
        ...initialState
      }
    default:
      return state
  }
}
