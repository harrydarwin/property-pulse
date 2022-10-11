import React from 'react';
import ClientDeleteButton from './ClientDeleteButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import "./Client.css";



export default function Client({fname, lname, email, phone, address, openQueries, queries, id}) {


  return (
    <div id={'client-' + id} className='client'>
        <div className="client-info">{fname}</div>
        <div className="client-info">{lname}</div>
        <div className="client-info">{email}</div>
        <div className="client-info">{phone}</div>
        <div className="client-info">{address.addrFormatted}</div>
        <div className="client-info icon icon-add"><FontAwesomeIcon icon={faMagnifyingGlassPlus} /></div>
        <div className="client-info icon icon-edit"><FontAwesomeIcon icon={faPencil} /></div>
        <div className="client-info icon">
            <ClientDeleteButton
                clientName={fname + ' ' + lname}
                clientId={id}


            />
        </div>

        {/* TRASH CAN - PLUS SIGN - PENCIL FOR CLIENT UTILITIES!!!!!!!!!!!!!!!! */}
    </div>
  )
}
