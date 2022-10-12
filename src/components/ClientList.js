import React, { useEffect, useState } from "react";
import Client from './Client';


export default function ClientList(clientList, dataID) {
    // check for clients
    const [clients, setClients] = useState(clientList);
    useEffect(() => {
        setClients(clientList);
    },[clients]);
    if(!clientList.clientList || clientList.clientList.length < 1){
        return <h3>You haven't added any clients yet. </h3>
    } else {
        const clients = clientList.clientList;
        // Map clientList.current clients into a client component
        return <><div className="table-headings p-4 pl-5">
        <div className="client-info">First</div>
        <div className="client-info">Last</div>
        <div className="client-info">Email</div>
        <div className="client-info">Phone</div>
        <div className="client-info">Address</div>
    </div><div className="client-list p-4">
            {/* Players list */}
            {clients.map((client, index) =>
                    <Client
                        fname={client.fname}
                        lname={client.lname}
                        address={client.currentAddress}
                        email={client.email}
                        phone={client.phoneNumber}
                        openQueries={client.openQueries}
                        queries={client.queries}
                        id={client.uid}
                        key={client.uid}
                        index={index}
                        dataID={dataID}
                        clientList={clientList}

                        // changeScore={changeScore}
                    />
                )}
        </div>
        </>
    }
}
