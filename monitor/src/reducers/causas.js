import Causa from "../modelos/Causa";

import {
  REQUEST_CAUSAS,
  REQUEST_CAUSAS_FAILED,
  REQUEST_CAUSAS_SUCCESS
} from '../constants/action_types'


const initialState = {
  all: [],
  fetching: false,
  error: null,
  received_date: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CAUSAS:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_CAUSAS_SUCCESS:
      return {
        ...state,
        fetching: false,
        all: action.payload.data.map(d => new Causa(d.data)),
        received_date: Date.now()
      }
    case REQUEST_CAUSAS_FAILED:
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
