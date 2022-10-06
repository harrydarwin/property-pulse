import React from 'react';
import LocationSearchInput from './LocationSearchInput';

export default function ClientAddressInfo() {


    return (
        <div className="card-container-full container card-container container-full p-4 row">
            <LocationSearchInput />
            <button>
                Next
            </button>
        </div>
    )
}
