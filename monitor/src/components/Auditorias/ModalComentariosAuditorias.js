import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function ModalComentarios(props) {

  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="orange" size='mini'>Ver detalles</Button>}
    >
      <Modal.Header>Comentarios</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {props.comentarios}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cerrar</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalComentarios