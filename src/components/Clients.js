import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function Clients() {
  return (
    <>
            <div className="tab-title-submenu d-flex justify-content-between align-items-center mx-5">
                <h1 className='mt-0'>Clients</h1>
                <ul className="submenu">
                    <li className="submenu-item">
                        <a  href=""><span className="me-1">Add client</span> <FontAwesomeIcon icon={faUserPlus} /></a>
                    </li>
                </ul>
            </div>
            <div className="clients container h-100">
                <div className="card-container-full container card-container container-full p-4 row">

                </div>
            </div>
        </>
  )
}
