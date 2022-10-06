import React from 'react'



export default function Client({fname, lname, email, phone, address, openQueries, queries, id}) {


  return (
    <div className='client'>
        <div className="client-info">{fname}</div>
        <div className="client-info">{lname}</div>
        <div className="client-info">{email}</div>
        <div className="client-info">{phone}</div>
        <div className="client-info">{address.addrFormatted}</div>
        <div className="client-info">{}</div>
        <div className="client-info"></div>
    </div>
  )
}
