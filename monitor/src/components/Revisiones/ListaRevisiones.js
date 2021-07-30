import React, {Component} from "react"
import PropTypes from "prop-types";
import moment from "moment";
import {Table, Segment, Grid, Rating, Message, List, Label, Icon} from 'semantic-ui-react'
import ModalEvaluacionRevisiones from "./ModalEvaluacionRevisiones";
import ModalNotasRevisiones from "./ModalNotasRevisiones";
class ListadoRevisiones extends Component {

    render() {
        const {revisiones} = this.props;

        const validValues = []
        revisiones.all.map(revision => {
            if (revision.usuario_id >= 1) {
                validValues.push(revision)
            }
        })

        let formatoFecha
        validValues.map(validValue => {
            formatoFecha = moment(validValue.fecha).format('YYYY-MM-DD')
        })

        return (
            <Segment textAlign={"left"} container="true">
                <h3>Listado de revisiones</h3>
                <Grid padded>
                    <Grid.Row only='computer tablet'>
                        <Grid.Column style={{paddingLeft: 0, paddingRight: 0}}>
                            { !validValues.length &&
                                <Message warning style={{width: "100%"}}>
                                    <Message.Header>
                                        No hubo resultados
                                    </Message.Header>
                                    <p>
                                        No hay revisiones con los criterios seleccionados
                                    </p>
                                </Message>
                            }
                            {validValues.length &&
                            <Table celled padded>
                                <Table.Header style={{fontSize: "14px"}}>
                                    <Table.Row>
                                        <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Fecha</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Auditor</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Unidad</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Operador</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Kilometraje</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Notas</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Evaluación</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body style={{fontSize: "12px"}}>

                                    {validValues.map(validValue =>
                                        <Table.Row key={validValue.id}>
                                            <Table.Cell singleLine> {validValue.id} </Table.Cell>
                                            <Table.Cell> {formatoFecha} </Table.Cell>
                                            <Table.Cell> {validValue.getUsuario().nombre} </Table.Cell>
                                            <Table.Cell>
                                                {validValue.unidadId > 1 &&
                                                    validValue.unidadId
                                                }
                                                {validValue.unidadId === 0 &&
                                                    validValue.getProveedor().tipoContacto
                                                }

                                            </Table.Cell>
                                            <Table.Cell>
                                                {validValue.operadorSumaId > 1 &&
                                                    validValue.getOperadorSuma().nombre
                                                }
                                                {validValue.operadorSumaId === 0 &&
                                                    validValue.getProveedor().tipoContacto
                                                }
                                            </Table.Cell>
                                            <Table.Cell> {validValue.kilometraje} </Table.Cell>
                                            <Table.Cell> 
                                                <ModalNotasRevisiones 
                                                    nota={validValue.nota}
                                                    notaMantenimiento={validValue.notaMantenimiento}
                                                /> 
                                            </Table.Cell>
                                            <Table.Cell>
                                                <ModalEvaluacionRevisiones
                                                    limpiezaInterior={validValue.limpiezaInterior}
                                                    limpiezaExterior={validValue.limpiezaExterior}
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
                            { !validValues.length &&
                                <Message warning style={{width: "100%"}}>
                                    <Message.Header>
                                        No hubo resultados
                                    </Message.Header>
                                    <p>
                                        No hay revisiones con los criterios seleccionados
                                    </p>
                                </Message>
                            }
                            { validValues.length &&
                                <List divided relaxed>
                                    {validValues.map(validValue =>
                                        <List.Item key={validValue.id}>   
                                            <List.Content>
                                                <List.Header>
                                                    <Label color="green" ribbon='right'>
                                                        <Icon name='bus' /> ID {validValue.id}
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
                                                        <List.Description>{validValue.getUsuario().nombre}</List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Unidad</List.Header>
                                                        <List.Description>
                                                            {validValue.unidadId > 1 &&
                                                                validValue.unidadId
                                                            }
                                                            {validValue.unidadId === 0 &&
                                                                validValue.getProveedor().tipoContacto
                                                            }
                                                        </List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Operador</List.Header>
                                                        <List.Description>
                                                        {validValue.operadorSumaId > 1 &&
                                                            validValue.getOperadorSuma().nombre
                                                        }
                                                        {validValue.operadorSumaId === 0 &&
                                                            validValue.getProveedor().tipoContacto
                                                        }
                                                        </List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Kilometraje</List.Header>
                                                        <List.Description>
                                                            {validValue.kilometraje} 
                                                        </List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Evaluación</List.Header>
                                                        <List.Description>
                                                            <ModalEvaluacionRevisiones
                                                                limpiezaInterior={validValue.limpiezaInterior}
                                                                limpiezaExterior={validValue.limpiezaExterior}
                                                            />
                                                        </List.Description>
                                                        </List.Content>
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Content>
                                                        <List.Header>Notas</List.Header>
                                                        <List.Description>
                                                            <ModalNotasRevisiones 
                                                                nota={validValue.nota}
                                                                notaMantenimiento={validValue.notaMantenimiento}
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

ListadoRevisiones.propTypes = {
    revisiones: PropTypes.object.isRequired,
}

export default ListadoRevisiones