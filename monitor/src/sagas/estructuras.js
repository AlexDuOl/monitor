import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { ENDPOINT_ESTRUCTURAS } from '../constants/endpoints'

import { REQUEST_ESTRUCTURAS } from '../constants/action_types'

import {
  onEstructurasRequestSuccess,
  onEstructurasRequestFailed
} from '../actions/estructuras'

function *fetchEstructuras({ payload: { params } }) {
  try {
    const url = `${ENDPOINT_ESTRUCTURAS}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(onEstructurasRequestSuccess(response))
  } catch (e) {
    yield put(onEstructurasRequestFailed(e.response))
  }
}

export function *watchEstructurasRequest () {
  yield takeEvery(REQUEST_ESTRUCTURAS, fetchEstructuras)
}
