import React, { useState, useEffect } from 'react'
import QueryType from './QueryType';
import QueryLocation from './QueryLocation';
import Confirmation from './Confirmation';
import Success from './Success';



const CreateClientQuery = ({user, clientId, client}) => {

  const [currentClient, setCurrentClient] = useState(client);
  if(!currentClient || currentClient == undefined) {
    client = user.clients.filter(client => client.uid == clientId)[0];

    console.log(client)

  }

    const [step, setStep] = useState(1);
    const [queryType, setQueryType] = useState('');
    const [queryAddress, setQueryAddress] = useState('');
    const [streetName, setStreetName] = useState('');
    const [radius, setRadius] = useState('');

    const values = { queryType, queryAddress, streetName, radius }

     // go back to previous step
    const prevStep = () => {
      setStep(prevStep => prevStep - 1);
    }

    // proceed to the next step
    const nextStep = () => {
      setStep(prevStep => prevStep + 1);
    }

    // handle field change
//    onChange={e => setFirstName(e.target.value)}

switch (step) {
  case 1:
    return (
      <QueryType
        nextStep={nextStep}
        setType={setQueryType}
        values={values}
        setAddress={setQueryAddress}
        setStreetName={setStreetName}
        setRadius={setRadius}
      />
    )
  case 2:
    return (
      <QueryLocation
        nextStep={nextStep}
        prevStep={prevStep}
        setAddress={setQueryAddress}
        setStreetName={setStreetName}
        setRadius={setRadius} values={values} />
    )
  case 3:
    return (
      <Confirmation nextStep={nextStep} prevStep={prevStep} values={values} user={user} clientId={clientId} client={client} />
    )
  case 4:
    console.log(client)
    return (
      <Success values={values} clientUid={clientId} client={client} />
    )
  // never forget the default case, otherwise VS code would be mad!
  default:
     // do nothing
}
}

export default CreateClientQuery;