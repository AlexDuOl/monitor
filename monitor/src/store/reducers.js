import { combineReducers } from 'redux'

import clientes from '../reducers/clientes'
import estructuras from '../reducers/estructuras'
import login from '../reducers/login'
import operadores from '../reducers/operadores'
import subcontratados from '../reducers/operadores_subcontratados'
import programacion from '../reducers/programacion_servicios'
import proveedores from '../reducers/proveedores'
import reloj from '../reducers/reloj'
import rutas from '../reducers/rutas'
import servicios from '../reducers/servicios'
import transferencias from '../reducers/transferencias_servicios'
import posicionUnidades from '../reducers/unidades_posicion'
import bitacoras from '../reducers/bitacoras'
import dispositivos from '../reducers/dispositivos'
import causas from '../reducers/causas'
import efectos from '../reducers/efectos'
import horarios from '../reducers/horarios'
import servicios_programados from "../reducers/servicios_programados";
import unidades from '../reducers/unidades';
import sanitizaciones from '../reducers/sanitizaciones';
import auditorias from "../reducers/auditorias";
import revisiones from "../reducers/revisiones";

export const makeRootReducer = () => {
  return combineReducers({
    bitacoras,
    clientes,
    estructuras,
    login,
    operadores,
    subcontratados,
    programacion,
    proveedores,
    reloj,
    rutas,
    servicios,
    transferencias,
    posicionUnidades,
    dispositivos,
    causas,
    efectos,
    horarios,
    servicios_programados,
    unidades,
    sanitizaciones,
    auditorias,
    revisiones,
  })
}

export default makeRootReducer
