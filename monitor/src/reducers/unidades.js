import Unidad from '../modelos/Unidad';

import {
    REQUEST_UNIDADES,
    REQUEST_UNIDADES_SUCCESS,
    REQUEST_UNIDADES_FAILED
} from '../constants/action_types';

const initialState ={
    all:[],
    selected:[],
    fetching:false,
    error:null,
    received_date:null,
}

const unidades = (state = initialState,action)=>{
    switch(action.type){
        case REQUEST_UNIDADES:
            return{
                ...state,
                fetching:true,
                error:null
            }
        case REQUEST_UNIDADES_SUCCESS:
            return{
                ...state,
                fetching:false,
                all:action.payload.data.data.map(d=> new Unidad(d.data)),
                received_date:Date.now()
            }
        case REQUEST_UNIDADES_FAILED:
            return{
                ...initialState,
                error:{
                    cause:action.payload
                }
                
            }
        default:
            return state
    }
}

export default unidades