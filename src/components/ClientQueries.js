import { Query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ClientQuery from './ClientQuery';


export default function ClientQueries(currentUser, clientId, client) {
 console.log(currentUser, client)
    // check for clients
    // const currentClient = currentUser.clients.filter(client => client.uid == clientId)[0];
    const [currentClient, setCurrentClient] = useState(currentUser.client);
    console.log(currentUser.client)
    const [queries, setQueries] = useState(currentUser.client.queries)
    useEffect(()=>{
        const cList = currentUser.currentUser.clients;
        const c = cList.filter(c => c.uid == currentUser.clientId)[0];
        console.log(c, cList, currentUser.clientId)
        setQueries(c.queries)
    }, [currentUser])
    if (!queries || queries.length < 1) {
        console.log(currentClient)
        return <>
            <h3>You have no open searches for {currentClient.fname} {currentClient.lname}. </h3>
        </>
    } else {

        // const queries = client.queries;
// NEED TO MAKE A FETCH QUERIES FUNCTION SO THAT THEY ARE UPDATED LIVE WHEN YOU ADD A NEW ONE
        console.log(queries, clientId, currentUser)

        // Map clientList.current clients into a client component
        return <>
            <div className="card-container-full container card-container container-full p-4 row">
                <legend className='text-center mb-5'>Modify or remove property searches</legend>
                <div className="table-headings p-4 pl-5">
                    <div className="client-info">Search type</div>
                    <div className="client-info">Search parameters</div>
                </div>
                <div className="client-list p-4">
                    {queries.map((query, index) =>
                        <ClientQuery
                            data={query}
                            id={query.queryType + '-' + currentClient.uid + '-' + query.created_at.seconds}
                            clientID={currentUser.clientId}
                            dataID={currentUser.currentUser.dataID}
                            clientList={currentUser.currentUser.clients}
                            key={query.queryType + '-' + currentClient.uid + '-' + query.created_at.seconds}
                            index={index}
                        />
                    )}
                </div>
            </div>
        </>
    }
}
