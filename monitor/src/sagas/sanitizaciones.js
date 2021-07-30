import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { requestSanitizacionesSuccess,requestSanitizacionesFailed} from '../actions/sanitizaciones'

import { ENDPOINT_SANITIZACIONES} from '../constants/endpoints'
import { REQUEST_SANITIZACIONES } from '../constants/action_types'

function *fetchSanitizaciones ({ payload: { params } }) {
  try {
    

    const url = `${ENDPOINT_SANITIZACIONES}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(requestSanitizacionesSuccess(response))
  } catch (e) {
    yield put(requestSanitizacionesFailed(e.response))
  }
}

export function *watchFetchSanitizaciones () {
  yield takeEvery(REQUEST_SANITIZACIONES, fetchSanitizaciones)
}
