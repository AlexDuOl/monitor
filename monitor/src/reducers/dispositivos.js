import {
  REQUEST_DISPOSITIVOS,
  REQUEST_DISPOSITIVOS_SUCCESS,
  REQUEST_DISPOSITIVOS_FAILED
} from '../constants/action_types'

const initialState = {
  all: [],
  fetching: false,
  error: null,
  received_date: null
}


export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DISPOSITIVOS:
      return {
        ...state,
        fetching: true
      }
    case REQUEST_DISPOSITIVOS_SUCCESS:
      return {
        ...state,
        all: action.payload.data,
        fetching: false,
        error: null,
        received_date: Date.now()
      }
    case REQUEST_DISPOSITIVOS_FAILED:
      return {
        ...state,
        fetching: false,
        error: {
          cause: action.payload.data
        },
        received_date: Date.now()
      }
    default:
      return state
  }
}
