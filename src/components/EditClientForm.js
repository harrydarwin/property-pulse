import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRotateLeft, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import ClientPersonalInfoEdit from './ClientPersonalInfoEdit';
import ClientQueries from './ClientQueries';
import PropertySearchForm from './PropertySearchForm';


export default function EditClientForm({currentUser}) {
    const location = useLocation();
    const { clientUid, clientQueries, client } = location.state;
    const [editClientInfo, setEditClientInfo] = useState(false);
    const [queryMode, setQueryMode] = useState(false);
    console.log(client, location.state)

    const handleCreateNewQuery = e => {
        e.preventDefault();
        setEditClientInfo(false);
        setQueryMode(current => !current);
    }

    const toggleEditMode = e => {
        e.preventDefault();
        setEditClientInfo(current => !current);
        setQueryMode(false);
    }

    return (
        <>
            <div className="tab-title-submenu d-flex justify-content-between align-items-center mx-5">
                <h1 className='mt-0'>Edit client</h1>
                <ul className="submenu d-flex">
                    <li className="submenu-item me-5">
                        <a onClick={toggleEditMode} href="">Edit {editClientInfo == false ? 'client profile' : 'property searches'}</a>
                    </li>
                    <li className="submenu-item me-5">
                        <a onClick={handleCreateNewQuery} href=""><span className="me-1" >New search</span> <FontAwesomeIcon  icon={faMagnifyingGlassPlus} /></a>
                    </li>
                    <li className="submenu-item">
                        <Link to="/dashboard/clients"><FontAwesomeIcon icon={faArrowRotateLeft} /> <span className="ml-1">Back</span></Link>
                    </li>
                </ul>
            </div>
            {
                editClientInfo == false && queryMode == false ?
                <ClientQueries currentUser={currentUser} clientId={clientUid} client={client} />
                : queryMode == true ?
                <PropertySearchForm currentUser={currentUser} clientId={clientUid} fromUser={true}/>
                :
                <ClientPersonalInfoEdit currentUser={currentUser} clientId={clientUid} client={client} />
            }
        </>
    )
}
