import React, { useState } from 'react';
import { deleteClient } from './firebase';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./Modals.css";


export default function ClientDeleteButton({clientName, clientID, dataID, clientList}) {
    console.log(clientID, dataID)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
      e.preventDefault();
      setShow(true);
  }
  const handleDeleteClient = (dataID, clientID, clientList) => {
      console.log(deleteClient,dataID, clientID, clientList)
      deleteClient(dataID, clientID, clientList);
  }

  return (
    <>
      <a className="icon-delete p-3" href='' onClick={handleShow}>
        <FontAwesomeIcon icon={faTrash} />
      </a>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className='modal-delete-client'
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to remove {clientName}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Clicking 'delete client' will remove this client and all of their data permanently.
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-standard" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn-warning btn-standard" onClick={() => handleDeleteClient(dataID, clientID, clientList.clientList)}><FontAwesomeIcon icon={faTrash} /> Delete client</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
