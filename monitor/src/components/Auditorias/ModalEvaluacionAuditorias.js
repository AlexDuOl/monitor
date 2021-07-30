import React from 'react'
import { Button, Modal, Rating, List } from 'semantic-ui-react'

function ModalEvaluacion(props) {

  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='orange' size='mini'>Ver detalles</Button>}
    >
      <Modal.Header>Detalles de la evaluación</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <List divided relaxed>
            <List.Item>
              <List.Icon name='bus' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>Uniforme limpieza</List.Header>
                <List.Description>
                      {props.limpiezaUniforme &&
                        <Rating icon='star' size='small'
                                defaultRating={props.limpiezaUniforme} maxRating={3}
                                disabled/>
                      }
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='bus' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>Uniforme uso</List.Header>
                <List.Description>
                      {props.usoUniforme &&
                        <Rating icon='star' size='small'
                                defaultRating={props.usoUniforme} maxRating={3}
                                disabled/>
                      } 
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='bus' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>Unidad limpieza interior</List.Header>
                <List.Description>
                      {props.limpiezaInterior &&
                        <Rating icon='star' size='small'
                                defaultRating={props.limpiezaInterior} maxRating={3}
                                disabled/>
                      }
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='bus' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>Unidad limpieza exterior</List.Header>
                <List.Description>
                      {props.limpiezaExterior &&
                        <Rating icon='star' size='small'
                                defaultRating={props.limpiezaExterior} maxRating={3}
                                disabled/>
                      }
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='bus' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>Chofer cabello</List.Header>
                <List.Description>
                      {props.cortePelo &&
                        <Rating icon='star' size='small'
                                defaultRating={props.cortePelo} maxRating={3}
                                disabled/>
                      }
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='bus' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>Chofer aseo</List.Header>
                <List.Description>
                      {props.aseoOperador &&
                        <Rating icon='star' size='small'
                                defaultRating={props.aseoOperador} maxRating={3}
                                disabled/>
                      }
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cerrar</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalEvaluacion