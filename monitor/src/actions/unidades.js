
import {
    REQUEST_UNIDADES,
    REQUEST_UNIDADES_SUCCESS,
    REQUEST_UNIDADES_FAILED
} from '../constants/action_types'

export const requestUnidades = (params) => {
    return{
        type:REQUEST_UNIDADES,
        payload:{params}
    };
};

export const requestUnidadesSuccess = (data) =>{
    return{
        type:REQUEST_UNIDADES_SUCCESS,
        payload:{data}
    };
};

export const requestUnidadesFailed = (error) =>{
    return{
        type:REQUEST_UNIDADES_FAILED,
        payload:{error}
    };
};
