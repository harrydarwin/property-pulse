import React from 'react'

export default function ClientPersonalInfo() {
  return (
    <div className="card-container-full container card-container container-full p-4 row">
        <input
        type="text"
        placeholder="First name"
        className="form-group"
      />
      <input
        type="text"
        className="form-group"
        placeholder="Last name"
      />
      <input
        type="email"
        className="form-group"
        placeholder="Email"
      />
       <input
        type="tel"
        className="form-group"
        placeholder="Phone number"
      />
      <button>
        Next
      </button>
    </div>

  )
}
