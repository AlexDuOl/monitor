import {connect} from 'react-redux'

import ProgramacionServicios from '../../components/ProgramacionServicios/ProgramacionServicios'

const mapStateToProps = ({programacion, bitacoras, login}) => {
    return {
        programacion,
        bitacoras,
        login
    }
}

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(ProgramacionServicios)
