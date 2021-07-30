import {
  REQUEST_BITACORAS,
  REQUEST_BITACORAS_SUCCESS,
  REQUEST_BITACORAS_FAILED,

  INICIAR_DESCONFIRMAR_BITACORA,
  FINALIZAR_DESCONFIRMAR_BITACORA,
  REQUEST_DESCONFIRMAR_BITACORA,
  REQUEST_DESCONFIRMAR_BITACORA_SUCCESS,
  REQUEST_DESCONFIRMAR_BITACORA_FAILED,

  INICIAR_CANCELACION_SERVICIO,
  FINALIZAR_CANCELACION_SERVICIO,
  REQUEST_CANCELAR_SERVICIO,
  REQUEST_CANCELAR_SERVICIO_SUCCESS,
  REQUEST_CANCELAR_SERVICIO_FAILED,

  INICIAR_RESCATE_SERVICIO,
  FINALIZAR_RESCATE_SERVICIO,
  REQUEST_RESCATE_SERVICIO,
  REQUEST_RESCATE_SERVICIO_SUCCESS,
  REQUEST_RESCATE_SERVICIO_FAILED,

  INICIAR_INCIDENTE_SERVICIO,
  FINALIZAR_INCIDENTE_SERVICIO,
  REQUEST_INCIDENTE_SERVICIO,
  REQUEST_INCIDENTE_SERVICIO_SUCCESS,
  REQUEST_INCIDENTE_SERVICIO_FAILED,
  REQUEST_INVALIDAR_BITACORAS,

  INICIAR_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO,
  FINALIZAR_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO,
  REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO,
  REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO_SUCCESS,
  REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO_FAILED,

  INICIAR_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO,
  FINALIZAR_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO,
  REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO,
  REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO_SUCCESS,
  REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO_FAILED,

} from '../constants/action_types'

// REQUEST - BITACORAS

export const requestBitacoras = (params) => ({
  type: REQUEST_BITACORAS,
  payload: { params }
})

export const onRequestBitacorasSuccess = (response) => ({
  type: REQUEST_BITACORAS_SUCCESS,
  payload: response
})

export const onRequestBitacorasFailed = (response) => ({
  type: REQUEST_BITACORAS_FAILED,
  payload: response
})

export const onInvalidarBitacoras = () => ({
  type: REQUEST_INVALIDAR_BITACORAS
})

// DESCONFIRMAR - BITACORA

export const onIniciarDesconfirmar = (bitacora) => {
  return {
    type: INICIAR_DESCONFIRMAR_BITACORA,
    payload: bitacora
  }
}

export const onFinalizarDesconfirmar = () => {
  return {
    type: FINALIZAR_DESCONFIRMAR_BITACORA
  }
}

export const onRequesDesconfirmarBitacora = (idBitacora, params) => {
  return {
    type: REQUEST_DESCONFIRMAR_BITACORA,
    payload: { idBitacora, params }
  }
}

export const onRequesDesconfirmarBitacoraSuccess = (response) => {
  return {
    type: REQUEST_DESCONFIRMAR_BITACORA_SUCCESS,
    payload: response
  }
}

export const onRequesDesconfirmarBitacoraFailed = (response) => {
  return {
    type: REQUEST_DESCONFIRMAR_BITACORA_FAILED,
    payload: response
  }
}

// CANCELACION - BITACORA

export const onIniciarCancelacion = (bitacora) => {
  return {
    type: INICIAR_CANCELACION_SERVICIO,
    payload: bitacora
  }
}

export const onFinalizarCancelacion = () => {
  return {
    type: FINALIZAR_CANCELACION_SERVICIO
  }
}

export const onRequesCancelarServicio = (idBitacora, params) => {
  return {
    type: REQUEST_CANCELAR_SERVICIO,
    payload: { idBitacora, params }
  }
}

export const onRequesCancelarServicioSuccess = (response) => {
  return {
    type: REQUEST_CANCELAR_SERVICIO_SUCCESS,
    payload: response
  }
}

export const onRequesCancelarServicioFailed = (response) => {
  return {
    type: REQUEST_CANCELAR_SERVICIO_FAILED,
    payload: response
  }
}

// RESCATE - SERVICIO - BITACORA

export const onIniciarRescateServicio = (bitacora) => {
  return {
    type: INICIAR_RESCATE_SERVICIO,
    payload: bitacora
  }
}

export const onFinalizarRescateServicio = () => {
  return {
    type: FINALIZAR_RESCATE_SERVICIO
  }
}

export const onRequestRescateServicio = (idBitacora, params) => {
  return {
    type: REQUEST_RESCATE_SERVICIO,
    payload: { idBitacora, params }
  }
}

export function onRequestRescateServicioSuccess(response) {
  return {
    type: REQUEST_RESCATE_SERVICIO_SUCCESS,
    payload: response
  }
}

export function onRequestRescateServicioFailed(response) {
  return {
    type: REQUEST_RESCATE_SERVICIO_FAILED,
    payload: response
  }
}

// INCIDENTE - SERVICIO - BITACORA

export const onIniciarIncidenteServicio = (bitacora) => {
  return {
    type: INICIAR_INCIDENTE_SERVICIO,
    payload: bitacora
  }
}

export const onFinalizarIncidenteServicio = () => {
  return {
    type: FINALIZAR_INCIDENTE_SERVICIO
  }
}

export const onRequestIncidenteServicio = (idBitacora, params) => {
  return {
    type: REQUEST_INCIDENTE_SERVICIO,
    payload: { idBitacora, params }
  }
}

export function onRequestIncidenteServicioSuccess(response) {
  return {
    type: REQUEST_INCIDENTE_SERVICIO_SUCCESS,
    payload: response
  }
}

export function onRequestIncidenteServicioFailed(response) {
  return {
    type: REQUEST_INCIDENTE_SERVICIO_FAILED,
    payload: response
  }
}

// CAMBIO - INDIVIDUAL - PRECIO

export const onIniciarCambioIndividualPrecio = (bitacora) => {
  return {
    type: INICIAR_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO,
    payload: bitacora
  }
}

export const onFinalizarCambioIndividualPrecio = () => {
  return {
    type: FINALIZAR_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO
  }
}

export const onRequestCambioIndividualPrecio = (idBitacora, params) => {
  return {
    type: REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO,
    payload: { idBitacora, params }
  }
}

export const onRequestCambioIndividualPrecioSuccess = (response) => {
  return {
    type: REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO_SUCCESS,
    payload: response
  }
}

export const onRequestCambioIndividualPrecioFailed = (response) => {
  return {
    type: REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO_FAILED,
    payload: response
  }
}

// CAMBIO - INDIVIDUAL - HORARIO

export const onIniciarCambioIndividualHorario = (bitacora) => {
  return {
    type: INICIAR_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO,
    payload: bitacora
  }
}

export const onFinalizarCambioIndividualHorario = () => {
  return {
    type: FINALIZAR_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO
  }
}

export const onRequestCambioIndividualHorario= (idBitacora, params) => {
  return {
    type: REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO,
    payload: { idBitacora, params }
  }
}

export const onRequestCambioIndividualHorarioSuccess = (response) => {
  return {
    type: REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO_SUCCESS,
    payload: response
  }
}

export const onRequestCambioIndividualHorarioFailed = (response) => {
  return {
    type: REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO_FAILED,
    payload: response
  }
}