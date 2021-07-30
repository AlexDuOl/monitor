import {connect} from 'react-redux'

import {requestBitacoras} from '../../actions/bitacoras'
import {invalidarRutas, requestRutas} from '../../actions/rutas'
import {invalidarEstructuras, requestEstructuras} from '../../actions/estructuras'
import {requestOperadoresSubcontratados} from '../../actions/operadores_subcontratados'

import FormaBuscarBitacoras from '../../components/CapturaBitacoras/FormaBuscarBitacoras'

const mapStateToProps = ({clientes, rutas, estructuras, proveedores, operadores, subcontratados, bitacoras}) => {

    return {
        clientes,
        rutas,
        estructuras,
        proveedores,
        operadores,
        subcontratados,
        bitacoras
    }
};

const mapActionsToProps = {
    invalidarRutas,
    invalidarEstructuras,
    requestRutas,
    requestEstructuras,
    requestOperadoresSubcontratados,
    requestBitacoras,
};

export default connect(mapStateToProps, mapActionsToProps)(FormaBuscarBitacoras)
