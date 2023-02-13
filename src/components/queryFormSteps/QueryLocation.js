// 2. house, building or address,
// if house take address, if building take address, if radius take address and radius - eventually show map
import React, { useState } from 'react';
import $ from 'jquery';
import LocationSearchInput from '../LocationSearchInput';
import HomeTypeDropdown from '../homeTypeDropdown/HomeTypeDropdown';

const QueryLocation = ({ nextStep, prevStep, values, setHomeType, setAddress, setUnitNumber, setStreetName, setRadius }) => {
    const regBtn = 'btn btn-standard min-150';
    const ActiveBtn = regBtn + ' selected-input';
    const [sType, setSType] = useState(values.queryType);
    const [street, setStreet] = useState(values.streetName);
    const [selectedRadius, setSelectedRadius] = useState(values.radius);
    const [unit, setUnit] = useState('');


    const selectInput = (e) => {
        const value = e.target.value;
        // set search type andm  move forward
        setHomeType(value);
        $('.form-fail-message').text('');
        $('form').removeClass('form-check-failed');
    }

    const Continue = e => {
        e.preventDefault();
        if (values.queryAddress == "" && street == "" && selectedRadius == "") {
            $('form').addClass('form-check-failed');
            $('.form-fail-message').text('Please choose one of the following search types to proceed.');

        } else {
            setStreetName(street);
            setRadius(selectedRadius);
            setUnitNumber(unit);
            nextStep();
        }
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }


    return (
        <div>
            {sType == 'addressSearch' ?
                <>
                    <div className='mb-2'>Lets find a...</div>
                    <form>
                        <div className='d-flex justify-content-center gap-5 mb-5 mt-2' onChange={selectInput}>
                            <input className="d-none" id='house' type="radio" value="house" name="queryType" />
                            <label className={values.homeType == 'house' ? ActiveBtn : regBtn} htmlFor="house">House</label>

                            <input className="d-none" id='building' type="radio" value="building" name="queryType" />
                            <label className={values.homeType == 'building' ? ActiveBtn : regBtn} htmlFor="building">Building</label>

                        </div>
                        <div className="location-search row mx-0">
                            <LocationSearchInput classes={'d-flex px-0 col-md-10'}
                                locationPlaceholder={"Enter an address"}
                                setAddress={setAddress}
                            />
                            <input
                                onChange={e => setUnit(e.target.value)}
                                value={unit}
                                name='unitNumber'
                                className="login__textBox mb-0 col-md-2"
                                placeholder='(Unit)'
                            />
                        </div>
                    </form>
                </>
                :
                sType == 'radiusSearch' ?
                    <>
                        <div className='mb-2'>Lets get Radial</div>
                        <form>
                            <div className="location-search row mx-0">
                                <LocationSearchInput classes={'d-flex px-0'}
                                    locationPlaceholder={"Enter an address"}
                                    setAddress={setAddress}
                                />
                            </div>
                        </form>
                    </>
                    :
                    sType == 'streetSearch' ?
                        <>
                            <div className='mb-2'>Lets lock this street down!</div>
                            <form>
                                <div className="homeTypeDropDown row mb-4">
                                    <div className="">
                                        <HomeTypeDropdown />
                                    </div>
                                </div>
                                <div className="location-search row mx-0">
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
                            <p>We have had an error filling your request.</p>
            }
            <div className="d-flex">
                <button className='btn btn-standard w-50 mt-5' onClick={Previous}>Prev</button>
                <button className='btn btn-standard w-50 mt-5' onClick={Continue}>Next</button>
            </div>
        </div>
    )
}

export default QueryLocation