import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import ClientPersonalInfoEdit from './ClientPersonalInfoEdit';
import ClientQueries from './ClientQueries';


export default function EditClientForm({currentUser}) {
    const location = useLocation();
    const { clientUid, clientQueries, client } = location.state;
    console.log(client)

    return (
        <>
            <div className="tab-title-submenu d-flex justify-content-between align-items-center mx-5">
                <h1 className='mt-0'>Edit client</h1>
                <ul className="submenu">
                    <li className="submenu-item">
                        <Link to="/dashboard/clients"><FontAwesomeIcon icon={faArrowRotateLeft} /> <span className="ml-1">Back</span></Link>
                    </li>
                </ul>
            </div>
            <ClientPersonalInfoEdit currentUser={currentUser} clientId={clientUid} client={client} />
            <ClientQueries currentUser={currentUser} clientId={clientUid} client={client} />
        </>
    )
}
