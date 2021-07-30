import {
  REQUEST_TRANSFERIR_SERVICIOS,
  REQUEST_TRANSFERIR_SERVICIOS_SUCCESS,
  REQUEST_TRANSFERIR_SERVICIOS_FAILED
} from '../constants/action_types'

const initialState = {
  all: [],
  fetching: false,
  received_date: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TRANSFERIR_SERVICIOS:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_TRANSFERIR_SERVICIOS_SUCCESS:
      return {
        ...state,
        fetching: false,
        all: action.payload.data,
        received_date: Date.now()
      }
    case REQUEST_TRANSFERIR_SERVICIOS_FAILED:
      return {
        ...initialState,
        error: {
          cause: action.payload
        }
      }
    default:
      return state
  }
}
