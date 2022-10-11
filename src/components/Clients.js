import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { db, userDB } from './firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AddClientForm from './AddClientForm';
import ClientList from "./ClientList";
import Client from './Client';


export default function Clients({ currentUser, dataID, clientList, deleteClient }) {
    console.log(dataID, currentUser)
    console.log(deleteClient)
    const listDefaults = "card-container-full container card-container container-full row";
    const [userData, setUserData] = useState('');

    const removeClient = (clientID, storedClients) => {
        const access = dataID;
        console.log(access);
        deleteClient(access, clientID, storedClients);
    }

    // const removeClient = () => {

    // }
    // const [clientList, setClientList] = useState([]);

    // Set up realtime updates for users clients list
    // useEffect(() => {
    //     const userDbRef = collection(db, userDB);
    //     const unsubscribe = onSnapshot(userDbRef, snapshot => {
    //       snapshot.docs.forEach((doc) => {
    //         if(doc.data().uid == currentUser.uid){
    //           setClientList(doc.data().clients);
    //         }
    //       })
    //     })
    //     return () => {
    //       unsubscribe();
    //     }
    // }, [])
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

                <div className={clientList && clientList.length > 0 ? "p-0 " + listDefaults : "p-4 " + listDefaults}>
                    <ClientList
                        clientList={clientList}
                        dataID={dataID}
                        removeClient={removeClient}
                    />
                </div>
            </div>
        </>
    )
}
