import React from 'react'
import {Button, Form, Grid, Header, Segment, Message} from 'semantic-ui-react'
import PropTypes from 'prop-types'

const LoginForm = ({requestLogin, login: {user, fetching, error, received_date}, onEo}) => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [usuario] = React.useState(localStorage.getItem('usuario') || null)

    React.useEffect(() => {
        if (user) {
            localStorage.setItem('usuario', JSON.stringify(user))
        }
    })

    React.useEffect(() => {
        if (user || usuario) {
            onEo()
        }
    })

    const onSubmit = () => {
        const params = {
            email,
            password
        }

        requestLogin(params)
    }

    const onChangeEmail = event => setEmail(event.target.value)
    const onChangePassword = event => setPassword(event.target.value)

    return (
        <div className='login-form'>
            {/*
         Heads up! The styles below are necessary for the correct render of this example.
         You can do same with CSS, the main idea is that all the elements up to the `Grid`
         below must have a height of 100%.
         */}
            <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}
            </style>
            <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='orange' textAlign='center'>
                        Credenciales necesarias
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input name="email" fluid icon='user' iconPosition='left'
                                        placeholder='Correo electrónico'
                                        value={email} onChange={onChangeEmail}/>

                            <Form.Input name="password" fluid icon='lock' iconPosition='left' placeholder='Password'
                                        type='password' value={password} onChange={onChangePassword}/>

                            <Button loading={fetching} color={"orange"} fluid size='large' onClick={onSubmit}>
                                Entrar
                            </Button>
                        </Segment>
                    </Form>
                    {
                        error && received_date &&
                        <Message negative>
                            <Message.Header>Acceso denegado ({error.status})</Message.Header>
                            {error.data.mensaje}
                        </Message>
                    }
                </Grid.Column>
            </Grid>
        </div>
    )
}

LoginForm.propTypes = {
    requestLogin: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    onEo: PropTypes.func.isRequired
}

export default LoginForm

