import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClientDeleteButton from './ClientDeleteButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from "react-tooltip";
import "./Client.css";




export default function Client({ client, fname, lname, email, phone, address, openQueries, queries, id, dataID, clientList }) {
    const [tooltip, showTooltip] = useState(true);
    return (
        <div id={'client-' + id} className='client'>
            <div className="client-info">{fname}</div>
            <div className="client-info">{lname}</div>
            <div className="client-info">{email}</div>
            <div className="client-info">{phone}</div>
            <div className="client-info">{address.addrFormatted}</div>

            <div className="client-info icon icon-add" data-tip data-for={'client-search-' + id} onMouseEnter={() => showTooltip(true)}
                onMouseLeave={() => {
                    showTooltip(false);
                    setTimeout(() => showTooltip(true), 50);
                }} >
                <Link className="p-3" to="editclient/propertysearch" state={{ clientUid: id }}><FontAwesomeIcon icon={faMagnifyingGlassPlus} /></Link>
            </div>

            <div className="client-info icon icon-edit" data-tip data-for={'client-edit-' + id} onMouseEnter={() => showTooltip(true)}
                onMouseLeave={() => {
                    showTooltip(false);
                    setTimeout(() => showTooltip(true), 50);
                }} >
                <Link className="p-3" to="EditClient" state={{ clientUid: id, clientQueries: queries, client: client }}><FontAwesomeIcon icon={faPencil} /></Link>
            </div>

            <div className="client-info icon" data-tip data-for={'client-delete-' + id} onMouseEnter={() => showTooltip(true)}
                onMouseLeave={() => {
                    showTooltip(false);
                    setTimeout(() => showTooltip(true), 50);
                }} >
                <ClientDeleteButton
                    clientName={fname + ' ' + lname}
                    clientID={id}
                    dataID={window.localStorage.pp47userAccessToken ? window.localStorage.pp47userAccessToken : dataID}
                    clientList={clientList}
                    className="p-3"
                />
            </div>

            {/* Client button tooltips */}
            {tooltip && <ReactTooltip id={'client-search-' + id} place="top" effect="solid" delayShow={1000}>
                Start a property search
            </ReactTooltip>}

            {tooltip && <ReactTooltip id={'client-delete-' + id} place="top" effect="solid" delayShow={1000}>
                Delete client
            </ReactTooltip>}

            {tooltip && <ReactTooltip id={'client-edit-' + id} place="top" effect="solid" delayShow={1000}>
                Edit client info
            </ReactTooltip>}
        </div>
    )
}

// USED LOCAL STORAGE HACK TO CARRY DATA ID - NEED TO FIX