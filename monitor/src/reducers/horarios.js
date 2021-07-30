import {
  REQUEST_PRECIOS_UPDATE,
  REQUEST_PRECIOS_UPDATE_SUCCESS,
  REQUEST_PRECIOS_UPDATE_FAILED,
  REQUEST_HORARIOS_RUTA,
  REQUEST_HORARIOS_RUTA_SUCCESS,
  REQUEST_HORARIOS_RUTA_FAILED, REQUEST_HORARIOS_RUTA_UPDATE
} from '../constants/action_types'

const initialState = {
  precios: {
    all: null,
    fetching: false,
    error: null,
    received_date: null
  },
  horarios_ruta: {
    turnos: null,
    tiempos: null,
    fetching: false,
    error: null,
    received_date: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRECIOS_UPDATE:
      return {
        ...state,
        precios: {
          ...state.precios,
          fetching: true
        }
      }
    case REQUEST_PRECIOS_UPDATE_SUCCESS:
      return {
        ...state,
        precios: {
          ...state.precios,
          fetching: false,
          error: null,
          all: action.payload.data,
          received_date: Date.now()
        }
      }
    case REQUEST_PRECIOS_UPDATE_FAILED:
      return {
        ...state,
        precios: {
          ...state.precios,
          fetching: false,
          error: action.payload.data,
          all: [],
          received_date: Date.now()
        }
      }
    case REQUEST_HORARIOS_RUTA_UPDATE:
    case REQUEST_HORARIOS_RUTA:
      return {
        ...state,
        horarios_ruta: {
          ...state.horarios_ruta,
          fetching: true
        }
      }
    case REQUEST_HORARIOS_RUTA_SUCCESS:
      return {
        ...state,
        horarios_ruta: {
          ...state.horarios_ruta,
          fetching: false,
          error: null,
          turnos: action.payload.data.turnos,
          tiempos: action.payload.data.tiempos,
          received_date: Date.now()
        }
      }
    case REQUEST_HORARIOS_RUTA_FAILED:
      return {
        ...state,
        horarios_ruta: {
          ...state.horarios_ruta,
          fetching: false,
          error: action.payload.data,
          all: [],
          received_date: Date.now()
        }
      }
    default:
      return state
  }
}
