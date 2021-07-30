import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from "semantic-ui-react";

import FormaBuscarBitacoras from '../../containers/CapturarBitacoras/FormaBuscarBitacorasContainer'
import ListadoBitacoras from './ListadoBitacoras'
import ModalCancelarServicio from "./ModalCancelarServicio";
import ModalRescateServicio from "./ModalRescateServicio";
import ModalIncidenteServicio from "./ModalIncidenteServicio";
import ModalCambioHorario from './ModalCambioHorario';
import BaseComponent from "../BaseComponent";
import ModalDesconfirmarBitacora from "./ModalDesconfirmarBitacora";

class CapturaBitacoras extends BaseComponent {

    componentDidMount() {
        this.props.requestClientes(['activo=true', 'id_categoria=1', 'or(id=5)', 'sort(+nombre_empresa)']);

        this.props.requestProveedores(['activo=true', 'id_categoria=8', 'or(id=1)', 'sort(+empresa)']);

        this.props.requestOperadores(['activo=true', 'sort(+nombre)']);
    }

    render() {
        const {bitacoras, login, causas, efectos, proveedores, operadores, subcontratados} = this.props;

        const {
            onIniciarCancelacion, onIniciarRescateServicio, onIniciarDesconfirmar,
            onFinalizarCancelacion, onFinalizarRescateServicio, onFinalizarDesconfirmar,
            onRequesCancelarServicio, onRequestRescateServicio, onRequesDesconfirmarBitacora,
            onIniciarIncidenteServicio, onFinalizarIncidenteServicio, onRequestIncidenteServicio,

            onIniciarCambioIndividualHorario,
            onFinalizarCambioIndividualHorario,
            onRequestCambioIndividualHorario,

            requestCausas, requestEfectos, requestOperadoresSubcontratados
        } = this.props

        return (
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <h3 style={{textAlign: "left"}}>Bitacoras</h3>
                <FormaBuscarBitacoras/>

                <ListadoBitacoras
                    bitacoras={bitacoras.listado}
                    login={login}
                    onDesconfirmarBitacora={onIniciarDesconfirmar}
                    onCancelarServicio={onIniciarCancelacion}
                    onIniciarRescate={onIniciarRescateServicio}
                    onIniciarIncidente={onIniciarIncidenteServicio}
                    onCambioIndividualHorario={onIniciarCambioIndividualHorario}
                />

                <ModalDesconfirmarBitacora
                    usuario={login.user}
                    desconfirmar={bitacoras.desconfirmar}
                    onFinalizarDesconfirmar={onFinalizarDesconfirmar}
                    onDesconfirmarBitacora={onRequesDesconfirmarBitacora}
                />

                <ModalCancelarServicio
                    usuario={login.user}
                    cancelacion={bitacoras.cancelacion}
                    onFinalizarCancelacion={onFinalizarCancelacion}
                    onCancelarServicio={onRequesCancelarServicio}
                />

                <ModalCambioHorario
                    usuario={login.user}
                    cambioIndividualHorario={bitacoras.cambioIndividualHorario}
                    onFinalizarCambioIndividualHorario={onFinalizarCambioIndividualHorario}
                    onCambioIndividualHorario={onRequestCambioIndividualHorario}
                />

                <ModalRescateServicio
                    usuario={login.user}
                    rescate={bitacoras.rescate}
                    causas={causas}
                    efectos={efectos}
                    proveedores={proveedores}
                    operadores={operadores}
                    subcontratados={subcontratados}
                    onFinalizarRescate={onFinalizarRescateServicio}
                    onRescatarServicio={onRequestRescateServicio}
                    onFetchCausas={requestCausas}
                    onFetchEfectos={requestEfectos}
                    onFetchSubcontratados={requestOperadoresSubcontratados}
                />

                <ModalIncidenteServicio
                    usuario={login.user}
                    incidente={bitacoras.incidente}
                    causas={causas}
                    efectos={efectos}
                    onFinalizarIncidente={onFinalizarIncidenteServicio}
                    onIncidenteServicio={onRequestIncidenteServicio}
                    onFetchCausas={requestCausas}
                    onFetchEfectos={requestEfectos}
                />
            </Grid.Column>
        )
    }
}

CapturaBitacoras.propTypes = {
    bitacoras: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    causas: PropTypes.object.isRequired,
    efectos: PropTypes.object.isRequired,
    proveedores: PropTypes.object.isRequired,
    operadores: PropTypes.object.isRequired,
    subcontratados: PropTypes.object.isRequired,
    onIniciarDesconfirmar: PropTypes.func.isRequired,
    onIniciarCancelacion: PropTypes.func.isRequired,
    onIniciarRescateServicio: PropTypes.func.isRequired,
    onFinalizarDesconfirmar: PropTypes.func.isRequired,
    onFinalizarCancelacion: PropTypes.func.isRequired,
    onFinalizarRescateServicio: PropTypes.func.isRequired,
    onRequesDesconfirmarBitacora: PropTypes.func.isRequired,
    onRequesCancelarServicio: PropTypes.func.isRequired,
    onRequestRescateServicio: PropTypes.func.isRequired,
    onIniciarIncidenteServicio: PropTypes.func.isRequired,
    onFinalizarIncidenteServicio: PropTypes.func.isRequired,
    onRequestIncidenteServicio: PropTypes.func.isRequired,
    onIniciarCambioIndividualHorario: PropTypes.func.isRequired,
    onFinalizarCambioIndividualHorario: PropTypes.func.isRequired,
    onRequestCambioIndividualHorario: PropTypes.func.isRequired,
    requestCausas: PropTypes.func.isRequired,
    requestEfectos: PropTypes.func.isRequired,
    requestOperadoresSubcontratados: PropTypes.func.isRequired,
    requestClientes: PropTypes.func.isRequired,
    requestProveedores: PropTypes.func.isRequired,
    requestOperadores: PropTypes.func.isRequired,
}

export default CapturaBitacoras
