import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { REQUEST_OPERADORES } from '../constants/action_types'
import { ENDPOINT_OPERADORES } from '../constants/endpoints'

import {
  onOperadoresRequestSuccess,
  onOperadoresRequestFailed
} from '../actions/operadores'

function *fetchOperadores ({ payload: { params }}) {
  try {
    const url = `${ENDPOINT_OPERADORES}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(onOperadoresRequestSuccess(response))
  } catch (e) {
    yield put(onOperadoresRequestFailed(e.response))
  }
}

export function *watchRequestOperadores() {
  yield takeEvery(REQUEST_OPERADORES, fetchOperadores)
}
