import React from 'react'
import { Button, Modal, Rating, List } from 'semantic-ui-react'

function ModalEvaluacionRevisiones(props) {

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
                <List.Header>Unidad limpieza interior</List.Header>
                <List.Description>
                      {props.limpiezaInterior &&
                        <Rating icon='star' size='small'
                                defaultRating={props.limpiezaInterior} maxRating={4}
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
                                defaultRating={props.limpiezaExterior} maxRating={4}
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

export default ModalEvaluacionRevisiones