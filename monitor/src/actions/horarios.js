import {
  REQUEST_PRECIOS_UPDATE,
  REQUEST_PRECIOS_UPDATE_SUCCESS,
  REQUEST_PRECIOS_UPDATE_FAILED,
  REQUEST_HORARIOS_RUTA,
  REQUEST_HORARIOS_RUTA_SUCCESS,
  REQUEST_HORARIOS_RUTA_FAILED,
  REQUEST_HORARIOS_RUTA_UPDATE
} from '../constants/action_types'

export const requestPreciosUpdate = (params) => ({
  type: REQUEST_PRECIOS_UPDATE,
  payload: { params }
})

export const onRequestPreciosUpdateSuccess = (response) => ({
  type: REQUEST_PRECIOS_UPDATE_SUCCESS,
  payload: response
})

export const onRequestPreciosUpdateFailed = (response) => ({
  type: REQUEST_PRECIOS_UPDATE_FAILED,
  payload: response
})

export const requestHorariosRuta = (idRuta) => ({
  type: REQUEST_HORARIOS_RUTA,
  payload: idRuta
})

export const requestHorariosRutaUpdate = (idRuta, desde, hasta, params) => ({
  type: REQUEST_HORARIOS_RUTA_UPDATE,
  payload: {idRuta, desde, hasta, params}
})

export const onRequestHorariosRutaSuccess = (response) => ({
  type: REQUEST_HORARIOS_RUTA_SUCCESS,
  payload: response
})

export const onRequestHorariosRutaFailed = (response) => ({
  type: REQUEST_HORARIOS_RUTA_FAILED,
  payload: response
})
