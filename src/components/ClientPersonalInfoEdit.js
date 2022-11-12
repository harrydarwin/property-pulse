import React, { useState, useEffect } from 'react'
import LocationSearchInput from './LocationSearchInput';
import { editClient } from './firebase';
import { useNavigate } from "react-router-dom";


export default function ClientPersonalInfoEdit({ currentUser, clientId, client }) {
    let cl = client;
    // currentUser.clients.forEach(client => client.uid == clientId ? cl = client : null)

    const navigate = useNavigate();
    // const [client, setClient] = useState(cl);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentAddress, setCurrentAddress] = useState({});

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

    // create new client object with inputs that have chanegd values (keeping untouched inputs as their value) and updates firebase clients
    const handleEditClient = () => {
            const clientData = {
                ...cl,
                fname: fName != '' ? fName : cl.fname,
                lname: lName != '' ? lName : cl.lname,
                email: email != '' ? email : cl.email,
                phoneNumber: phoneNumber != '' ? phoneNumber : cl.phoneNumber,
                currentAddress: Object.keys(currentAddress).length ? currentAddress : cl.currentAddress,

            }
            editClient(currentUser.dataID, clientData, currentUser.clients);
            console.log("Updating client: ", clientData);
            // back to client list
            navigate('/dashboard/clients');
        // }
    }

    // useEffect(() => {
    //   setClient(cl);

    //   return () => {
    //     second
    //   }
    // }, [client])

// ADD LIST VIEW OF CLIENT QUERIES + ABILITY TO ADD AND/OR DELETE
    return (
        <div className="card-container-full container card-container container-full p-4 row">
            <legend className='text-center mb-5'>Edit their basic info</legend>
            <div className="col-12 col-md-8 col-lg-6 mx-auto">

                <div className="row justify-content-between mb-2">
                    <input
                        type="text"
                        placeholder={cl.fname}
                        className="login__textBox col-12 col-md-5 mb-0"
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="login__textBox col-12 col-md-5 mb-0"
                        placeholder={cl.lname}
                        value={lName}
                        onChange={(e) => setLName(e.target.value)}
                    />
                </div>
                <div className="row justify-content-between mb-5">
                    <input
                        type="email"
                        className="login__textBox col-12 col-md-5 mb-0"
                        placeholder={cl.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="tel"
                        className="login__textBox col-12 col-md-5 mb-0"
                        placeholder={cl.phoneNumber}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <legend className="text-center mb-3">Have they moved to a new address?</legend>
                <div className="location-search row mb-5">
                    <LocationSearchInput classes={'d-flex px-0'}
                        locationPlaceholder={cl.currentAddress.addrFormatted}
                        setAddress={handleClientAddress}
                    />
                </div>
                <div className="row justify-content-end">
                    <button onClick={handleEditClient} className='btn btn-standard'>
                        Update client
                    </button>
                </div>
            </div>
        </div>

    )
}
