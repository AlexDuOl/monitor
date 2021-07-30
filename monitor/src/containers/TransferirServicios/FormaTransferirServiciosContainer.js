import {connect} from 'react-redux'

import {requestClientes} from '../../actions/clientes'
import {requestRutas, invalidarRutas} from '../../actions/rutas'
import {requestEstructuras, invalidarEstructuras} from '../../actions/estructuras'
import {requestProveedores} from '../../actions/proveedores'
import {requestOperadores} from '../../actions/operadores'
import {requestOperadoresSubcontratados} from '../../actions/operadores_subcontratados'
import {requestTransferirServicios} from '../../actions/transferencias'

import FormaTransferirServicios from '../../components/TransferirServicios/FormaTransferirServicios'

const mapStateToProps = ({clientes, rutas, estructuras, proveedores, operadores, subcontratados, login}) => {
    return {
        clientes,
        rutas,
        estructuras,
        proveedores,
        operadores,
        subcontratados,
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
    requestTransferirServicios
}

export default connect(mapStateToProps, mapActionsToProps)(FormaTransferirServicios)
