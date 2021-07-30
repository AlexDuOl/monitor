import {connect} from "react-redux";

import {
    requestRevisiones,
    startCreateRevisiones,
    endCreateRevisiones,
    requestCreateRevisiones,
} from "../../actions/revisiones";

import AdministrarRevisiones from "../../components/Revisiones/AdministrarRevision";
import {requestRutas} from "../../actions/rutas";
import {requestUnidades} from "../../actions/unidades";
import {requestProveedores} from "../../actions/proveedores";
import {requestOperadores} from "../../actions/operadores";
import {requestOperadoresSubcontratados} from "../../actions/operadores_subcontratados";

const mapStateToProps = ({revisiones, login, operadores, proveedores, rutas, unidades}) => {

    return {
        revisiones,
        login,
        operadores,
        proveedores,
        rutas,
        unidades,
    }
}

const mapActionsToProps = {
    requestRevisiones,
    startCreateRevisiones,
    endCreateRevisiones,
    requestCreateRevisiones,
    requestRutas,
    requestUnidades,
    requestProveedores,
    requestOperadores,
    requestOperadoresSubcontratados,
}

export default connect(mapStateToProps, mapActionsToProps)(AdministrarRevisiones)