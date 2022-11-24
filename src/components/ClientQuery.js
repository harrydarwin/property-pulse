import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import ClientDeleteButton from './ClientDeleteButton';



function ClientQuery({ data, id, clientID, dataID, clientList }) {
    // console.log(clientList, data)
    const [tooltip, showTooltip] = useState(true);
    const [clients, setClients] = useState(clientList);
    const [parameters, setParameters] = useState(data.queryType == 'street' ? data.streetName : '');
    // format query for display



    return (
        <div id={id} className='query'>
            <div className="client-info">{data.queryType}</div>
            <div className="client-info">{parameters}</div>
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