import {
  INICIAR_RELOJ,
  DETENER_RELOJ
} from '../constants/action_types'

export const iniciarReloj = () => ({
  type: INICIAR_RELOJ
})

export const detenerReloj = () => ({
  type: DETENER_RELOJ
})
