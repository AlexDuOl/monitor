import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { ENDPOINT_PROVEEDORES } from '../constants/endpoints'
import { REQUEST_PROVEEDORES } from '../constants/action_types'

import {
  onProveedoresRequestSuccess,
  onProveedoresRequestFailed
} from '../actions/proveedores'

function *fetchProveedores ({ payload: { params } }) {
  try {
    const url =  `${ENDPOINT_PROVEEDORES}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(onProveedoresRequestSuccess(response))
  } catch (e) {
    yield put(onProveedoresRequestFailed(e.toString()))
  }
}

export function *watchRequestProveerdores() {
  yield takeEvery(REQUEST_PROVEEDORES, fetchProveedores)
}
