import axios from 'axios'
import { take, takeEvery, put, call, fork, cancel } from 'redux-saga/effects'

import { ENDPOINT_UNIDADES } from '../constants/endpoints'
import { REQUEST_POSICION_UNIDADES, TICK } from '../constants/action_types'

import {
  requestPosicionUnidades,
  onPosicionUnidadesRequestSuccess,
  onPosicionUnidadesRequestFailed
} from '../actions/unidades_posicion'

function *fetchPosicionUnidades () {
  try {
    const url = `${ENDPOINT_UNIDADES}/unidadesSuma/posicion`

    const response = yield call(axios.get, url)

    yield put(onPosicionUnidadesRequestSuccess(response))
  } catch (e) {
    yield put(onPosicionUnidadesRequestFailed(e.response))
  }
}

function *refrescarPosicionUnidades () {
  while (true) {
    yield take(TICK)

    yield put(requestPosicionUnidades())
  }
}

export function *watchRequestPosicionUnidades() {
  const bgSyncTask = yield fork(refrescarPosicionUnidades)

  //yield cancel(bgSyncTask)
}

export function *watchFetchPosicionUnidades() {
  yield takeEvery(REQUEST_POSICION_UNIDADES, fetchPosicionUnidades)
}
