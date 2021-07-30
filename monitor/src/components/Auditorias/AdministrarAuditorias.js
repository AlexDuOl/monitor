import React from 'react'
import PropTypes from 'prop-types'
import {Container, Modal} from "semantic-ui-react";
import BaseComponent from "../BaseComponent";
import FormaCapturarAuditoria from "./FormaCapturarAuditoria";
import FormaBuscarAuditorias from "./FormaBuscarAuditorias";
import ListaAuditorias from "./ListaAuditorias";

class AdministrarAuditorias extends BaseComponent {

    componentDidMount() {
        this.props.requestAuditorias([])
        //this.props.requestAuditorias(["fecha_captura=ge=" + desde, "fecha_captura=le=" + hasta])
        //this.props.requestAuditorias(["fecha_captura=ge=" + "2021-07-07%2000:00:00", "fecha_captura=le=" + "2021-07-07%2023:59:59"])

        this.props.requestProveedores(['activo=true', 'id_categoria=8', 'or(id=1)', 'sort(+empresa)'])

        this.props.requestOperadores(['activo=true', 'sort(+nombre)'])

        this.props.requestUnidades(['activa=true'])
    }

    render() {

        const {
            auditorias,
            login,
            operadores,
            proveedores,
            unidades,
            requestAuditorias,
            requestCreateAuditoria,
            startCreateAuditoria,
            endCreateAuditoria
        } = this.props;

        const { creating } = auditorias
        const openModal = creating.openModal
        const sending = creating.sending
        
        return (
            <Container fluid style={{padding: "10px"}}>
                <h3 style={{textAlign: "left"}}>Buscar Auditorias</h3>
                
                <FormaBuscarAuditorias
                    auditorias={auditorias}
                    onRequestAuditorias={requestAuditorias}
                    startCreateAuditoria={startCreateAuditoria}
                    operadores={operadores}
                    unidades={unidades}
                    login={login}
                />

                <ListaAuditorias
                    auditorias={auditorias}
                />    

                {
                    (openModal) &&
                    <Modal size={'large'} open={openModal}>
                        <Modal.Header>Agregar auditoría</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <FormaCapturarAuditoria
                                    onRequestCreateAuditoria={requestCreateAuditoria}
                                    operadores={operadores}
                                    proveedores={proveedores}
                                    unidades={unidades}
                                    endCreateAuditoria={endCreateAuditoria}
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

AdministrarAuditorias.propTypes = {
    auditorias: PropTypes.object.isRequired,
    requestAuditorias: PropTypes.func.isRequired,
    requestCreateAuditoria: PropTypes.func.isRequired,
    operadores: PropTypes.object,
    proveedores: PropTypes.object,
    unidades: PropTypes.object,
}

export default AdministrarAuditorias