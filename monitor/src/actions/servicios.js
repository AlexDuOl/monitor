import {
  REQUEST_SERVICIOS,
  REQUEST_SUCCESS_SERVICIOS,
  REQUEST_FAILED_SERVICIOS,
  INVALIDAR_SERVICIOS,
  AGREGAR_A_SELECCION,
  REMOVER_DE_SELECCION,
  LIMPIAR_SELECCION,
  INICIAR_TRANSFERENCIA_SERVICIO,
  FINALIZAR_TRANSFERENCIA_SERVICIO
} from '../constants/action_types'

export const requestServicios = (params) => ({
  type: REQUEST_SERVICIOS,
  payload: { params }
})

export const onServiciosRequestSuccess = (response) => ({
  type: REQUEST_SUCCESS_SERVICIOS,
  payload: response
})

export const onServiciosRequestFailed = (response) => ({
  type: REQUEST_FAILED_SERVICIOS,
  payload: response
})

export const invalidarServicios = () => ({
  type: INVALIDAR_SERVICIOS
})

export const agregarASeleccion = (values) => ({
  type: AGREGAR_A_SELECCION,
  payload: { values }
})

export const removerDeSeleccion = (values) => ({
  type: REMOVER_DE_SELECCION,
  payload: { values }
})

export const limpiarSeleccion = () => ({
  type: LIMPIAR_SELECCION
})

export const iniciarTransferenciaServicio = (id) => {
  return {
    type: INICIAR_TRANSFERENCIA_SERVICIO,
    payload: id
  }
}

export const finalizarTransferenciaServicio = () => {
  return {
    type: FINALIZAR_TRANSFERENCIA_SERVICIO
  }
}
