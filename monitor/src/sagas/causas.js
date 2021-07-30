import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { REQUEST_CAUSAS } from '../constants/action_types'
import {ENDPOINT_CAUSAS } from '../constants/endpoints'

import {
  onRequestCausasSuccess,
  onRequestCausasFailed
} from '../actions/causas'

function *fetchCausas () {
  try {
    const url = `${ENDPOINT_CAUSAS}?id=gt=1`

    const response = yield call(axios.get, url)

    yield put(onRequestCausasSuccess(response))
  } catch (e) {
    yield put(onRequestCausasFailed(e.response))
  }
}

export function *watchRequestCausas() {
  yield takeEvery(REQUEST_CAUSAS, fetchCausas)
}
