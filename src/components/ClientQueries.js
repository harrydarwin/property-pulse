import { Query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ClientQuery from './ClientQuery';


export default function ClientQueries(client) {
    // check for clients

    if(!client.client.queries || client.client.queries.length < 1){
        console.log(client)
        return <h3>You have no open searches for {client.client.fname} {client.client.lname}. </h3>
    } else {
        const queries = client.client.queries;
        // Map clientList.current clients into a client component
        return <>
        {/* <div className="table-headings p-4 pl-5">
        <div className="client-info">First</div>
        <div className="client-info">Last</div>
        <div className="client-info">Email</div>
        <div className="client-info">Phone</div>
        <div className="client-info">Address</div>
    </div><div className="client-list p-4">
            Players list
            {clients.map((client, index) =>
                    <Query
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
                        clientList={currentUser.clients}
                    />
                )}
        </div> */}
        </>
    }
}
