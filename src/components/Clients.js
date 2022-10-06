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
        // Map currentClients.current clients into a client component
        return <p>Hello!</p>
    }
}


export default function Clients({currentUser}) {

    // let cardToShow = <ClientList currentClients={currentUser.clients}/>;
    // const [showAddForm, setShowAddForm] = useState(false);

    // const toggleAddClientForm = (e) => {
    //     e.preventDefault();
    //     setShowAddForm(current => !current);
    // }


    // useEffect(() => {
    //     if(showAddForm == true) {
    //         cardToShow = <AddClientForm />
    //     }
    // }, [showAddForm])
    return (
    <>
            <div className="tab-title-submenu d-flex justify-content-between align-items-center mx-5">
                <h1 className='mt-0'>Clients</h1>
                <ul className="submenu">
                    <li className="submenu-item">
                    <Link to="AddClientForm"><span className="me-1">Add client</span> <FontAwesomeIcon icon={faUserPlus} /></Link>
                        {/* <a onClick={toggleAddClientForm} href=""><span className="me-1">Add client</span> <FontAwesomeIcon icon={faUserPlus} /></a> */}
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
