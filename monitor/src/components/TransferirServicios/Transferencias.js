import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import FormaTransferirServicios from '../../containers/TransferirServicios/FormaTransferirServiciosContainer'
import Resultados from './Resultados'

class Transferencias extends Component {
    render() {

        const {transferencias} = this.props

        return (
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <h3 style={{textAlign: "left"}}>Transferir servicios</h3>
                <FormaTransferirServicios transferencias={transferencias}/>
                <Resultados transferencias={transferencias}/>
            </Grid.Column>
        )
    }
}

Transferencias.propTypes = {
    transferencias: PropTypes.object.isRequired
}

export default Transferencias
