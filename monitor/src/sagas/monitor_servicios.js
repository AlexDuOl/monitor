import axios from 'axios'
import moment from 'moment'
import { take, takeEvery, put, call, fork, cancel } from 'redux-saga/effects'

import { ENDPOINT_SERVICIOS_PROGRAMADOS } from '../constants/endpoints'
import {
  TICK,
  INICIAR_MONITOR,
  DETENER_MONITOR,
  REQUEST_SERVICIOS
} from '../constants/action_types'

import {
  requestServicios,
  onServiciosRequestSuccess,
  onServiciosRequestFailed
} from '../actions/servicios'

function *fetchServicios ({payload: { params }}) {
  try {

    const url = `${ENDPOINT_SERVICIOS_PROGRAMADOS}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(onServiciosRequestSuccess(response))
  } catch (e) {
    yield put(onServiciosRequestFailed(e.response))
  }
}

function *refrescarMonitor () {
  while (true) {
    yield take(TICK)

    yield put(requestServicios([
      `desde=${moment().subtract(1, 'h').format('YYYY-MM-DD HH:mm:ss')}`,
      `hasta=${moment().add(1, 'h').format('YYYY-MM-DD HH:mm:ss')}`
    ]))
  }
}

export function *watchRequestServiciosMonitor () {
  while (yield take(INICIAR_MONITOR)) {
    yield put(requestServicios([
      `desde=${moment().subtract(1, 'h').format('YYYY-MM-DD HH:mm:ss')}`,
      `hasta=${moment().add(1, 'h').format('YYYY-MM-DD HH:mm:ss')}`
    ]))

    /*yield put(requestServicios([
      `desde=${moment().format('YYYY-MM-DD 00:00:00')}`,
      `hasta=${moment().format('YYYY-MM-DD 23:59:59')}`
    ]))*/

    const bgSyncTask = yield fork(refrescarMonitor)

    yield take(DETENER_MONITOR)

    yield cancel(bgSyncTask)
  }
}

export function *watchFetchServicios () {
  yield takeEvery(REQUEST_SERVICIOS, fetchServicios)
}
