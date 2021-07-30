import {connect} from 'react-redux'

import {requestClientes} from '../../actions/clientes'
import {requestRutas} from '../../actions/rutas'
import {requestProveedores} from '../../actions/proveedores'
import {requestServiciosProgramados} from "../../actions/servicios_programados";
import {requestBitacoras, onInvalidarBitacoras} from '../../actions/bitacoras'

import {

    onIniciarCambioIndividualPrecio,
    onFinalizarCambioIndividualPrecio,
    onRequestCambioIndividualPrecio,

} from '../../actions/bitacoras'

import VistaProgramaciones from '../../components/VistaProgramaciones/VistaProgramaciones'

const mapStateToProps = ({servicios_programados, clientes, rutas, proveedores, bitacoras, login}) => {
    return {
        servicios_programados,
        clientes,
        rutas,
        proveedores,
        bitacoras,
        login
    }
}

const mapActionsToProps = {
    requestClientes,
    requestRutas,
    requestProveedores,
    requestServiciosProgramados,
    requestBitacoras,
    onInvalidarBitacoras,

    onIniciarCambioIndividualPrecio,
    onFinalizarCambioIndividualPrecio,
    onRequestCambioIndividualPrecio
}


export default connect(mapStateToProps, mapActionsToProps)(VistaProgramaciones)
