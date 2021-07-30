import {connect} from 'react-redux'

import {
    requestLogin
} from '../../actions/login'

import LoginForm from '../../components/Forms/LoginForm'

const mapStateToProps = (state) => {
    const {login} = state

    return {login}
}

const mapActionsToProps = {
    requestLogin
}


export default connect(mapStateToProps, mapActionsToProps)(LoginForm)
