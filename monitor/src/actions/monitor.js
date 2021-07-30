import {
  INICIAR_MONITOR,
  DETENER_MONITOR
} from '../constants/action_types'

export const iniciarMonitor = () => {
  return {
    type: INICIAR_MONITOR
  }
}

export const detenerMonitor = () => {
  return {
    type: DETENER_MONITOR
  }
}
