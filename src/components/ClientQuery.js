import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'


import ClientDeleteButton from './ClientDeleteButton';

function formatAddress(queryData){
    const type = queryData.queryType;
    const formatObj = {
       addressSearch: "formatted_address",
        streetSearch: "formatted_address",
        radiusSearch: "coming soon..."
    }
    return queryData[formatObj[type]];
}


const toTitleCase = (str) => {
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}

const formatHomeType = (hometype) => {
    const houseIcon = <FontAwesomeIcon icon={faHouse} />;
    const buildingIcon = <FontAwesomeIcon icon={faBuilding} />;


    return hometype == '' ? 'N/A' : hometype == 'house' ? houseIcon : hometype = 'building' ? buildingIcon : '';
}


function ClientQuery({ data, id, clientID, dataID, clientList }) {
    // console.log(clientList, data)
    const [tooltip, showTooltip] = useState(true);
    const [clients, setClients] = useState(clientList);
    const [formattedAddress, setformattedAddress] = useState(formatAddress(data));
    const queryType = toTitleCase(data.queryType).replace('Search', '');
    // format query for display
    // formatAddress(data);


    return (
        <div id={id} className='query'>
            <div className="client-info">{queryType}</div>
            <div className="client-info text-center">{formatHomeType(data.homeType)}</div>
            <div className="client-info">
                <p className="m-0">
                    {formattedAddress}
                </p>
                <p className="m-0">
                    {data.unit != '' && data.unit != undefined ? ' Unit: '+data.unit:''}
                </p>
            </div>
            <div className="client-info">{data.vicinity}</div>
            <div className="client-info"></div>
            <div className="client-info"></div>
            <div className="client-info icon" data-tip data-for={'client-delete-' + id} onMouseEnter={() => showTooltip(true)}
                onMouseLeave={() => {
                    showTooltip(false);
                    setTimeout(() => showTooltip(true), 50);
                }} >
                <ClientDeleteButton
                    // clientName, clientID, dataID, clientList, queryID
                    clientName={'this property search'}
                    clientID={clientID}
                    dataID={dataID}
                    clientList={clientList}
                    queryID={id}
                    className="p-3"
                />
            </div>
            {
               tooltip && <ReactTooltip id={'client-delete-' + id} place="top" effect="solid" delayShow={1000}>
                Delete query
            </ReactTooltip>
            }
        </div>
    )
}

export default ClientQuery