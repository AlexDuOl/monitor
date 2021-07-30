import Auditoria from "../modelos/Auditoria";

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

import _ from "lodash";

const initialState = {
    all: [],
    selected: [],
    fetching: false,
    error: null,
    received_date: null,
    creating: {
        sending: false,
        error: null,
        openModal: false,
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_AUDITORIAS:
            return {
                ...state,
                fetching: true,
                error: null
            }
        case REQUEST_AUDITORIAS_SUCCESS: {
            return {
                ...state,
                all: action.payload.data.map(d => new Auditoria(d.data)),
                received_date: Date.now(),
                fetching: false
            }
        }
        case REQUEST_AUDITORIAS_FAILED:
            return {
                ...initialState,
                error: {
                    cause: action.payload
                },
                received_date: Date.now(),
                fetching: false
            }
        case START_CREATE_AUDITORIA:
            return {
                ...state,
                creating: {
                    ...state.creating,
                    openModal: true
                }
            }
        case END_CREATE_AUDITORIA:
            return {
                ...state,
                creating: {
                    ...state.creating,
                    openModal: false
                }
            }
        case REQUEST_CREATE_AUDITORIA:
            return {
                ...state,
                creating: {
                    sending: true,
                    error: null
                }
            }
        case REQUEST_CREATE_AUDITORIA_SUCCESS:
            return {
                ...state,
                all: [
                    ...state.all,
                    new Auditoria(action.payload.data.data)
                ],
                creating: {
                    sending: false,
                    error: null
                }
            }
        case REQUEST_CREATE_AUDITORIA_FAILED:
            return {
                ...state,
                creating: {
                    sending: false,
                    error: {
                        cause: action.payload.data
                    }
                }
            }
        default:
            return state
    }
}