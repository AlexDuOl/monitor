import React, {Component} from "react"
import PropTypes from "prop-types";
import moment from "moment";
import {Table, Segment, Grid, Rating, Message, Button, Item, Icon, Modal, Image, Header, List, Label} from 'semantic-ui-react'
import ModalComentarios from "./ModalComentariosAuditorias"
import ModalEvaluacion from "./ModalEvaluacionAuditorias";
class ListadoAuditorias extends Component {

    render() {
        const {auditorias} = this.props;

        const auditoriasValidas = []

        auditorias.all.map(auditoria => {
            if(auditoria.idUsuario >= 1) {
                auditoriasValidas.push(auditoria)                 
            }
        })

        const calcularTotal = (valOne,valTwo, valThree, valFour, valFive, valSix) => {
            let suma = valOne + valTwo + valThree + valFour + valFive + valSix
            let calcularPromedio = (suma / 6).toFixed(2)
            return calcularPromedio
        }

        let formatoFecha
        auditoriasValidas.map(auditoriaValida => {
            formatoFecha = moment(auditoriaValida.fechaCaptura ).format('YYYY-MM-DD')
        })

       
        return (
            <Segment textAlign={"left"} container="true">
                <h3>Listado de auditorias</h3>
                <Grid padded>
                    <Grid.Row only='computer tablet'>
                        <Grid.Column style={{paddingLeft: 0, paddingRight: 0}}>
                            { !auditoriasValidas.length &&
                                <Message warning style={{width: "100%"}}>
                                    <Message.Header>
                                        No hubo resultados
                                    </Message.Header>
                                    <p>
                                        No hay revisiones con los criterios seleccionados
                                    </p>
                                </Message>
                            }
                            { auditoriasValidas.length &&
                            <Table celled padded>
                                <Table.Header style={{fontSize: "14px"}}>
                                    <Table.Row>
                                        <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Fecha</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Auditor</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Unidad</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Operador</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Puntos obtenidos</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Evaluación</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Comentarios</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body style={{fontSize: "12px"}}>

                                    {auditoriasValidas.map(auditoriaValida =>
                                        <Table.Row key={auditoriaValida.id}>
                                            <Table.Cell singleLine> {auditoriaValida.id} </Table.Cell>
                                            <Table.Cell> {formatoFecha} </Table.Cell>
                                            <Table.Cell> {auditoriaValida.getUsuario().nombre} </Table.Cell>
                                            <Table.Cell>
                                                {auditoriaValida.idUnidad > 1 &&
                                                    auditoriaValida.idUnidad
                                                }
                                                {auditoriaValida.idUnidad === 0 &&
                                                     auditoriaValida.getOperador().idUnidad
                                                }

                                            </Table.Cell>
                                            <Table.Cell>
                                                {auditoriaValida.getOperador().nombre || 
                                                auditoriaValida.getOperador().nombre === null &&
                                                    auditoriaValida.getOperador().nombre
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                {calcularTotal(auditoriaValida.calificacionLimpiezaUniforme, auditoriaValida.calificacionUsoUniforme, auditoriaValida.calificacionLimpiezaInteriorUnidad, auditoriaValida.calificacionLimpiezaExteriorUnidad, auditoriaValida.calificacionCortePelo, auditoriaValida.calificacionAseoOperador)}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <ModalEvaluacion 
                                                    limpiezaUniforme={auditoriaValida.calificacionLimpiezaUniforme}
                                                    usoUniforme={auditoriaValida.calificacionUsoUniforme}
                                                    limpiezaInterior={auditoriaValida.calificacionLimpiezaInteriorUnidad}
                                                    limpiezaExterior={auditoriaValida.calificacionLimpiezaExteriorUnidad}
                                                    cortePelo={auditoriaValida.calificacionCortePelo}
                                                    aseoOperador={auditoriaValida.calificacionAseoOperador}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <ModalComentarios 
                                                    comentarios={auditoriaValida.comentarios}
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                    }
                                </Table.Body>
                            </Table>
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row only='mobile'>
                        <Grid.Column style={{paddingLeft: 0, paddingRight: 0}}>
                            { !auditoriasValidas.length &&
                                <Message warning style={{width: "100%"}}>
                                    <Message.Header>
                                        No hubo resultados
                                    </Message.Header>
                                    <p>
                                        No hay revisiones con los criterios seleccionados
                                    </p>
                                </Message>
                            }
                            { auditoriasValidas.length &&
                                <List divided relaxed>
                                    {auditoriasValidas.map(auditoriaValida =>
                                        <List.Item key={auditoriaValida.id}>   
                                            <List.Content>
                                                <List.Header>
                                                    <Label color="green" ribbon='right'>
                                                        <Icon name='bus' /> ID {auditoriaValida.id}
                                                    </Label>          
                                                </List.Header>
                                                
                                                <List.List>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Fecha</List.Header>
                                                        <List.Description>{formatoFecha}</List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Auditor</List.Header>
                                                        <List.Description>{auditoriaValida.getUsuario().nombre}</List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Unidad</List.Header>
                                                        <List.Description>
                                                            {auditoriaValida.idUnidad > 1 &&
                                                                auditoriaValida.idUnidad
                                                            }
                                                            {auditoriaValida.idUnidad === 0 &&
                                                                auditoriaValida.getOperador().idUnidad
                                                            }
                                                        </List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Operador</List.Header>
                                                        <List.Description>
                                                            {auditoriaValida.getOperador().nombre || 
                                                            auditoriaValida.getOperador().nombre === null &&
                                                                auditoriaValida.getOperador().nombre
                                                            }
                                                        </List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Puntos obtenidos</List.Header>
                                                        <List.Description>
                                                            {calcularTotal(auditoriaValida.calificacionLimpiezaUniforme, auditoriaValida.calificacionUsoUniforme, auditoriaValida.calificacionLimpiezaInteriorUnidad, auditoriaValida.calificacionLimpiezaExteriorUnidad, auditoriaValida.calificacionCortePelo, auditoriaValida.calificacionAseoOperador)}
                                                        </List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Evaluación</List.Header>
                                                        <List.Description>
                                                            <ModalEvaluacion 
                                                                limpiezaUniforme={auditoriaValida.calificacionLimpiezaUniforme}
                                                                usoUniforme={auditoriaValida.calificacionUsoUniforme}
                                                                limpiezaInterior={auditoriaValida.calificacionLimpiezaInteriorUnidad}
                                                                limpiezaExterior={auditoriaValida.calificacionLimpiezaExteriorUnidad}
                                                                cortePelo={auditoriaValida.calificacionCortePelo}
                                                                aseoOperador={auditoriaValida.calificacionAseoOperador}
                                                            />
                                                        </List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Comentarios</List.Header>
                                                        <List.Description>
                                                            <ModalComentarios 
                                                                comentarios={auditoriaValida.comentarios}
                                                            />
                                                        </List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                </List.List>
                                            </List.Content>
                                        </List.Item>
                                    )}
                                </List>
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}

ListadoAuditorias.propTypes = {
    auditorias: PropTypes.object.isRequired,
}

export default ListadoAuditorias