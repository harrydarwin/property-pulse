import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ClientPersonalInfo from './ClientPersonalInfo';
export default function AddClientForm({currentUser, addNewClient}) {


    return (
        <>
            <div className="tab-title-submenu d-flex justify-content-between align-items-center mx-5">
                <h1 className='mt-0'>New client</h1>
                <ul className="submenu">
                    <li className="submenu-item">
                        <Link to="/dashboard/clients"><FontAwesomeIcon icon={faArrowRotateLeft} /> <span className="ml-1">Back</span></Link>
                    </li>
                </ul>
            </div>
            <ClientPersonalInfo currentUser={currentUser} addNewClient={addNewClient} />
        </>
    )
}
