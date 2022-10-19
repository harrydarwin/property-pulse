import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import ClientSearchParams from './ClientSearchParams';


export default function PropertySearchForm({currentUser}) {
    const location = useLocation();
    const { clientUid } = location.state;

    return (
        <>
            <div className="tab-title-submenu d-flex justify-content-between align-items-center mx-5">
                <h1 className='mt-0'>Create a search</h1>
                <ul className="submenu">
                    <li className="submenu-item">
                        <Link to="/dashboard/clients"><FontAwesomeIcon icon={faArrowRotateLeft} /> <span className="ml-1">Back</span></Link>
                    </li>
                </ul>
            </div>
            <ClientSearchParams currentUser={currentUser} clientId={clientUid} />
        </>
    )
}
