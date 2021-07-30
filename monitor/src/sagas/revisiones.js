import axios from "axios";
import {takeEvery, call, put} from 'redux-saga/effects'

import {
    REQUEST_REVISIONES,
    REQUEST_CREATE_REVISIONES,
} from "../constants/action_types";

import {
    ENDPOINT_REVISIONES,
} from "../constants/endpoints";

import {
    onRequestRevisionesSuccess,
    onRequestRevisionesFailed,
    onRequestCreateRevisionesSuccess,
    onRequestCreateRevisionesFailed,
} from "../actions/revisiones";

function* fetchRevisiones({payload: {params}}) {
    try {
        const url = `${ENDPOINT_REVISIONES}` + (params.length ? `?${params.join('&')}` : '')

        const response = yield call(axios.get, url)

        yield put(onRequestRevisionesSuccess(response))
    } catch (e) {
        yield put(onRequestRevisionesFailed(e.response))
    }
}

function* fetchCreateRevisiones({payload: {params}}) {
    try {
        const response = yield call(axios.post, ENDPOINT_REVISIONES, params)
        yield put(onRequestCreateRevisionesSuccess(response))
    } catch (e) {
        yield put(onRequestCreateRevisionesFailed(e.response))
    }
}

export function* watchRequestRevisiones() {
    yield takeEvery(REQUEST_REVISIONES, fetchRevisiones)
}

export function* watchCreateRevisiones() {
    yield takeEvery(REQUEST_CREATE_REVISIONES, fetchCreateRevisiones)
}