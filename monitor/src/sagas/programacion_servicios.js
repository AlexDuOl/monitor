import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { ENDPOINT_PROGRAMAR_SERVICIOS } from '../constants/endpoints'
import { REQUEST_PROGRAMAR_SERVICIOS } from '../constants/action_types'

import {
  onProgramarServiciosSuccess,
  onProgramarServiciosFailed
} from '../actions/programacion_servicios'


function *postProgramarServicios({ payload: { params } }) {
  try {
    const response = yield call(axios.post, ENDPOINT_PROGRAMAR_SERVICIOS, params)

    yield put(onProgramarServiciosSuccess(response))
  } catch (e) {
    yield put(onProgramarServiciosFailed(e.response))
  }
}

export function *watchPostProgramarServicios() {
  yield takeEvery(REQUEST_PROGRAMAR_SERVICIOS, postProgramarServicios)
}
