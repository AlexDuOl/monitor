import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'

import {
  REQUEST_BITACORAS,
  REQUEST_DESCONFIRMAR_BITACORA,
  REQUEST_CANCELAR_SERVICIO, 
  REQUEST_INCIDENTE_SERVICIO, 
  REQUEST_RESCATE_SERVICIO,
  REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO,
  REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO,
} from '../constants/action_types'

import {
  ENDPOINT_BITACORAS
} from '../constants/endpoints'

import {
  onRequestBitacorasSuccess,
  onRequestBitacorasFailed,

  onRequesDesconfirmarBitacoraSuccess,
  onRequesDesconfirmarBitacoraFailed,

  onRequesCancelarServicioSuccess,
  onRequesCancelarServicioFailed,

  onRequestRescateServicioSuccess,
  onRequestRescateServicioFailed,

  onRequestIncidenteServicioSuccess,
  onRequestIncidenteServicioFailed,

  onRequestCambioIndividualPrecioSuccess,
  onRequestCambioIndividualPrecioFailed,

  onRequestCambioIndividualHorarioSuccess,
  onRequestCambioIndividualHorarioFailed,

} from '../actions/bitacoras'

function* fetchBitacoras({payload: {params}}) {
  try {
    const url = `${ENDPOINT_BITACORAS}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(onRequestBitacorasSuccess(response))

  } catch (e) {

    yield put(onRequestBitacorasFailed(e.response))
  }
}

function* requestDesconfirmarBitacora({payload: {idBitacora, params}}) {

  try {
    const url = `${ENDPOINT_BITACORAS}/${idBitacora}/reset`

    const response = yield call(axios.post, url, params)

    yield put(onRequesDesconfirmarBitacoraSuccess(response))

  } catch (e) {

    yield put(onRequesDesconfirmarBitacoraFailed(e.response))
  }
}

function* requestCancelarServicio({payload: {idBitacora, params}}) {
  
  try {
    const url = `${ENDPOINT_BITACORAS}/${idBitacora}/cancelar`

    const response = yield call(axios.post, url, params)

    yield put(onRequesCancelarServicioSuccess(response))

  } catch (e) {

    yield put(onRequesCancelarServicioFailed(e.response))
  }
}

function* requestRescateServicio({payload: {idBitacora, params}}) {
  try {
    const url = `${ENDPOINT_BITACORAS}/${idBitacora}/rescate`

    const response = yield call(axios.post, url, params)

    yield put(onRequestRescateServicioSuccess(response))

  } catch (e) {

    yield put(onRequestRescateServicioFailed(e.response))
  }
}

function* requestIncidenteServicio({payload: {idBitacora, params}}) {
  try {
    const url = `${ENDPOINT_BITACORAS}/${idBitacora}/incidente`
    const response = yield call(axios.post, url, params)
    yield put(onRequestIncidenteServicioSuccess(response))

  } catch (e) {
    yield put(onRequestIncidenteServicioFailed(e.response))
  }
}

function* requestCambioIndividualPrecio({payload: {idBitacora, params}}) {

  try {
    const url = `${ENDPOINT_BITACORAS}/${idBitacora}`

    const response = yield call(axios.put, url, params)

    yield put(onRequestCambioIndividualPrecioSuccess(response))

  } catch (e) {

    yield put(onRequestCambioIndividualPrecioFailed(e.response))
  }
}

function* requestCambioIndividualHorario({payload: {idBitacora, params}}) {

  try {
    const url = `${ENDPOINT_BITACORAS}/${idBitacora}`
    console.log(params)
    const response = yield call(axios.put, url, params)

    yield put(onRequestCambioIndividualHorarioSuccess(response))

  } catch (e) {

    yield put(onRequestCambioIndividualHorarioFailed(e.response))
  }
}

export function* watchRequestBitacoras() {
  yield takeEvery(REQUEST_BITACORAS, fetchBitacoras)
}

export function* watchRequestDesconfirmarBitacora() {
  yield takeEvery(REQUEST_DESCONFIRMAR_BITACORA, requestDesconfirmarBitacora)
}

export function* watchRequestCancelarServicio() {
  yield takeEvery(REQUEST_CANCELAR_SERVICIO, requestCancelarServicio)
}

export function* watchtRequestRescateServicio() {
  yield takeEvery(REQUEST_RESCATE_SERVICIO, requestRescateServicio)
}

export function* watchtRequestIncidenteServicio() {
  yield takeEvery(REQUEST_INCIDENTE_SERVICIO, requestIncidenteServicio)
}

export function* watchRequestCambioIndividualPrecio() {
  yield takeEvery(REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO, requestCambioIndividualPrecio)
}

export function* watchRequestCambioIndividualHorario() {
  yield takeEvery(REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO, requestCambioIndividualHorario)
}