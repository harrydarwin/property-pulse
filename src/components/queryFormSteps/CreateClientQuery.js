import React, { useState, useEffect } from 'react'
import QueryType from './QueryType';
import QueryLocation from './QueryLocation';
import Confirmation from './Confirmation';
import Success from './Success';



const CreateClientQuery = () => {

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
      <QueryType nextStep={nextStep} setType={setQueryType} values={values} />
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
      <Confirmation nextStep={nextStep} prevStep={prevStep} values={values} />
    )
  case 4:
    return (
      <Success />
    )
  // never forget the default case, otherwise VS code would be mad!
  default:
     // do nothing
}
}

export default CreateClientQuery;