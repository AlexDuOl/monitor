import moment from 'moment'

import {
  INICIAR_RELOJ,
  DETENER_RELOJ,
  DETENIDO,
  INICIADO,
  TICK
} from '../constants/action_types'

const initialState = {
  status: DETENIDO,
  tiempo: moment()
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INICIAR_RELOJ:
      return {
        ...state,
        status: INICIADO
      }
    case DETENER_RELOJ:
      return {
        ...state,
        status: DETENIDO
      }
    case TICK:
      return {
        ...state,
        tiempo: action.payload
      }
    default:
      return state
  }
}
