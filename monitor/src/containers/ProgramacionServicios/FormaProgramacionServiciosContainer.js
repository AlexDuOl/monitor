import {connect} from 'react-redux'

import {requestClientes} from '../../actions/clientes'
import {requestRutas, invalidarRutas} from '../../actions/rutas'
import {requestEstructuras, invalidarEstructuras} from '../../actions/estructuras'
import {requestProveedores} from '../../actions/proveedores'
import {requestOperadores} from '../../actions/operadores'
import {requestOperadoresSubcontratados} from '../../actions/operadores_subcontratados'
import {requestProgramarServicios} from '../../actions/programacion_servicios'
import {requestBitacoras} from '../../actions/bitacoras'

import FormaProgramacionServicios from '../../components/ProgramacionServicios/FormaProgramacionServicios'

const mapStateToProps = ({
                             clientes,
                             rutas,
                             estructuras,
                             proveedores,
                             operadores,
                             subcontratados,
                             programacion,
                             login
                         }) => {
    return {
        clientes,
        rutas,
        estructuras,
        proveedores,
        operadores,
        subcontratados,
        programacion,
        login
    }
}

const mapActionsToProps = {
    requestClientes,
    requestRutas,
    requestEstructuras,
    requestProveedores,
    requestOperadores,
    requestOperadoresSubcontratados,
    invalidarRutas,
    invalidarEstructuras,
    requestProgramarServicios,
    requestBitacoras
}

export default connect(mapStateToProps, mapActionsToProps)(FormaProgramacionServicios)
