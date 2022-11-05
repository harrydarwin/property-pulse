import React, { useState, useEffect } from 'react'
import LocationSearchInput from './LocationSearchInput';
import CreateClientQuery from './queryFormSteps/CreateClientQuery';
import { editClient } from './firebase';
import { useNavigate } from "react-router-dom";


// Multi-step form
// 1. search by house address, building address OR both within the radius from an address
// 2. house, buidling or address,
// 3. *** if radius search - BRING UP MAP)
// 4. notification options - notify me (agent)? Notify me if client is selling? Frequency of notification to client?


export default function ClientSearchParams({ currentUser, clientId }) {


    let cl;
    currentUser.clients.forEach(client => client.uid == clientId ? cl = client : null)
    const navigate = useNavigate();


    return (
        <div className="card-container-full container card-container container-full p-4 row">
            <legend className='text-center mb-5'>Create a new Property Pulse</legend>
            <div className="col-12 col-md-8 col-lg-6 mx-auto">

                <CreateClientQuery user={currentUser} clientId={clientId} client={cl} />

            </div>
        </div>

    )
}
