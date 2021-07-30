import React from 'react'
import { Grid } from 'semantic-ui-react'

import FormaProgramarExcepcionServicio from '../../containers/Excepciones/FormaProgramacionExcepcionContainer'

const RegistroExcepciones = () => (
    <Grid.Column mobile={16} tablet={16} computer={16}>
        <h3 style={{textAlign: "left"}}>Excepciones</h3>
        <FormaProgramarExcepcionServicio />
    </Grid.Column>
)

export default RegistroExcepciones
