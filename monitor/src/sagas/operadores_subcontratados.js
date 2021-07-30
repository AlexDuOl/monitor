import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { ENDPOINT_SUBCONTRATADOS } from '../constants/endpoints'
import { REQUEST_SUBCONTRATADOS } from '../constants/action_types'

import {
  onSubcontratadosRequestSuccess,
  onSubcontratadosRequestFailed
} from '../actions/operadores_subcontratados'

function *fetchOperadoresSubcontratados ({ payload: { params } }) {
  try {
    const url = `${ENDPOINT_SUBCONTRATADOS}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(onSubcontratadosRequestSuccess(response))
  } catch (e) {
    yield put(onSubcontratadosRequestFailed(e.response))
  }
}

export function *watchRequestOperadoresSubcontratados() {
  yield takeEvery(REQUEST_SUBCONTRATADOS, fetchOperadoresSubcontratados)
}
