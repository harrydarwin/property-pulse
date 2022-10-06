import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AddClientForm from './AddClientForm';
import Client from './Client';


function ClientList(currentClients) {
    // check for clients
    console.log(currentClients.currentClients)
    if(currentClients.currentClients && currentClients.currentClients.length < 1){
        return <h3>You haven't added any clients yet. </h3>
    } else {
        const clients = currentClients.currentClients;
        // Map currentClients.current clients into a client component
        return <div className="client-list">
            {/* Players list */}
            {clients.map((client, index) =>
                    <Client
                        fname={client.fname}
                        lname={client.lname}
                        address={client.currentAddress}
                        email={client.email}
                        phone={client.phoneNumber}
                        openQueries={client.openQueries}
                        queries={client.queries}
                        id={client.uid}
                        key={client.uid}
                        index={index}

                        // changeScore={changeScore}
                        // removePlayer={removePlayer}
                    />
                )}
        </div>
    }
}


export default function Clients({currentUser}) {

    return (
    <>
            <div className="tab-title-submenu d-flex justify-content-between align-items-center mx-5">
                <h1 className='mt-0'>Clients</h1>
                <ul className="submenu">
                    <li className="submenu-item">
                    <Link to="AddClientForm"><span className="me-1">Add client</span> <FontAwesomeIcon icon={faUserPlus} /></Link>
                    </li>
                </ul>
            </div>
            <div className="clients container h-100">

                <div className="card-container-full container card-container container-full p-4 row">
                    <ClientList currentClients={currentUser.clients}/>
                </div>
            </div>
        </>
    )
}
