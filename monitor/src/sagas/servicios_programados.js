import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'
import {ENDPOINT_DETALLE_PROGRAMADOS} from "../constants/endpoints";

import {
  onRequestServiciosProgramadosFailed,
  onRequestServiciosProgramadosSuccess
} from "../actions/servicios_programados";
import {REQUEST_SERVICIOS_PROGRAMADOS} from "../constants/action_types";


function* fetchServiciosProgramados({payload: {params}}) {
  try {
    const url = `${ENDPOINT_DETALLE_PROGRAMADOS}` + (params.length ? `?${params.join('&')}` : '')

    const response = yield call(axios.get, url)

    yield put(onRequestServiciosProgramadosSuccess(response))

  } catch (e) {
    yield put(onRequestServiciosProgramadosFailed(e.response))
  }
}

export function* watchRequestServiciosProgramados() {
  yield takeEvery(REQUEST_SERVICIOS_PROGRAMADOS, fetchServiciosProgramados)
}
