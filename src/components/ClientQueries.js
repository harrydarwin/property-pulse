import { Query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { getUserData } from "./firebase";
import ClientQuery from './ClientQuery';




export default function ClientQueries(currentUser, clientId, client) {
    // currentUser.currentUser && !window.localStorage.getItem('')
 console.log(currentUser, client)
    // check for clients
    // const currentClient = currentUser.clients.filter(client => client.uid == clientId)[0];
    const [currentClient, setCurrentClient] = useState(currentUser.client);
    const [loggedUser, setLoggedUser] = useState(currentUser.currentUser);
    console.log(currentUser.client)
    const [queries, setQueries] = useState(currentUser.client.queries)

    // function to grab and live update the user and queries
    const updateQueryList = (cUser) => {
        if(!cUser.currentUser){
            const userDataGrab = getUserData();
            userDataGrab.then(data => {
                console.log(data)
                const cList = data.clients;
                const c = cList.filter(c => c.uid == cUser.clientId)[0];
                setQueries(c.queries)
            })
        } else {
            const cList = cUser.currentUser.clients;
            const c = cList.filter(c => c.uid == cUser.clientId)[0];
            setQueries(c.queries)
        }
    }

    useEffect(()=>{
        updateQueryList(currentUser);
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
                <legend className='text-center mb-5'>Remove unwanted property searches</legend>
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
