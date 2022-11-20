import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ClientSearchParams from './ClientSearchParams';


export default function PropertySearch({currentUser}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { clientUid } = location.state;
    const currentClient = currentUser.clients.filter(client => client.uid == clientUid)[0];
    // console.log(location.state)
    const [clientId, setClientId] = useState(clientUid);
    return (
        <>
            <div className="tab-title-submenu">
                <div className="mx-5">
                    <h1 className='mt-0'>Create a search</h1>
                </div>
            </div>
            <ClientSearchParams currentUser={currentUser} clientId={clientId} client={currentClient} />
        </>
    )
}
