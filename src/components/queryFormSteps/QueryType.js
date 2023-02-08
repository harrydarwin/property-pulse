// 1. search by house address, building address, street name OR both within the radius from an address

import React from 'react';
import $ from 'jquery';

const QueryType = ({ nextStep, values, setType, setAddress, setStreetName, setRadius }) => {

    const regBtn = 'btn btn-standard';
    const ActiveBtn = regBtn + ' selected-input';

    const resetUnusedValues = value => {
        if(value == 'streetSearch') {setAddress(''); setRadius('');
        } else if(value == 'addressSearch') {setStreetName(''); setRadius('');
        } else if(value == 'radiusSearch') {setStreetName('');}
    }

    const selectInput = (e) => {
        const value = e.target.value;

        // RESET VALUES THAT ARENT BEING USED
        resetUnusedValues(value);
        // set search type andm  move forward
        setType(value);
        $('.form-fail-message').text('');
        $('form').removeClass('form-check-failed');

    }

    const Continue = e => {
        e.preventDefault();
        if(values.queryType == ""){
            $('form').addClass('form-check-failed');
            $('.form-fail-message').text('Please choose one of the following search types to proceed.');

        } else {
            nextStep();
        }
      }

  return (
    <div className='py-5'>
        <div>What type of search would you like to create?</div>
        <form>
            <p className="form-fail-message my-3"></p>
            <div className='d-flex justify-content-between' onChange={selectInput}>
                <input className="d-none" id='addressSearch' type="radio" value="addressSearch" name="queryType" />
                <label className={values.queryType == 'addressSearch' ? ActiveBtn : regBtn} htmlFor="addressSearch">Address</label>

                {/* <input className="d-none" id='building' type="radio" value="building" name="queryType" />
                <label className={values.queryType == 'building' ? ActiveBtn : regBtn} htmlFor="building">Building search</label> */}

                <input className="d-none" id='streetSearch' type="radio" value="streetSearch" name="queryType" />
                <label className={values.queryType == 'streetSearch' ? ActiveBtn : regBtn} htmlFor="streetSearch">Street search</label>

                <input className="d-none" id='radiusSearch' type="radio" value="radiusSearch" name="queryType" />
                <label className={values.queryType == 'radiusSearch' ? ActiveBtn : regBtn} htmlFor="radiusSearch">Area search</label>
            </div>
            <button className='btn btn-standard w-100 mt-5' onClick={ Continue }>Next</button>
        </form>
    </div>
  )
}

export default QueryType