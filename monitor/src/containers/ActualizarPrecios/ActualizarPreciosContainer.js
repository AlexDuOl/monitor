import {connect} from "react-redux";

import {
    requestRutas,
    invalidarRutas
} from '../../actions/rutas'

import {
    requestPreciosUpdate
} from '../../actions/horarios'

import {
    requestEstructuras,
    invalidarEstructuras
} from '../../actions/estructuras'

import {
    requestClientes
} from '../../actions/clientes'


import ActualizarPrecios from "../../components/ActualizarPrecios/ActualizarPrecios";

const mapStateToProps = ({clientes, rutas, estructuras, horarios, login}) => {
    return {
        clientes, rutas, estructuras, horarios, login
    }
}

const mapActionsToProps = {
    requestRutas,
    invalidarRutas,
    requestClientes,
    requestEstructuras,
    requestPreciosUpdate,
    invalidarEstructuras
}

export default connect(mapStateToProps, mapActionsToProps)(ActualizarPrecios)
