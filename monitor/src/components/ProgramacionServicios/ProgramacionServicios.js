import React, {Component} from 'react'
import {Message, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import FormaProgramacionServicios from '../../containers/ProgramacionServicios/FormaProgramacionServiciosContainer'
import Resultados from './Resultados'
import ListadoBitacorasProgramadas from './ListadoBitacorasProgramadas'


class ProgramacionServicios extends Component {

    render() {
        const {programacion, bitacoras, login: {user}} = this.props

        if (user.puedeProgramarServicios()) {
            return (
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <h3 style={{textAlign: "left"}}>Programación servicios</h3>
                    <FormaProgramacionServicios onFormSubmit={this.onFormSubmit}/>
                    <Resultados programacion={programacion}/>
                    <hr/>
                    <ListadoBitacorasProgramadas bitacoras={bitacoras.listado}/>
                </Grid.Column>
            )
        } else {
            return (
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Message warning>
                        <Message.Header>Solo el Programador Sr puede realizar esta acción</Message.Header>
                        <p>Si requieres acceso, favor de validar con Sistemas</p>
                    </Message>
                </Grid.Column>
            )
        }
    }
}

ProgramacionServicios.propTypes = {
    programacion: PropTypes.object.isRequired,
    bitacoras: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
}

export default ProgramacionServicios
