import React, { useState } from 'react'
import LocationSearchInput from './LocationSearchInput';
import { useNavigate } from "react-router-dom";


export default function ClientPersonalInfo({ currentUser, addNewClient }) {

    const navigate = useNavigate();
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentAddress, setCurrentAddress] = useState({});
    const [newID, setNewID] = useState('');
    const [uniqueIDs, setUniqueIDs] = useState(currentUser.clients);

    // grabs new address on change of the autocomplete input > formats and stores to state
    const handleClientAddress = (place) => {
        let addressParts = {};
        let updatedValue = {};
        place.address_components.forEach(c => {
            const types = c.types[0];
            addressParts = {
                ...addressParts,
                [types]: c.long_name

            }
        })
        updatedValue = {
            ...updatedValue,
            addressParts,
            city: place.vicinity,
            types: place.types,
            name: place.name,
            addrFormatted: place.formatted_address
        }
        setCurrentAddress(updatedValue);
    }

    const updateUniqueIDs = (newID) => {
        setUniqueIDs(uniqueIDs => [...uniqueIDs, newID])
    }

    const makeUniqueId = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const handleSubmitNewClient = () => {
        let newID = makeUniqueId(10);
        if(uniqueIDs.includes(newID)){
            handleSubmitNewClient();
        } else {
            // grab necessary info from state/inputs and update firebase clients list for user
            // reflect firebase update back to fron end
            const clientData = {
                fname: fName,
                lname: lName,
                email,
                phoneNumber,
                timeStamp: new Date(),
                openQueries: false,
                currentAddress: currentAddress,
                queries: [],
                uid: newID

            }
            addNewClient(currentUser.dataID, clientData);
            // back to client list
            navigate('/dashboard/clients');
        }
    }



    return (
        <div className="card-container-full container card-container container-full p-4 row">
            <legend className='text-center mb-5'>Let's start with some basic info</legend>
            <div className="col-12 col-md-8 col-lg-6 mx-auto">

                <div className="row justify-content-between mb-2">
                    <input
                        type="text"
                        placeholder="First name"
                        className="login__textBox col-12 col-md-5 mb-0"
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="login__textBox col-12 col-md-5 mb-0"
                        placeholder="Last name"
                        value={lName}
                        onChange={(e) => setLName(e.target.value)}
                    />
                </div>
                <div className="row justify-content-between mb-5">
                    <input
                        type="email"
                        className="login__textBox col-12 col-md-5 mb-0"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="tel"
                        className="login__textBox col-12 col-md-5 mb-0"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <legend className="text-center mb-3">where do they live now?</legend>
                <div className="location-search row mb-5">
                    <LocationSearchInput classes={'d-flex px-0'}
                        locationPlaceholder={"Client's current address"}
                        updateClientAddress={handleClientAddress}
                    />
                </div>
                <div className="row justify-content-end">
                    <button onClick={handleSubmitNewClient} className='btn btn-standard'>
                        Next
                    </button>
                </div>
            </div>
        </div>

    )
}
