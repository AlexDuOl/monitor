
import {
    REQUEST_SANITIZACIONES,
    REQUEST_SANITIZACIONES_SUCCESS,
    REQUEST_SANITIZACIONES_FAILED,
    INVALIDAR_SANITIZACIONES
} from '../constants/action_types'


export const requestSanitizaciones = (params) =>{
    return {
        type:REQUEST_SANITIZACIONES,
        payload:{params}
    };
};

export const requestSanitizacionesSuccess = (data) =>{
    return{
        type:REQUEST_SANITIZACIONES_SUCCESS,
        payload:{data}
    }
}

export const requestSanitizacionesFailed = (error) => {
    return {
        type:REQUEST_SANITIZACIONES_FAILED,
        payload:{error}
    }
}

export const invalidarSanitizaciones = () => {
    return {
        type:INVALIDAR_SANITIZACIONES
    }
}

