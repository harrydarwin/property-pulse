import React, { useState } from 'react';
import { deleteClient, deleteClientQuery } from './firebase';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./Modals.css";


export default function ClientDeleteButton({clientName, clientID, dataID, clientList, queryID}) {
  // console.log(clientList)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
      e.preventDefault();
      setShow(true);
  }
  const handleDeleteClient = (dataID, clientID, clientList) => {
    // console.log(clientList)
      deleteClient(dataID, clientID, clientList);
  }

  const handleDeleteQuery = () => {
    deleteClientQuery(dataID, clientID, clientList, queryID);
}

  const toDelete = queryID ? 'query' : 'client';

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
          Clicking 'delete {toDelete}' will remove this {toDelete} and all of {queryID ? 'its' : 'their'} data permanently.
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-standard" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn-warning btn-standard" onClick={queryID ? () => handleDeleteQuery(dataID, clientID, clientList.clientList, queryID) : () => handleDeleteClient(dataID, clientID, clientList.clientList)}><FontAwesomeIcon icon={faTrash} /> Delete {toDelete}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
