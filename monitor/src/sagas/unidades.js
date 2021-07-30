import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { requestUnidadesSuccess, requestUnidadesFailed} from '../actions/unidades'

import { ENDPOINT_UNIDADES } from '../constants/endpoints'
import { REQUEST_UNIDADES} from '../constants/action_types'

function *fetchUnidades({ payload: { params } }) {
  try {
    const url = `${ENDPOINT_UNIDADES}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(requestUnidadesSuccess(response))
  } catch (e) {
    yield put(requestUnidadesFailed(e.response))
  }
}

export function *watchFetchUnidades () {
  yield takeEvery(REQUEST_UNIDADES, fetchUnidades)
}
