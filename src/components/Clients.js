import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import {db, userDB} from './firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AddClientForm from './AddClientForm';
import Client from './Client';


function ClientList(currentClients) {
    // check for clients
    console.log(currentClients.currentClients)
    if(!currentClients.currentClients || currentClients.currentClients.length < 1){
        return <h3>You haven't added any clients yet. </h3>
    } else {
        const clients = currentClients.currentClients;
        // Map currentClients.current clients into a client component
        return <><div className="table-headings p-4 pl-5">
        <div className="client-info">First</div>
        <div className="client-info">Last</div>
        <div className="client-info">Email</div>
        <div className="client-info">Phone</div>
        <div className="client-info">Address</div>
    </div><div className="client-list p-4">
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
        </>
    }
}


export default function Clients({currentUser, dataID, watchUserDb}) {
    console.log(currentUser, dataID, watchUserDb)
    const listDefaults = "card-container-full container card-container container-full row";
    const [userData, setUserData] = useState('');
    const [clientList, setClientList] = useState([]);

    // Set up realtime updates for users clients list
    useEffect(() => {
        const userDbRef = collection(db, userDB);
        const unsubscribe = onSnapshot(userDbRef, snapshot => {
          snapshot.docs.forEach((doc) => {
            if(doc.data().uid == currentUser.uid){
              setClientList(doc.data().clients);
            }
          })
        })
        return () => {
          unsubscribe();
        }
    }, [])
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

                <div  className={clientList && clientList.length > 0 ? "p-0 " + listDefaults : "p-4 " + listDefaults }>
                    <ClientList
                        currentClients={clientList}
                        dataID={dataID}
                        watchUserDb={watchUserDb}
                        />
                </div>
            </div>
        </>
    )
}
