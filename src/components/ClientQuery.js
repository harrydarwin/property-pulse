import React, {useState} from 'react';


function ClientQuery({ data, id }) {

    const [parameters, setParameters] = useState(data.queryType == 'street' ? data.streetName : '');
    // format query for display

  return (
    <div id={id} className='client'>
        <div className="client-info">{ data.queryType }</div>
        <div className="client-info">{parameters}</div>
    </div>
  )
}

export default ClientQuery