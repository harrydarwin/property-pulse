// 2. house, building or address,
// if house take address, if building take address, if radius take address and radius - eventually show map
import React, { useState } from 'react';
import $ from 'jquery';
import LocationSearchInput from '../LocationSearchInput';

const QueryLocation = ({ nextStep, prevStep, values, setAddress, setStreetName, setRadius }) => {

    const [sType, setSType] = useState(values.queryType);
    const [street, setStreet] = useState(values.streetName);
    const [selectedRadius, setSelectedRadius] = useState(values.radius);

    // const selectInput = (e) => {
    //     const value = e.target.value;
    //     $('label').each(function(){
    //         $(this).attr('for') == e.target.value ? $(this).addClass('selected-input') : $(this).removeClass('selected-input');
    //         setType(value);
    //         $('.form-fail-message').text('');
    //         $('form').removeClass('form-check-failed');
    //     })

    // }

    const Continue = e => {
        e.preventDefault();
        if(values.queryAddress == "" && street == "" && selectedRadius == ""){
            $('form').addClass('form-check-failed');
            $('.form-fail-message').text('Please choose one of the following search types to proceed.');

        } else {
            setStreetName(street);
            setRadius(selectedRadius);
            nextStep();
        }
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

    const handleChange = e => {

    }

    return (
        <div>
            { sType == 'house' ?
            <>
                <div className='mb-2'>Lets find a house!</div>
                <form>
                    <div className="location-search row">
                        <LocationSearchInput classes={'d-flex px-0'}
                            locationPlaceholder={"Enter a house address"}
                            setAddress={setAddress}
                        />
                    </div>
                </form>
            </>
            :
            sType == 'building' ?
                <>
                    <div className='mb-2'>Lets find a unit!</div>
                    <form>
                        <div className="location-search row">
                            <LocationSearchInput classes={'d-flex px-0'}
                                locationPlaceholder={"Enter a building address or name"}
                                setAddress={setAddress}
                            />
                        </div>
                    </form>
                </>
            :
            sType == 'street' ?
            <>
                <div className='mb-2'>Lets lock this street down!</div>
                <form>
                    <div className="location-search row">
                        <LocationSearchInput classes={'d-flex px-0'}
                            locationPlaceholder={"Enter a street name"}
                            setAddress={setAddress}
                        />
                    </div>
                    {/* <input
                            type="text"
                            className="login__textBox col-12 mb-0"
                            placeholder="Enter a street name"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        /> */}
                </form>
            </>
            :
            sType == 'radius' ?
                <div>In what area would they like to live?</div>
            :
                <p>We have had an error filling your request.</p>
            }
            <div className="d-flex">
            <button className='btn btn-standard w-50 mt-5' onClick={ Previous }>Prev</button>
            <button className='btn btn-standard w-50 mt-5' onClick={ Continue }>Next</button>
            </div>
        </div>
    )
}

export default QueryLocation