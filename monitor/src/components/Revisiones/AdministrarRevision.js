import React from 'react'
import PropTypes from 'prop-types'
import {Container, Modal} from "semantic-ui-react";
import FormaCapturarRevisiones from "./FormaCapturarRevisiones";
import ListaRevisiones from "./ListaRevisiones";
import FormaBuscarRevisiones from "./FormaBuscarRevisiones";
import BaseComponent from "../BaseComponent";

class AdministrarRevisiones extends BaseComponent {

    componentDidMount() {
        this.props.requestRevisiones([])

        this.props.requestProveedores(['activo=true', 'id_categoria=8', 'or(id=1)', 'sort(+empresa)'])

        this.props.requestOperadores(['activo=true', 'sort(+nombre)'])

        this.props.requestUnidades(['activa=true'])

        this.props.requestRutas(['activa=true'])

        this.props.requestOperadoresSubcontratados(['activo=true'])
    }

    render() {

        const {
            revisiones,
            login,
            operadores,
            proveedores,
            rutas,
            unidades,
            operadores_subcontratados,
            requestRevisiones,
            requestCreateRevisiones,
            startCreateRevisiones,
            endCreateRevisiones
        } = this.props;

        const {  creating } = revisiones
        const openModal = creating.openModal
        const sending = creating.sending

        return (
            <Container fluid style={{padding: "10px"}}>
                <h3 style={{textAlign: "left"}}>Buscar Revisiones</h3>

                 <FormaBuscarRevisiones
                    revisiones={revisiones}
                    onRequestRevisiones={requestRevisiones}
                    startCreateRevisiones={startCreateRevisiones}
                    operadores={operadores}
                    proveedores={proveedores}
                    rutas={rutas}
                    unidades={unidades}
                    login={login}
                />

                <ListaRevisiones
                    revisiones={revisiones}
                />

                {
                    (openModal) &&
                    <Modal size={'large'} open={openModal}>
                       <Modal.Header>Agregar revisión</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <FormaCapturarRevisiones
                                    onRequestCreateRevisiones={requestCreateRevisiones}
                                    operadores={operadores}
                                    proveedores={proveedores}
                                    rutas={rutas}
                                    unidades={unidades}
                                    operadoresSubcontratados={operadores_subcontratados}
                                    endCreateRevisiones={endCreateRevisiones}
                                    login={login}
                                    sending={sending}
                                    error={creating.error}
                                />
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                }
            </Container>
        )
    }
}

AdministrarRevisiones.propTypes = {
    revisiones: PropTypes.object.isRequired,
    requestRevisiones: PropTypes.func.isRequired,
    requestCreateRevisiones: PropTypes.func.isRequired,
    operadores: PropTypes.object,
    proveedores: PropTypes.object,
    rutas: PropTypes.object,
    unidades: PropTypes.object,
}

export default AdministrarRevisiones