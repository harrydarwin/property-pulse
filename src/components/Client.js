import React from 'react';
import { Link } from 'react-router-dom';
import ClientDeleteButton from './ClientDeleteButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import "./Client.css";



export default function Client({fname, lname, email, phone, address, openQueries, queries, id, dataID, clientList}) {

  return (
    <div id={'client-' + id} className='client'>
        <div className="client-info">{fname}</div>
        <div className="client-info">{lname}</div>
        <div className="client-info">{email}</div>
        <div className="client-info">{phone}</div>
        <div className="client-info">{address.addrFormatted}</div>
        <div className="client-info icon icon-add"><FontAwesomeIcon icon={faMagnifyingGlassPlus} /></div>
        <div className="client-info icon icon-edit"><Link className="p-3" to="EditClientForm" state={{ clientUid: id }}><FontAwesomeIcon icon={faPencil} /></Link></div>
        <div className="client-info icon">
            <ClientDeleteButton
                clientName={fname + ' ' + lname}
                clientID={id}
                dataID={window.localStorage.pp47userAccessToken? window.localStorage.pp47userAccessToken : dataID}
                clientList={clientList}
            />
        </div>
    </div>
  )
}

// USED LOCAL STORAGE HACK TO CARRY DATA ID - NEED TO FIX