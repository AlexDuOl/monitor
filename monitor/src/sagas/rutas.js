import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { ENDPOINT_RUTAS } from '../constants/endpoints'
import { REQUEST_RUTAS } from '../constants/action_types'

import {
  onRutasRequestSuccess,
  onRutasRequestFailed
} from '../actions/rutas'

function *fetchRutas ({ payload: { params } }) {
  try {
    const url = `${ENDPOINT_RUTAS}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(onRutasRequestSuccess(response))
  } catch (e) {
    yield put(onRutasRequestFailed(e.response))
  }
}

export function *watchRequesFetchRutas() {
  yield takeEvery(REQUEST_RUTAS, fetchRutas)
}
