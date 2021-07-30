import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import {Item, Menu, Icon, Grid, Dropdown, Segment} from 'semantic-ui-react'

import LoginForm from './LoginForm/LoginFormContainer'
import MonitorServicios from './MonitorServicios/MonitorServiciosContainer'
import ProgramacionServicios from './ProgramacionServicios/ProgramacionServiciosContainer'
import TransferirServicios from './TransferirServicios/TransferenciasContainer'
import VistaProgramados from './VistaProgramaciones/VistaProgramacionesContainer'
import RegistroExcepciones from '../components/Excepciones/RegistroExcepciones'
import ListarBitacorasContainer from './CapturarBitacoras/CapturaBitacorasContainer'
import ListadoCelularesContainer from './Dispositivos/ListadoCelularesContainer'
import EsquemasTrabajoClientesContainer from "./EsquemasClientes/EsquemasTrabajoClientesContainer";
import ActualizarPrecios from "./ActualizarPrecios/ActualizarPreciosContainer";
import ListaSanitizaciones from './Sanitizaciones';
import Auditorias from "./Auditorias/Auditorias";
import Revisiones from "./Revisiones/Revisiones";

import '../styles/core.scss'
import {REQUEST_LOGIN_SUCCESS} from "../constants/action_types";
import {API_ADDRESS} from "../constants/endpoints";

class AppContainer extends Component {

  constructor(props) {
    super(props)

    this.testEo = this.testEo.bind(this)
  }

  componentDidUpdate () {
    const usuario = localStorage.getItem('usuario')

    if(usuario) {
      this.props.store.dispatch({
        type: REQUEST_LOGIN_SUCCESS,
        payload: {
          data: JSON.parse(usuario)
        }
      })
    }
  }

  testEo() {
    this.forceUpdate()
  }

  render() {
    const {store} = this.props
    const usuario = store.getState().login.user
    const debug = false

    return (
      <Provider store={store}>
        <Router>
        {
          usuario || debug ? (

              <Grid centered padded>
                <Grid.Row stretched columns={16} style={{padding: 0}}>
                  <Grid.Column mobile={16} tablet={16} only='mobile'>
                    <Menu stackable>
                        {
                          API_ADDRESS.includes("tapi") ?

                              <Item key="testing" style={{color: "red", fontWeight: "700"}}><Icon name='cogs'/>Testing</Item>
                              :
                              <Item key="user" name='user' style={{color: "grey", fontWeight: "700"}}>
                                <span>{usuario.iniciales}</span> &nbsp;
                                <Icon color={'orange'} name='user'/>
                              </Item>
                        }
                        <Dropdown item text='Módulos'>
                          <Dropdown.Menu>
                            <Dropdown.Item to="/" as={NavLink} key="home" exact>Monitoreo de servicios</Dropdown.Item>
                            <Dropdown.Item to="/programar-servicios" key="programar" as={NavLink} exact>Programación servicios</Dropdown.Item>
                            <Dropdown.Item to="/transferir-servicios" key="transferir" as={NavLink} exact>Transferir servicios</Dropdown.Item>
                            <Dropdown.Item to="/vista-programados" key="programados" as={NavLink} exact>Vista programados</Dropdown.Item>
                            <Dropdown.Item to="/registrar-excepcion" key="excepcion" as={NavLink} exact>Excepciones</Dropdown.Item>
                            <Dropdown.Item to="/listar-bitacoras" key="bitacoras" as={NavLink} exact>Bitácoras</Dropdown.Item>
                            <Dropdown.Item to="/validar-esquemas" key="esquemas" as={NavLink} exact>Esquemas</Dropdown.Item>
                            <Dropdown.Item to="/reporte-sanitizaciones" key="sanitizaciones" as={NavLink} exact>Sanitizaciones</Dropdown.Item>
                            <Dropdown.Item to="/actualizar-precios" key="precios" as={NavLink} exact>Precios</Dropdown.Item>
                            <Dropdown.Item to="/listar-celulares" key="celulares" as={NavLink} exact>Celulares</Dropdown.Item>
                            <Dropdown.Item to="/revision" key="revision" as={NavLink} exact>Revisión</Dropdown.Item>
                            <Dropdown.Item to="/auditorias" key="auditorias" as={NavLink} exact>Auditorias</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    </Menu>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{paddingTop: 0}}>
                  <Grid.Column container="true" only='computer'>
                    {
                      API_ADDRESS.includes("tapi") ?

                          <Menu secondary compact fluid widths={12}>
                            <Item key="testing" style={{color: "red", fontWeight: "700"}}><Icon name='cogs'/>Testing</Item>
                          </Menu>
                          :
                          <Menu secondary compact fluid widths={12}>
                            <Item key="user" name='user' style={{color: "grey", fontWeight: "700"}}>
                              <span>{usuario.iniciales}</span> &nbsp;
                              <Icon color={'orange'} name='user'/>
                            </Item>
                          </Menu>
                      
                    }
                    <Menu pointing secondary attached='top' fluid widths={12}>
                      <Menu.Item to="/" as={NavLink} key="home" exact>Monitoreo de servicios</Menu.Item>
                      <Menu.Item to="/programar-servicios" key="programar" as={NavLink} exact>Programación servicios</Menu.Item>
                      <Menu.Item to="/transferir-servicios" key="transferir" as={NavLink} exact>Transferir servicios</Menu.Item>
                      <Menu.Item to="/vista-programados" key="programados" as={NavLink} exact>Vista programados</Menu.Item>
                      <Menu.Item to="/registrar-excepcion" key="excepcion" as={NavLink} exact>Excepciones</Menu.Item>
                      <Menu.Item to="/listar-bitacoras" key="bitacoras" as={NavLink} exact>Bitácoras</Menu.Item>
                      <Menu.Item to="/reporte-sanitizaciones" key="sanitizaciones" as={NavLink} exact>Sanitizaciones</Menu.Item>
                      <Menu.Item to="/listar-celulares" key="celulares" as={NavLink} exact>Celulares</Menu.Item>
                      <Menu.Item to="/actualizar-precios" key="precios" as={NavLink} exact>Precios</Menu.Item>
                      <Menu.Item to="/validar-esquemas" key="esquemas" as={NavLink} exact>Esquemas</Menu.Item>
                      <Menu.Item to="/revision" key="revision" as={NavLink} exact>Revisión</Menu.Item>
                      <Menu.Item to="/auditorias" key="auditorias" as={NavLink} exact>Auditorias</Menu.Item>
                    </Menu>
                  </Grid.Column>
                </Grid.Row>

                <Route path="/" exact component={MonitorServicios}/>
                <Route path="/programar-servicios" exact component={ProgramacionServicios}/>
                <Route path="/transferir-servicios" component={TransferirServicios}/>
                <Route path="/vista-programados" component={VistaProgramados}/>
                <Route path="/registrar-excepcion" component={RegistroExcepciones}/>
                <Route path="/listar-bitacoras" component={ListarBitacorasContainer}/>
                <Route path="/listar-celulares" component={ListadoCelularesContainer}/>
                <Route path="/validar-esquemas" component={EsquemasTrabajoClientesContainer}/>
                <Route path="/actualizar-precios" component={ActualizarPrecios}/>
                <Route path="/reporte-sanitizaciones" component={ListaSanitizaciones}/>
                <Route path="/auditorias" component={Auditorias}/>
                <Route path="/revision" component={Revisiones}/>
            </Grid>
            ) : (
            <LoginForm
            onEo={this.testEo} />
            )
          }
        </Router>
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  store: PropTypes.object.isRequired
}

export default AppContainer

{/*
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Container} from 'semantic-ui-react'

import LoginForm from './LoginForm/LoginFormContainer'
import MonitorServicios from './MonitorServicios/MonitorServiciosContainer'
import ProgramacionServicios from './ProgramacionServicios/ProgramacionServiciosContainer'
import TransferirServicios from './TransferirServicios/TransferenciasContainer'
import VistaProgramados from './VistaProgramaciones/VistaProgramacionesContainer'
import RegistroExcepciones from '../components/Excepciones/RegistroExcepciones'
import ListarBitacorasContainer from './CapturarBitacoras/CapturaBitacorasContainer'
import ListadoCelularesContainer from './Dispositivos/ListadoCelularesContainer'
import EsquemasTrabajoClientesContainer from "./EsquemasClientes/EsquemasTrabajoClientesContainer";
import ActualizarPrecios from "./ActualizarPrecios/ActualizarPreciosContainer";
import MainNavBar from '../components/MainNavBar/MainNavBar'
import ListaSanitizaciones from './Sanitizaciones';
import Auditorias from "./Auditorias/Auditorias";
import Revisiones from "./Revisiones/Revisiones";

import '../styles/core.scss'
import {REQUEST_LOGIN_SUCCESS} from "../constants/action_types";

const menus = [
  {
    title: 'Monitor de servicios',
    route: '/',
    name: 'monitor-servicios'
  },
  {
    title: 'Revisión',
    route: '/revision',
    name: 'revision'
  },
  {
    title: 'Programación de servicios',
    route: '/programar-servicios',
    name: 'programacion'
  },
  {
    title: 'Transferir servicios',
    route: '/transferir-servicios',
    name: 'transferencias'
  },
  {
    title: 'Vista de programados',
    route: '/vista-programados',
    name: 'programaciones'
  },
  {
    title: 'Excepciones',
    route: '/registrar-excepcion',
    name: 'excepciones'
  },
  {
    title: 'Bitácoras',
    route: '/listar-bitacoras',
    name: 'bitacoras'
  },
  {
    title: 'Celulares',
    route: '/listar-celulares',
    name: 'celulares'
  },
  {
    title: 'Esquemas',
    route: '/validar-esquemas',
    name: 'esquemas'
  },
  {
    title: 'Precios',
    route: '/actualizar-precios',
    name: 'precios'
  },
  {
    title: 'Sanitizaciones',
    route: '/reporte-sanitizaciones',
    name: 'sanitizaciones'
  },
  {
    title: 'Auditorias',
    route: '/auditorias',
    name: 'auditorias'
  }
]


class AppContainer extends Component {

  constructor(props) {
    super(props)

    this.testEo = this.testEo.bind(this)
  }

  componentDidUpdate () {
    const usuario = localStorage.getItem('usuario')

    if(usuario) {
      this.props.store.dispatch({
        type: REQUEST_LOGIN_SUCCESS,
        payload: {
          data: JSON.parse(usuario)
        }
      })
    }
  }

  testEo() {
    this.forceUpdate()
  }

  render() {
    const {store} = this.props
    const usuario = store.getState().login.user
    const debug = false

    return (
        <Provider store={store}>
          <Router>
            {
            usuario || debug ? (
              <Container fluid >
                {usuario && <MainNavBar items={menus} usuario={usuario} />}

                <Route path="/" exact component={MonitorServicios}/>
                <Route path="/programar-servicios" exact component={ProgramacionServicios}/>
                <Route path="/transferir-servicios" component={TransferirServicios}/>
                <Route path="/vista-programados" component={VistaProgramados}/>
                <Route path="/registrar-excepcion" component={RegistroExcepciones}/>
                <Route path="/listar-bitacoras" component={ListarBitacorasContainer}/>
                <Route path="/listar-celulares" component={ListadoCelularesContainer}/>
                <Route path="/validar-esquemas" component={EsquemasTrabajoClientesContainer}/>
                <Route path="/actualizar-precios" component={ActualizarPrecios}/>
                <Route path="/reporte-sanitizaciones" component={ListaSanitizaciones}/>
                <Route path="/auditorias" component={Auditorias}/>
                <Route path="/revision" component={Revisiones}/>
              </Container>
            ) : (
              <LoginForm
                onEo={this.testEo} />
            )
          }

          </Router>
        </Provider>
    )
  }
}

AppContainer.propTypes = {
  store: PropTypes.object.isRequired
}

export default AppContainer*/}
