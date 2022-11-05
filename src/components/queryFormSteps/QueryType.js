// 1. search by house address, building address, street name OR both within the radius from an address

import React from 'react';
import $ from 'jquery';

const QueryType = ({ nextStep, values, setType }) => {

    const selectInput = (e) => {
        const value = e.target.value;
        $('label').each(function(){
            $(this).attr('for') == e.target.value ? $(this).addClass('selected-input') : $(this).removeClass('selected-input');
            setType(value);
        })

    }

  return (
    <div>
        <div className='d-flex justify-content-between' onChange={selectInput}>
            <input className="d-none" id='house' type="radio" value="house" name="queryType" />
            <label className='btn btn-standard' htmlFor="house">House search</label>

            <input className="d-none" id='building' type="radio" value="building" name="queryType" />
            <label className='btn btn-standard' htmlFor="building">Building search</label>

            <input className="d-none" id='street' type="radio" value="street" name="queryType" />
            <label className='btn btn-standard' htmlFor="street">Street search</label>

            <input className="d-none" id='radius' type="radio" value="radius" name="queryType" />
            <label className='btn btn-standard' htmlFor="radius">Area search</label>
        </div>
    </div>
  )
}

export default QueryType