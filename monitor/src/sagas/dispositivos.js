import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import {
  REQUEST_DISPOSITIVOS
} from '../constants/action_types'

import {
  ENDPOINT_DISPOSITIVOS
} from '../constants/endpoints'

import {
  onRequestDispositivosSuccess,
  onRequestDispositivosFailed
} from '../actions/dispositivos'

function *fetchDispositivos ({ payload: { params }}) {
  try {
    const url = `${ENDPOINT_DISPOSITIVOS}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(onRequestDispositivosSuccess(response))

  } catch (e) {
    yield put(onRequestDispositivosFailed(e.response))
  }
}

export function *watchRequestDispositivos () {
  yield takeEvery(REQUEST_DISPOSITIVOS, fetchDispositivos)
}
