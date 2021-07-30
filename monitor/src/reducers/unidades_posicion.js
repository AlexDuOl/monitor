import {
  REQUEST_POSICION_UNIDADES,
  REQUEST_POSICION_UNIDADES_SUCCESS,
  REQUEST_POSICION_UNIDADES_FAILED
} from '../constants/action_types'

const initialState = {
  all: [],
  fetching: false,
  received_date: null,
  error: null
}

function getSpeed(datos) {
  let algo = {}

  datos.forEach(function (item) {
    algo[`${item["i"]}`] = {
      's': parseInt(item["s"]),
      'ti': item['ti']
    }
  })

  return algo
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POSICION_UNIDADES:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_POSICION_UNIDADES_SUCCESS:
      return {
        ...state,
        fetching: false,
        all: getSpeed(action.payload.data[0].units),
        received_date: Date.now()
      }
    case REQUEST_POSICION_UNIDADES_FAILED:
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
