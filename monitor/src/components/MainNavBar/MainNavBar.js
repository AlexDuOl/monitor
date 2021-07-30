import React from 'react'
import {NavLink} from 'react-router-dom'
import {Container, Item, Menu, Icon, Segment, Grid, List} from 'semantic-ui-react'
import {API_ADDRESS} from "../../constants/endpoints";
import PropTypes from 'prop-types'

const getMainMenuItems = (menus) => {
    return menus.map((item, index) => {
        return (
            <Menu.Item as={NavLink} key={index} to={item.route} exact style={{fontSize: ".984em"}}>
                {item.title}
            </Menu.Item>
        )
    })
}

const MainNavBar = ({items, usuario}) => {
    return (
        <Container>
            {
                API_ADDRESS.includes("tapi") ?
                    <Container>
                        <Item style={{color: "red", fontWeight: "700"}}><Icon name='cogs'/>Testing</Item>
                    </Container> :
                    <Container>
                        <Item name='user' style={{color: "grey", fontWeight: "700"}}>
                            <span>{usuario.iniciales}</span> &nbsp;
                            <Icon color={'orange'} name='user'/>
                        </Item>
                    </Container>
            }
            <Menu stackable>
                {getMainMenuItems(items)}
            </Menu>
        </Container>
    )
}

MainNavBar.propTypes = {
    items: PropTypes.array.isRequired,
    usuario: PropTypes.object.isRequired,
}

export default MainNavBar
