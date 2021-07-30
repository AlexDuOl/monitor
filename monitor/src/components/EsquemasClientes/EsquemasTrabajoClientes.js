import _ from 'lodash'
import React from 'react'
import {
    Form,
    Input,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow
} from 'semantic-ui-react'

import FormaCargarHorariosRuta from "./FormaCargarHorariosRuta";
import BaseComponent from "../BaseComponent";
import PropTypes from "prop-types";

class EsquemasTrabajoClientes extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        this.props.requestClientes(['activo=true', 'id_categoria=1', 'or(id=5)', 'sort(+nombre_empresa)'])
    }

    getCheckboxes(horario) {
        const key = Object.keys(horario)[0]

        try {
            return <Form.Checkbox name={key} checked={this.state[key]} onChange={this.onChangeValue}/>
        } catch (e) {
            return <Form.Checkbox name={key} checked={horario[key]} onChange={this.onChangeValue}/>
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.horarios.horarios_ruta.received_date) {
            const turnos = nextProps.horarios.horarios_ruta.turnos
            const acc_turnos = {}

            turnos.forEach((item) => {
                const key = Object.keys(item)[0]
                acc_turnos[key] = item[key]
            })

            this.setState({
                ...acc_turnos
            })

            const tiempos = nextProps.horarios.horarios_ruta.tiempos
            this.setState({
                ...tiempos
            })

        }
    }

    getCells(horarios) {
        return horarios.map((horario) => {
            const key = Object.keys(horario)[0]
            return (
                <TableCell key={key}>
                    {this.getCheckboxes(horario)}
                </TableCell>
            )
        })
    }

    getInputTime(key) {
        return <Input type={'time'} name={key} value={this.state[key]} onChange={this.onChangeValue}/>
    }

    getValueTime(key, idx) {
        const keyTi = [key, 'TI'].join('')
        const keyTf = [key, 'TF'].join('')

        return (
            <TableCell key={["turno", idx].join("_")}>
                {key} &nbsp;
                {this.getInputTime(keyTi)}<span>&nbsp; a &nbsp;</span>
                {this.getInputTime(keyTf)}
            </TableCell>
        )
    }

    getRows() {
        const {horarios: {horarios_ruta: {turnos, fetching}}} = this.props

        if (turnos && !fetching) {
            return _.chunk(turnos, 7).map((turno, idx) => {

                const turnoKey = Object.keys(turno[0])[0].substring(0, 7)

                return <TableRow key={idx} textAlign={"center"}>
                    {this.getValueTime(turnoKey, idx)}
                    {this.getCells(turno)}
                </TableRow>
            })
        }
    }

    updateHorariosRuta = (idRuta, desde, hasta) => {
        this.props.requestHorariosRutaUpdate(idRuta, desde, hasta, this.state)
    }

    render() {
        const {clientes, rutas, horarios, login: {user}} = this.props
        const {invalidarRutas, requestRutas, requestHorariosRuta} = this.props

        return (
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <h3 style={{textAlign: "left"}}>Esquemas</h3>
                    <FormaCargarHorariosRuta
                        clientes={clientes}
                        rutas={rutas}
                        user={user}
                        horariosFetching={horarios.horarios_ruta.fetching}
                        onInvalidarRutas={invalidarRutas}
                        onRequestRutas={requestRutas}
                        onRequestHorariosRuta={requestHorariosRuta}
                        onUpdateHorariosRuta={this.updateHorariosRuta}
                    />

                    {
                        horarios.horarios_ruta.received_date &&
                        <Table celled selectable>
                            <TableHeader>
                                <TableRow textAlign='center'>
                                    <TableCell>TURNO</TableCell>
                                    <TableCell>L</TableCell>
                                    <TableCell>M</TableCell>
                                    <TableCell>M</TableCell>
                                    <TableCell>J</TableCell>
                                    <TableCell>V</TableCell>
                                    <TableCell>S</TableCell>
                                    <TableCell>D</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.getRows()}
                            </TableBody>
                        </Table>
                    }
            </Grid.Column>
        )
    }
}

EsquemasTrabajoClientes.propTypes = {
    clientes: PropTypes.object.isRequired,
    rutas: PropTypes.object.isRequired,
    horarios: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    invalidarRutas: PropTypes.func.isRequired,
    requestRutas: PropTypes.func.isRequired,
    requestHorariosRuta: PropTypes.func.isRequired,
    requestClientes: PropTypes.func.isRequired
}

export default EsquemasTrabajoClientes
