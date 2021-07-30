import {
    REQUEST_AUDITORIAS,
    REQUEST_AUDITORIAS_SUCCESS,
    REQUEST_AUDITORIAS_FAILED,
    START_CREATE_AUDITORIA,
    END_CREATE_AUDITORIA,
    REQUEST_CREATE_AUDITORIA,
    REQUEST_CREATE_AUDITORIA_SUCCESS,
    REQUEST_CREATE_AUDITORIA_FAILED,
} from "../constants/action_types";

export const requestAuditorias = (params) => {
    return {
        type: REQUEST_AUDITORIAS,
        payload: { params }
    }
}

export const onRequestAuditoriasSuccess = (response) => {
    return {
        type: REQUEST_AUDITORIAS_SUCCESS,
        payload: response
    }
}

export const onRequestAuditoriasFailed = (response) => {
    return {
        type: REQUEST_AUDITORIAS_FAILED,
        payload: response
    }
}

export const startCreateAuditoria = () => {
    return {
        type: START_CREATE_AUDITORIA,
    }
}

export const endCreateAuditoria = () => {
    return {
        type: END_CREATE_AUDITORIA,
    }
}

export const requestCreateAuditoria = (params) => {
    return {
        type: REQUEST_CREATE_AUDITORIA,
        payload: { params }
    }
}

export const onRequestCreateAuditoriaSuccess = (response) => {
    return {
        type: REQUEST_CREATE_AUDITORIA_SUCCESS,
        payload: response
    }
}

export const onRequestCreateAuditoriaFailed = (response) => {
    return {
        type: REQUEST_CREATE_AUDITORIA_FAILED,
        payload: response
    }
}