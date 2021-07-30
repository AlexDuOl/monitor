import React, {Component, Fragment} from 'react';

import ListaSanitizaciones from '../../components/ReporteSanitizaciones/ListaSanitizaciones';
import FiltrosBusquedaSanitizaciones from '../../components/ReporteSanitizaciones/FiltrosBusquedaSanitizaciones';

class Sanitizaciones extends Component{
    render(){
        return(
            <Fragment>
                <FiltrosBusquedaSanitizaciones/>
                <ListaSanitizaciones/>
            </Fragment>
        )
    }
}
export default Sanitizaciones;