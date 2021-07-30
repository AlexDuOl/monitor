import {connect} from 'react-redux'

import {requestClientes} from '../../actions/clientes'
import {requestRutas, invalidarRutas} from '../../actions/rutas'
import {requestEstructuras, invalidarEstructuras} from '../../actions/estructuras'
import {requestProveedores} from '../../actions/proveedores'
import {requestOperadores} from '../../actions/operadores'
import {requestOperadoresSubcontratados} from '../../actions/operadores_subcontratados'
import {excepcionServicio} from '../../actions/excepcion_servicios'

import FormaProgramacionExcepcionServicios from '../../components/Excepciones/FormaProgramarExcepcionServicio'

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
    excepcionServicio
}

export default connect(mapStateToProps, mapActionsToProps)(FormaProgramacionExcepcionServicios)
