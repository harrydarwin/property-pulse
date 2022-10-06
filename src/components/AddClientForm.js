import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
export default function AddClientForm() {

    const [fName, setFname] = useState('');
    const [lName, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentAddress, setCurrentAddress] = useState({
        houseNumber: '',
        streeName: '',
        streetType: '',
        state: '',
        city: ''
    });
    // maybe explore address auto-complete and use this for search params?
    const handleClientAddress = (e, attr) => {
        const updatedValue = {[attr]: e.target.value}
        setCurrentAddress(currentAddress => ({
            ...currentAddress,
            ...updatedValue
        }))
    }



    return (
        <>
            <div className="tab-title-submenu d-flex justify-content-between align-items-center mx-5">
                <h1 className='mt-0'>New client</h1>
                <ul className="submenu">
                    <li className="submenu-item">
                        <Link to="/dashboard/clients"><FontAwesomeIcon icon={faArrowRotateLeft} /> <span className="ml-1">Back</span></Link>
                    </li>
                </ul>
            </div>
            <div className="card-container-full container card-container container-full p-4 row">

                <form action="">
                    <input
                        type="text"
                        className="login__textBox"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    // placeholder={currentUser.name}
                    // disabled={!editMode}
                    />
                    <input
                        type="text"
                        className="login__textBox"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    // placeholder={currentUser.name}
                    // disabled={!editMode}
                    />
                    <input
                        type="text"
                        className="login__textBox"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    // placeholder={currentUser.name}
                    // disabled={!editMode}
                    />
                    <input
                        type="text"
                        className="login__textBox"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    // placeholder={currentUser.name}
                    // disabled={!editMode}
                    />

                    {/* radio/checkbox Address or radius around address search AND HOUSE OR CONDO/BUILDING */}

                    {/* address */}
                    <input
                        type="text"
                        className="login__textBox"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    // placeholder={currentUser.name}
                    // disabled={!editMode}
                    />
                    <input
                        type="text"
                        className="login__textBox"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    // placeholder={currentUser.name}
                    // disabled={!editMode}
                    />
                    <input
                        type="text"
                        className="login__textBox"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    // placeholder={currentUser.name}
                    // disabled={!editMode}
                    />
                    <input
                        type="text"
                        className="login__textBox"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    // placeholder={currentUser.name}
                    // disabled={!editMode}
                    />
                    <input
                        type="text"
                        className="login__textBox"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    // placeholder={currentUser.name}
                    // disabled={!editMode}
                    />
                </form>
            </div>
        </>
    )
}
