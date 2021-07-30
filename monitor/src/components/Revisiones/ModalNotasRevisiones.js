import React from 'react'
import { Button, Modal, Header, Divider } from 'semantic-ui-react'

function ModalNotasRevisiones(props) {
  
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="orange" size='mini'>Ver detalles</Button>}
    >
      <Modal.Header>Notas</Modal.Header>
      <Modal.Content>
        {props.nota && 
          <Modal.Description>
            <Header as='h4'>Notas</Header>
              {props.nota}
          </Modal.Description>
        }
        <Divider hidden />
        {props.notaMantenimiento &&
          <Modal.Description>
            <Header as='h4'>Notas Mantenimiento</Header>
              {props.notaMantenimiento}
          </Modal.Description>
        }
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cerrar</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalNotasRevisiones