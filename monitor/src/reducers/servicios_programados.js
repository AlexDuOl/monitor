import {
  REQUEST_SERVICIOS_PROGRAMADOS,
  REQUEST_SERVICIOS_PROGRAMADOS_FAILED,
  REQUEST_SERVICIOS_PROGRAMADOS_SUCCESS
} from "../constants/action_types";

const initialState = {
  all: [],
  fetching: false,
  error: null,
  received_date: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SERVICIOS_PROGRAMADOS:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_SERVICIOS_PROGRAMADOS_SUCCESS: {
      return {
        ...state,
        all: action.payload.data,
        received_date: Date.now(),
        fetching: false
      }
    }
    case REQUEST_SERVICIOS_PROGRAMADOS_FAILED:
      return {
        ...initialState,
        error: {
          cause: action.payload
        },
        received_date: Date.now(),
        fetching: false
      }
    default:
      return state
  }
}
