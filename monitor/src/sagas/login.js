import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { REQUEST_LOGIN } from '../constants/action_types'
import { ENDPOINT_LOGIN } from '../constants/endpoints'

import {
  onLoginSuccess,
  onLoginFailed
} from '../actions/login'

function *postLoginRequest({ payload: { params }}) {
  try {
    const response = yield call(axios.post, ENDPOINT_LOGIN, params)

    yield put(onLoginSuccess(response))
  } catch (e) {
    yield put(onLoginFailed(e.response))
  }
}


export function *watchPostLoginRequest() {
  yield takeEvery(REQUEST_LOGIN, postLoginRequest)
}
