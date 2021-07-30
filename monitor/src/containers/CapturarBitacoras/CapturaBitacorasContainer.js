import {connect} from 'react-redux'

import {requestClientes} from '../../actions/clientes'
import {requestProveedores} from '../../actions/proveedores'
import {requestOperadores} from '../../actions/operadores'
import {requestCausas} from '../../actions/causas'
import {requestEfectos} from '../../actions/efectos'
import {requestOperadoresSubcontratados} from '../../actions/operadores_subcontratados'

import {
    onIniciarCancelacion,
    onFinalizarCancelacion,
    onRequesCancelarServicio,

    onIniciarDesconfirmar,
    onFinalizarDesconfirmar,
    onRequesDesconfirmarBitacora,

    onIniciarRescateServicio,
    onFinalizarRescateServicio,
    onRequestRescateServicio,

    onIniciarIncidenteServicio,
    onFinalizarIncidenteServicio,
    onRequestIncidenteServicio,

    onIniciarCambioIndividualPrecio,
    onFinalizarCambioIndividualPrecio,
    onRequestCambioIndividualPrecio,

    onIniciarCambioIndividualHorario,
    onFinalizarCambioIndividualHorario,
    onRequestCambioIndividualHorario,

} from '../../actions/bitacoras'

import CapturaBitacoras from '../../components/CapturaBitacoras/CapturaBitacoras'

// import { getBitacoraSeleccionada } from '../../selectors'

const mapStateToProps = (state) => {
    const {bitacoras, login, causas, efectos, proveedores, operadores, subcontratados} = state;
    return {
        bitacoras, login, causas, efectos, proveedores, operadores, subcontratados
    }
};

const mapActionsToProps = {
    requestClientes,
    requestProveedores,
    requestOperadores,

    onIniciarDesconfirmar,
    onFinalizarDesconfirmar,
    onRequesDesconfirmarBitacora,

    onIniciarCancelacion,
    onFinalizarCancelacion,
    onRequesCancelarServicio,

    onIniciarRescateServicio,
    onFinalizarRescateServicio,
    onRequestRescateServicio,

    onIniciarIncidenteServicio,
    onFinalizarIncidenteServicio,
    onRequestIncidenteServicio,

    onIniciarCambioIndividualPrecio,
    onFinalizarCambioIndividualPrecio,
    onRequestCambioIndividualPrecio,

    onIniciarCambioIndividualHorario,
    onFinalizarCambioIndividualHorario,
    onRequestCambioIndividualHorario,

    requestCausas,
    requestEfectos,
    requestOperadoresSubcontratados,

};

export default connect(mapStateToProps, mapActionsToProps)(CapturaBitacoras)
