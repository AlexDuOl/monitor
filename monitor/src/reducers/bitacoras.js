import {combineReducers} from 'redux';

import Bitacora from '../modelos/Bitacora'

import {
  REQUEST_BITACORAS,
  REQUEST_BITACORAS_SUCCESS,
  REQUEST_BITACORAS_FAILED,
  REQUEST_INVALIDAR_BITACORAS,

  INICIAR_DESCONFIRMAR_BITACORA,
  FINALIZAR_DESCONFIRMAR_BITACORA,
  REQUEST_DESCONFIRMAR_BITACORA,
  REQUEST_DESCONFIRMAR_BITACORA_FAILED,
  REQUEST_DESCONFIRMAR_BITACORA_SUCCESS,

  INICIAR_CANCELACION_SERVICIO,
  FINALIZAR_CANCELACION_SERVICIO,
  REQUEST_CANCELAR_SERVICIO,
  REQUEST_CANCELAR_SERVICIO_FAILED,
  REQUEST_CANCELAR_SERVICIO_SUCCESS,
  
  INICIAR_RESCATE_SERVICIO,
  FINALIZAR_RESCATE_SERVICIO,
  REQUEST_RESCATE_SERVICIO,
  REQUEST_RESCATE_SERVICIO_SUCCESS,
  REQUEST_RESCATE_SERVICIO_FAILED,

  INICIAR_INCIDENTE_SERVICIO,
  FINALIZAR_INCIDENTE_SERVICIO,
  REQUEST_INCIDENTE_SERVICIO,
  REQUEST_INCIDENTE_SERVICIO_SUCCESS,
  REQUEST_INCIDENTE_SERVICIO_FAILED, 

  INICIAR_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO,
  FINALIZAR_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO,
  REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO,
  REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO_SUCCESS,
  REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO_FAILED,

  INICIAR_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO,
  FINALIZAR_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO,
  REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO,
  REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO_SUCCESS,
  REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO_FAILED,

} from '../constants/action_types'

const initialStateListado = {
  all: [],
  fetching: false,
  error: null,
  received_date: null
};

const initalStateDesconfirmar = {
  bitacora: null,
  sending: false,
  done: null,
  error: null,
  force: false
}

const initialStateCancelacion = {
  bitacora: null,
  sending: false,
  done: null,
  error: null
}

const initialStateRescate = {
  bitacora: null,
  sending: false,
  done: null,
  error: null
}

const initialStateIncidente = {
  bitacora: null,
  sending: false,
  done: null,
  error: null
}

const initialStateCambioIndividualPrecio = {
  bitacora: null,
  sending: false,
  done:null,
  error:null
}

const initialStateCambioIndividualHorario = {
  bitacora: null,
  sending: false,
  done:null,
  error:null
}

const listado = (state = initialStateListado, action) => {
  switch (action.type) {
    case REQUEST_BITACORAS:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case REQUEST_BITACORAS_SUCCESS: {
      return {
        ...state,
        all: action.payload.data.map(d => new Bitacora(d.data)),
        received_date: Date.now(),
        fetching: false
      }
    }
    case REQUEST_BITACORAS_FAILED:
      return {
        ...initialStateListado,
        error: {
          cause: action.payload
        },
        received_date: Date.now(),
        fetching: false
      }
    case REQUEST_INVALIDAR_BITACORAS:
      return {
        ...initialStateListado
      }
    default:
      return state
  }
}

const desconfirmar = (state = initalStateDesconfirmar, action) => {
  switch(action.type) {
    case INICIAR_DESCONFIRMAR_BITACORA:
      return {
        ...state,
        bitacora: action.payload,
        force: false
      }
    case FINALIZAR_DESCONFIRMAR_BITACORA:
      return {
        ...state,
        bitacora: null,
        sending: false,
        error: null,
        done: null,
        force: false
      }
    case REQUEST_DESCONFIRMAR_BITACORA:
      return {
        ...state,
        sending: true,
        force: true
      }
    case REQUEST_DESCONFIRMAR_BITACORA_SUCCESS:
      return {
        ...state,
        sending: false,
        error: null,
        done: action.payload.data,
        force: false
      }
    case REQUEST_DESCONFIRMAR_BITACORA_FAILED:
      return {
        ...state,
        sending: false,
        error: action.payload.data,
        done: null,
        force: false
      }
    default:
      return state;
  }
}

const cancelacion = (state = initialStateCancelacion, action) => {
  switch(action.type) {
    case INICIAR_CANCELACION_SERVICIO:
      return {
        ...state,
        bitacora: action.payload
      }
    case FINALIZAR_CANCELACION_SERVICIO:
      return {
        ...state,
        bitacora: null,
        sending: false,
        error: null,
        done: null
      }
    case REQUEST_CANCELAR_SERVICIO:
      return {
        ...state,
        sending: true
      }
    case REQUEST_CANCELAR_SERVICIO_SUCCESS:
      return {
        ...state,
        sending: false,
        error: null,
        done: action.payload.data
      }
    case REQUEST_CANCELAR_SERVICIO_FAILED:
      return {
        ...state,
        sending: false,
        error: action.payload.data,
        done: null
      }
    default:
      return state;
  }
}

const rescate = (state = initialStateRescate, action) => {
  switch(action.type){
    case INICIAR_RESCATE_SERVICIO:
      return {
        ...state,
        bitacora: action.payload
      }
    case FINALIZAR_RESCATE_SERVICIO:
      return {
        ...state,
        bitacora: null,
        sending: false,
        done: null,
        error: null
      }
    case REQUEST_RESCATE_SERVICIO:
      return {
        ...state,
        sending: true
      }
    case REQUEST_RESCATE_SERVICIO_SUCCESS:
      return {
        ...state,
        sending: false,
        done: action.payload.data,
        error: null
      }
    case REQUEST_RESCATE_SERVICIO_FAILED:
      return {
        ...state,
        sending: false,
        done: null,
        error: action.payload.data
      }
    default:
      return state;
  }
}

const incidente = (state = initialStateIncidente, action) => {
  switch(action.type){
    case INICIAR_INCIDENTE_SERVICIO:
      return {
        ...state,
        bitacora: action.payload
      }
    case FINALIZAR_INCIDENTE_SERVICIO:
      return {
        ...state,
        bitacora: null,
        sending: false,
        done: null,
        error: null
      }
    case REQUEST_INCIDENTE_SERVICIO:
      return {
        ...state,
        sending: true
      }
    case REQUEST_INCIDENTE_SERVICIO_SUCCESS:
      return {
        ...state,
        sending: false,
        done: action.payload.data,
        error: null
      }
    case REQUEST_INCIDENTE_SERVICIO_FAILED:
      return {
        ...state,
        sending: false,
        done: null,
        error: action.payload.data
      }
    default:
      return state;
  }
}

const cambioIndividualPrecio = (state = initialStateCambioIndividualPrecio,action)=>{
  switch(action.type){
    case INICIAR_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO:
      return{
        ...state,
        bitacora:action.payload
      }
    case FINALIZAR_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO:
      return{
        ...state,
        bitacora: null,
        sending: false,
        error: null,
        done: null
      }
    case REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO:
      return{
        ...state,
        sending:true
      }
    case REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO_SUCCESS:
      return{
        ...state,
        sending: false,
        error: null,
        done: action.payload.data
      }
    case REQUEST_CAMBIO_INDIVIDUAL_PRECIO_SERVICIO_FAILED:
      return{
        ...state,
        sending: false,
        error: action.payload.data,
        done: null
      }
    default:
      return state
  }
}

const cambioIndividualHorario = (state = initialStateCambioIndividualHorario,action)=>{
  switch(action.type){
    case INICIAR_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO:
      return{
        ...state,
        bitacora:action.payload
      }
    case FINALIZAR_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO:
      return{
        ...state,
        bitacora: null,
        sending: false,
        error: null,
        done: null
      }
    case REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO:
      return{
        ...state,
        sending:true
      }
    case REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO_SUCCESS:
      return{
        ...state,
        sending: false,
        error: null,
        done: action.payload.data
      }
    case REQUEST_CAMBIO_INDIVIDUAL_HORARIO_SERVICIO_FAILED:
      return{
        ...state,
        sending: false,
        error: action.payload.data,
        done: null
      }
    default:
      return state
  }
}

let bitacoras = combineReducers({listado,desconfirmar,cancelacion,rescate,incidente,cambioIndividualPrecio,cambioIndividualHorario})

export default bitacoras;
