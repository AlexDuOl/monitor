import { all }  from 'redux-saga/effects'

import { watchStatusReloj } from './reloj'
import { watchRequestServiciosMonitor, watchFetchServicios } from './monitor_servicios'
import { watchFetchClientes } from './clientes'
import { watchRequesFetchRutas } from './rutas'
import { watchEstructurasRequest } from './estructuras'
import { watchRequestProveerdores } from './proveedores'
import { watchRequestOperadores } from './operadores'
import { watchRequestOperadoresSubcontratados } from './operadores_subcontratados'
import { watchPostProgramarServicios } from './programacion_servicios'
import { watchPutTransferencias } from './transferencias_servicios'
import { watchRequestPosicionUnidades, watchFetchPosicionUnidades } from './posicion_unidades'
import { watchRequestExcepcionServicio } from './excepcion_servicios'
import { watchPostLoginRequest } from './login'
import {
  watchRequestBitacoras,
  watchRequestCancelarServicio,
  watchtRequestIncidenteServicio,
  watchtRequestRescateServicio,
  watchRequestCambioIndividualPrecio,
  watchRequestCambioIndividualHorario,
  watchRequestDesconfirmarBitacora,
} from './bitacoras'

import { watchRequestDispositivos } from './dispositivos'
import {watchRequestCausas} from "./causas";
import {watchRequestEfectos} from "./efectos";
import {
  watchRequestPreciosUpdate, 
  watchRequestHorariosRuta, 
  watchRequestHorariosRutaUpdate
} from "./horarios";
import {watchRequestServiciosProgramados} from "./servicios_programados";

import {watchFetchSanitizaciones} from "./sanitizaciones";
import {watchFetchUnidades} from "./unidades";
import {
  watchCreateAuditorias,
  watchRequestAuditorias,
} from "./auditorias";

import {
  watchCreateRevisiones,
  watchRequestRevisiones,
} from "./revisiones";

export default function *rootSaga () {
  yield all([
    watchPostLoginRequest(),
    watchStatusReloj(),
    watchRequestServiciosMonitor(),
    watchFetchClientes(),
    watchRequesFetchRutas(),
    watchEstructurasRequest(),
    watchRequestProveerdores(),
    watchRequestOperadores(),
    watchRequestOperadoresSubcontratados(),
    watchPostProgramarServicios(),
    watchPutTransferencias(),
    watchFetchServicios(),
    watchRequestPosicionUnidades(),
    watchFetchPosicionUnidades(),
    watchRequestExcepcionServicio(),

    watchRequestBitacoras(),
    watchRequestDispositivos(),
    watchRequestDesconfirmarBitacora(),
    watchRequestCancelarServicio(),
    watchtRequestRescateServicio(),
    watchtRequestIncidenteServicio(),
    watchRequestCambioIndividualPrecio(),
    watchRequestCambioIndividualHorario(),

    watchRequestCausas(),
    watchRequestEfectos(),
    watchRequestPreciosUpdate(),
    watchRequestHorariosRuta(),
    watchRequestHorariosRutaUpdate(),
    watchRequestServiciosProgramados(),

    watchFetchSanitizaciones(),
    watchFetchUnidades(),

    watchRequestAuditorias(),
    watchCreateAuditorias(),

    watchRequestRevisiones(),
    watchCreateRevisiones(),

  ])
}
