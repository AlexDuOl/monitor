import {connect} from 'react-redux'

import
{
    requestDispositivos
} from '../../actions/dispositivos'

import ListadoCelulares from '../../components/Dispositivos/ListadoCelulares'

const mapStateToProps = ({dispositivos}) => {
    return {
        dispositivos
    }
}

const mapActionsToProps = {
    requestDispositivos
}

export default connect(mapStateToProps, mapActionsToProps)(ListadoCelulares)
