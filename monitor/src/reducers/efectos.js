import Efecto from "../modelos/Efecto";
import {
  REQUEST_EFECTOS,
  REQUEST_EFECTOS_FAILED,
  REQUEST_EFECTOS_SUCCESS
} from "../constants/action_types";

const initialState = {
  all: [],
  fetching: false,
  error: null,
  received_date: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EFECTOS:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_EFECTOS_SUCCESS:
      return {
        ...state,
        fetching: false,
        all: action.payload.data.map(d => new Efecto(d.data)),
        received_date: Date.now()
      }
    case REQUEST_EFECTOS_FAILED:
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
