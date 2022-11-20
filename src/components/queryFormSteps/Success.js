import React from 'react';
import { Link } from 'react-router-dom';


const Success = ({ values, clientUid, client }) => {
  console.log(client)
  return (
    <>
      <div>Success</div>
    <Link className="p-3 btn btn-standard" to="/dashboard/clients/EditClient" state={{ clientUid: clientUid, client: client }}>Continue</Link>
    </>
  )
}

export default Success