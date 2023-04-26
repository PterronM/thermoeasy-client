import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';




function ModalDeleteRec({show,handleClose,eliminar}) {
  return (
    
    <Modal 
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered 
    show={show} onHide={handleClose} animation={false}>
    <Modal.Body>¿Desea eliminar la receta?</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
        Atras
      </Button>
      <Button variant="danger" onClick={eliminar}>
        Eliminar
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalDeleteRec
