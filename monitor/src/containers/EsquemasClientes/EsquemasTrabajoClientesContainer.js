import {connect} from "react-redux";

import {
    requestPreciosUpdate,
    requestHorariosRuta,
    requestHorariosRutaUpdate
} from '../../actions/horarios'

import {
    requestRutas,
    invalidarRutas
} from '../../actions/rutas'

import {
    requestClientes
} from '../../actions/clientes'

import EsquemasTrabajoClientes from "../../components/EsquemasClientes/EsquemasTrabajoClientes";

const mapStateToProps = ({clientes, rutas, horarios, login}) => {
    return {
        clientes, rutas, horarios, login
    }
}

const mapActionsToProps = {
    requestHorarios: requestPreciosUpdate,
    requestHorariosRuta,
    requestRutas,
    invalidarRutas,
    requestClientes,
    requestHorariosRutaUpdate
}

export default connect(mapStateToProps, mapActionsToProps)(EsquemasTrabajoClientes)
