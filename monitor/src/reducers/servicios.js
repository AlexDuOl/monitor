import {
  REQUEST_SERVICIOS,
  REQUEST_SUCCESS_SERVICIOS,
  REQUEST_FAILED_SERVICIOS,
  INVALIDAR_SERVICIOS,
  AGREGAR_A_SELECCION,
  REMOVER_DE_SELECCION,
  LIMPIAR_SELECCION,
  INICIAR_TRANSFERENCIA_SERVICIO,
  FINALIZAR_TRANSFERENCIA_SERVICIO,
} from '../constants/action_types'

const initialState = {
  all: [],
  stats: [],
  selected: null,
  fetching: false,
  error: null,
  received_date: null,
  filtro_estatus: 0,
  transferencia: {
    id: -1
  },
  cancelar: {
    id: -1,
    error: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SERVICIOS:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_SUCCESS_SERVICIOS:
      return {
        ...state,
        all: action.payload.data.servicios,
        stats: action.payload.data.stats,
        fetching: false,
        received_date: Date.now()
      }
    case REQUEST_FAILED_SERVICIOS:
      return {
        ...initialState,
        error: {
          cause: action.payload
        }
      }
    case INVALIDAR_SERVICIOS:
      return {
        ...initialState
      }
    case AGREGAR_A_SELECCION:
      return {
        ...state,
        selected: action.payload.values
      }
    case REMOVER_DE_SELECCION:
      return {
        ...state,
        selected: action.payload.values
      }
    case LIMPIAR_SELECCION:
      return {
        ...state,
        selected: null
      }
    case INICIAR_TRANSFERENCIA_SERVICIO:
      return {
        ...state,
        transferencia: {
          id: action.payload
        }
      }
    case FINALIZAR_TRANSFERENCIA_SERVICIO:
      return {
        ...state,
        transferencia: {
          id: -1
        }
      }
    default:
      return state
  }
}
