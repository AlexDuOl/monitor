import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { onClientesRequestSuccess, onClientesRequestFailed } from '../actions/clientes'

import { ENDPOINT_CLIENTES } from '../constants/endpoints'
import { REQUEST_CLIENTES } from '../constants/action_types'

function *fetchClientes ({ payload: { params } }) {
  try {
    const url = `${ENDPOINT_CLIENTES}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(onClientesRequestSuccess(response))
  } catch (e) {
    yield put(onClientesRequestFailed(e.response))
  }
}

export function *watchFetchClientes () {
  yield takeEvery(REQUEST_CLIENTES, fetchClientes)
}
