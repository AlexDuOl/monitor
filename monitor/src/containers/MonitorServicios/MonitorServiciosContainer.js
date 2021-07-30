import {connect} from 'react-redux'

import {filtrarServicios} from '../../selectors'

import {
    requestClientes
} from '../../actions/clientes'

import {
    requestProveedores
} from '../../actions/proveedores'

import {
    requestOperadores
} from '../../actions/operadores'

import {
    requestOperadoresSubcontratados
} from '../../actions/operadores_subcontratados'

import {
    iniciarReloj,
    detenerReloj
} from '../../actions/reloj'

import {
    requestTransferirServicios
} from '../../actions/transferencias'

import {
    requestServicios,
    invalidarServicios,
    agregarASeleccion,
    removerDeSeleccion,
    limpiarSeleccion,
    iniciarTransferenciaServicio,
    finalizarTransferenciaServicio
} from '../../actions/servicios'

import {
    iniciarMonitor,
    detenerMonitor
} from '../../actions/monitor'

import MonitorServicios from '../../components/MonitorServicios/MonitorServicios'

const mapStateToProps = (state) => {

    const {
        reloj,
        servicios,
        clientes,
        proveedores,
        operadores,
        subcontratados,
        transferencias,
        posicionUnidades
    } = state

    return {
        reloj,
        servicios,
        clientes,
        proveedores,
        operadores,
        subcontratados,
        transferencias,
        serviciosSeleccionados: filtrarServicios(state),
        posicionUnidades
    }
}

const mapActionsToProps = {
    requestServicios,
    invalidarServicios,
    iniciarReloj,
    detenerReloj,
    iniciarMonitor,
    detenerMonitor,
    requestClientes,
    agregarASeleccion,
    removerDeSeleccion,
    limpiarSeleccion,
    requestProveedores,
    requestOperadores,
    requestOperadoresSubcontratados,
    iniciarTransferenciaServicio,
    finalizarTransferenciaServicio,
    requestTransferirServicios
}

export default connect(mapStateToProps, mapActionsToProps)(MonitorServicios)
