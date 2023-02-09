import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ClientSearchParams from './ClientSearchParams';
import { getUserData } from './firebase';
import { setDoc } from 'firebase/firestore';

const getClient = (user, clientUid) => {
    const currentUser = user.clients.filter(client => client.uid == clientUid)[0];
    return currentUser;
}


export default function PropertySearch({currentUser}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { clientUid } = location.state;
    const [clientId, setClientId] = useState(clientUid);
    const [userData, setUserData] = useState(currentUser);
    const [curClient, setCurClient] = useState(currentUser.clients);

    useEffect(() => {
        const userDataGrab = getUserData();
            userDataGrab.then(data => {

                if(!userData){
                    setUserData(data);
                    setCurClient(data.clients.filter(client => client.uid == clientUid)[0]);
                }
            });
    })






    // const currentClient = currentUser.clients.filter(client => client.uid == clientUid)[0];
    // console.log(location.state)
    return (
        <>
            <div className="tab-title-submenu">
                <div className="mx-5">
                    <h1 className='mt-0'>Create a search</h1>
                </div>
            </div>
            {
                userData ?
                <ClientSearchParams currentUser={userData} clientId={clientId} client={curClient} />
                :
                "Loading tho..."
            }
        </>
    )
}

{/* CREATE A FUCKING LOADING STATE FOR THE LOVE OF GOD   */}