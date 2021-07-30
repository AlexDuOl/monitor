import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { ENDPOINT_TRANSFERENCIAS } from '../constants/endpoints'
import { REQUEST_TRANSFERIR_SERVICIOS } from '../constants/action_types'

import {
  onTransferirServiciosRequestSuccess,
  onTransferirServiciosRequestFailed
} from '../actions/transferencias'

function *putTransferencias ({ payload: { params }}) {
  try {
    const response = yield call(axios.put, ENDPOINT_TRANSFERENCIAS, params)

    yield put(onTransferirServiciosRequestSuccess(response))
  } catch (e) {
    yield put(onTransferirServiciosRequestFailed(e.response))
  }
}

export function *watchPutTransferencias () {
  yield takeEvery(REQUEST_TRANSFERIR_SERVICIOS, putTransferencias)
}
