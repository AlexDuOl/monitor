import Revision from "../modelos/Revision";

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
        openModal: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_REVISIONES:
            return {
                ...state,
                fetching: true,
                error: null
            }
        case REQUEST_REVISIONES_SUCCESS:
            return {
                ...state,
                all: action.payload.data.map(d => new Revision(d.data)),
                received_date: Date.now(),
                fetching: false
            }
        case REQUEST_REVISIONES_FAILED:
            return {
                ...initialState,
                error: {
                    cause: action.payload
                },
                received_date: Date.now(),
                fetching: false
            }
        case START_CREATE_REVISIONES:
            return {
                ...state,
                creating: {
                    ...state.creating,
                    openModal: true
                }
            }
        case END_CREATE_REVISIONES:
            return {
                ...state,
                creating: {
                    ...state.creating,
                    openModal: false
                }
            }
        case REQUEST_CREATE_REVISIONES:
            return {
                ...state,
                creating: {
                    sending: true,
                    error: null
                }
            }
        case REQUEST_CREATE_REVISIONES_SUCCESS:
            return {
                ...state,
                all: [
                    ...state.all,
                    new Revision(action.payload.data.data)
                ],
                creating: {
                    sending: false,
                    error: null
                }
            }
        case REQUEST_CREATE_REVISIONES_FAILED:
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