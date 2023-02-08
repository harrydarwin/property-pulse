import React, { useState } from 'react';
import { editClient } from '../firebase';

const Confirmation = ({ nextStep, prevStep, values, user, clientId, client }) => {
    const [propertySearch, setPropertySearch] = useState(values);
    // console.log(values, user, clientId, client)
    if (client == undefined) {
        client = user.clients.filter(cl => cl.uid === clientId)[0]
        // console.log(client)
    }
    // formats our new search paramters into a new query fort he current client and loads it into their firbaseData
    const handleCreateNewQuery = () => {
        // Format the query
        const asArray = Object.entries(values);
        const filtered = asArray.filter(([key, value]) => value !== "");
        console.log(filtered, client, user, clientId)

        // NEXT I NEED TO EDIT AND/OR REMOVE EXISTING QUERIES
        let query = Object.fromEntries(filtered);
        console.log(query)
        if (query.queryAddress) {
            console.log(query)
            query = {
                queryType: query.queryType,
                formatted_address: query.queryAddress.formatted_address,
                homeType: query.homeType ? query.homeType : '',
                name: query.queryAddress.name,
                vicinity: query.queryAddress.vicinity
            }
        }
        query = {
            ...query,
            created_at: new Date()
        }
        const clientData = {
            ...client,
            queries: [
                ...client.queries,
                query
            ]
        }
        editClient(user.dataID, clientData, user.clients);
        console.log("Updating client: ", clientData);
    }

    const Continue = e => {
        e.preventDefault();
        handleCreateNewQuery();
        nextStep();
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

    const toTitleCase = (str) => {
        return str.replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    }

    const formatAddressLine = (data) => {
        console.log(data)
        const { queryAddress, queryType, homeType, radius } = data;
        const { adr_address : address_html, formatted_address, name, vicinity } = queryAddress;
        const ifHomeType = homeType ? homeType : "N/A";
        const html =
            queryType == "addressSearch" ?
                `Address: ${formatted_address}`
            :
            queryType == 'streetSearch' ?
                `Name: ${name}`
            :
            queryType == 'radiusSearch' ?
            `Properties within a ${radius} around ${formatted_address}`
            :
            'We are experiencing an error while confirming your search, please try again.';
            return html;
    }

    const formatHomeType = (data) => {
        const { homeType } = data;
        return toTitleCase(homeType);
    }

    return (
        <div>
            <p>Search type: {toTitleCase(values.queryType)}</p>
            <p>Home type: {formatHomeType(values)}</p>
            <p>{
                formatAddressLine(values)
            }</p>
            <div className="d-flex">
                <button className='btn btn-standard w-50 mt-5' onClick={Previous}>Prev</button>
                <button className='btn btn-standard w-50 mt-5' onClick={Continue}>Create search</button>
            </div>
        </div>
    )
}

export default Confirmation