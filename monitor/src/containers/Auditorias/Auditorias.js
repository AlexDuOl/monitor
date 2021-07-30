import {connect} from "react-redux";

import {
    requestAuditorias,
    startCreateAuditoria,
    endCreateAuditoria,
    requestCreateAuditoria,
} from "../../actions/auditorias";

import AdministrarAuditorias from "../../components/Auditorias/AdministrarAuditorias"
import {requestProveedores} from "../../actions/proveedores";
import {requestOperadores} from "../../actions/operadores";
import {requestUnidades} from "../../actions/unidades";

const mapStateToProps = ({auditorias, login, operadores, proveedores, unidades}) => {
    return {
        auditorias,
        login,
        operadores,
        proveedores,
        unidades,
    }
}

const mapActionsToProps = {
    requestAuditorias,
    startCreateAuditoria,
    endCreateAuditoria,
    requestCreateAuditoria,
    requestProveedores,
    requestOperadores,
    requestUnidades,
}

export default connect(mapStateToProps, mapActionsToProps)(AdministrarAuditorias)