import {
    REQUEST_REVISIONES,
    REQUEST_REVISIONES_SUCCESS,
    REQUEST_REVISIONES_FAILED,
    START_CREATE_REVISIONES,
    END_CREATE_REVISIONES,
    REQUEST_CREATE_REVISIONES,
    REQUEST_CREATE_REVISIONES_SUCCESS,
    REQUEST_CREATE_REVISIONES_FAILED,
} from "../constants/action_types";

export const requestRevisiones = (params) => {
    return {
        type: REQUEST_REVISIONES,
        payload: { params }
    }
}

export const onRequestRevisionesSuccess = (response) => {
    return {
        type: REQUEST_REVISIONES_SUCCESS,
        payload: response
    }
}

export const onRequestRevisionesFailed = (response) => {
    return {
        type: REQUEST_REVISIONES_FAILED,
        payload: response
    }
}

export const startCreateRevisiones = () => {
    return {
        type: START_CREATE_REVISIONES,
    }
}

export const endCreateRevisiones = () => {
    return {
        type: END_CREATE_REVISIONES,
    }
}

export const requestCreateRevisiones = (params) => {
    return {
        type: REQUEST_CREATE_REVISIONES,
        payload: { params }
    }
}

export const onRequestCreateRevisionesSuccess = (response) => {
    return {
        type: REQUEST_CREATE_REVISIONES_SUCCESS,
        payload: response
    }
}

export  const onRequestCreateRevisionesFailed = (response) => {
    return {
        type: REQUEST_CREATE_REVISIONES_FAILED,
        payload: response
    }
}