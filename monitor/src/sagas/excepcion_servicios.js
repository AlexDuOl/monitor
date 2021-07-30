import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { ENDPOINT_BITACORAS } from '../constants/endpoints'
import { REQUEST_EXCEPCION_SERVICIO } from '../constants/action_types'

import {
  onExcepcionServicioSuccess,
  onExcepcionServicioFailed
} from '../actions/excepcion_servicios'

function *requestExcepcionServicio({ payload: { params }}) {
  try {
    const url = `${ENDPOINT_BITACORAS}/excepcion`

    const response = yield call(axios.post, url, params)

    yield put(onExcepcionServicioSuccess(response))

  } catch (e) {
    yield put(onExcepcionServicioFailed(e.response))
  }
}

export function *watchRequestExcepcionServicio () {
  yield takeEvery(REQUEST_EXCEPCION_SERVICIO, requestExcepcionServicio)
}
