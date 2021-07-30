import Sanitizaciones from '../modelos/Sanitizaciones';

import {
    REQUEST_SANITIZACIONES,
    REQUEST_SANITIZACIONES_SUCCESS,
    REQUEST_SANITIZACIONES_FAILED,
    INVALIDAR_SANITIZACIONES
    
} from '../constants/action_types';


const initialState = {
    all:[],
    selected:[],
    fetching:false,
    error:null,
    received_date:null,
}

const sanitizaciones = (state = initialState ,action) =>{
    switch(action.type){
        case REQUEST_SANITIZACIONES:
            return {
                ...state,
                fetching:true,
                error:null
            }
        case REQUEST_SANITIZACIONES_SUCCESS:
            return {
                ...state,
                fetching:false,
                all:action.payload.data.data.map(d=> new Sanitizaciones(d.data)),
                received_date:Date.now()
            }
        case REQUEST_SANITIZACIONES_FAILED:
            return {
                ...initialState,
                error:{
                    cause:action.payload
                }
            }
        case INVALIDAR_SANITIZACIONES:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default sanitizaciones