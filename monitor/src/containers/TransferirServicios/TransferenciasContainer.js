import {connect} from 'react-redux'

import Transferencias from '../../components/TransferirServicios/Transferencias'

const mapStateToProps = ({transferencias}) => {
    return {
        transferencias
    }
}

export default connect(mapStateToProps)(Transferencias)
