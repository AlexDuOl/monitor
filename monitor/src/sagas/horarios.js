import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import {REQUEST_PRECIOS_UPDATE, REQUEST_HORARIOS_RUTA, REQUEST_HORARIOS_RUTA_UPDATE} from '../constants/action_types'
import {ENDPOINT_HORARIOS, ENDPOINT_HORARIOS_UPDATE, ENDPOINT_PRECIOS_UPDATE} from '../constants/endpoints'

import {
  onRequestPreciosUpdateSuccess,
  onRequestPreciosUpdateFailed,
  onRequestHorariosRutaSuccess,
  onRequestHorariosRutaFailed
} from '../actions/horarios'

function *putPrecios ({ payload: { params } }) {
  try {
    const url = `${ENDPOINT_PRECIOS_UPDATE}`

    const response = yield call(axios.put, url, params)

    yield put(onRequestPreciosUpdateSuccess(response))
  } catch (e) {
    yield put(onRequestPreciosUpdateFailed(e.response))
  }
}

function *fetchHorariosRuta ({ payload }) {
  try {
    const url = `${ENDPOINT_HORARIOS}/${payload}`

    const response = yield call(axios.get, url)

    yield put(onRequestHorariosRutaSuccess(response))
  } catch (e) {
    yield put(onRequestHorariosRutaFailed(e.response))
  }
}

function *putHorariosRuta ({payload: { idRuta, desde, hasta, params } }) {
  try {

    const url = `${ENDPOINT_HORARIOS_UPDATE}/${idRuta}?desde=${desde}&hasta=${hasta}`

    const response = yield call(axios.put, url, params)

    yield put(onRequestHorariosRutaSuccess(response))
  } catch (e) {
    yield put(onRequestHorariosRutaFailed(e.response))
  }
}

export function *watchRequestPreciosUpdate() {
  yield takeEvery(REQUEST_PRECIOS_UPDATE, putPrecios)
}

export function *watchRequestHorariosRuta() {
  yield takeEvery(REQUEST_HORARIOS_RUTA, fetchHorariosRuta)
}

export function *watchRequestHorariosRutaUpdate() {
  yield takeEvery(REQUEST_HORARIOS_RUTA_UPDATE, putHorariosRuta)
}
