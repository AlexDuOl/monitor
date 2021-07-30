import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import {REQUEST_EFECTOS} from '../constants/action_types'
import {ENDPOINT_EFECTOS} from '../constants/endpoints'

import {
  onRequestEfectosSuccess,
  onRequestEfectosFailed
} from '../actions/efectos'

function *fetchEfectos () {
  try {
    const url = `${ENDPOINT_EFECTOS}?id=gt=1`

    const response = yield call(axios.get, url)

    yield put(onRequestEfectosSuccess(response))
  } catch (e) {
    yield put(onRequestEfectosFailed(e.response))
  }
}

export function *watchRequestEfectos() {
  yield takeEvery(REQUEST_EFECTOS, fetchEfectos)
}
