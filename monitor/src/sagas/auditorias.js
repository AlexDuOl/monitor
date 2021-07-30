import axios from "axios";
import {takeEvery, call, put} from 'redux-saga/effects'

import {
    REQUEST_AUDITORIAS,
    REQUEST_CREATE_AUDITORIA,
} from "../constants/action_types";

import {
    ENDPOINT_AUDITORIAS,
} from "../constants/endpoints";

import {
    onRequestAuditoriasSuccess,
    onRequestAuditoriasFailed,
    onRequestCreateAuditoriaSuccess,
    onRequestCreateAuditoriaFailed,
} from "../actions/auditorias";

function* fetchAuditorias({payload: {params}}) {
    try {
        const url = `${ENDPOINT_AUDITORIAS}` + (params.length ? `?${params.join('&')}` : '')

        const response = yield call(axios.get, url)
        
        yield put(onRequestAuditoriasSuccess(response))
    } catch (e) {
        yield put(onRequestAuditoriasFailed(e.response))
    }
}

function* fetchCreateAuditoria({payload: {params}}) {  
    try {
        const response = yield call(axios.post, ENDPOINT_AUDITORIAS, params)
 
        yield put(onRequestCreateAuditoriaSuccess(response))
    } catch (e) {
        yield put(onRequestCreateAuditoriaFailed(e.response))
    }
}


export function* watchRequestAuditorias() {
    yield takeEvery(REQUEST_AUDITORIAS, fetchAuditorias)
}

export function* watchCreateAuditorias() {
    yield takeEvery(REQUEST_CREATE_AUDITORIA, fetchCreateAuditoria)
}