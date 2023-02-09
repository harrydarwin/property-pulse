import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { homeTypeOptions } from '../data';

const animatedComponents = makeAnimated();

const HomeTypeDropdown = () => (
  <Select
    options={homeTypeOptions}
    closeMenuOnSelect={false}
    components={animatedComponents}
    placeholder="Select all property types to inlcude..."
    isMulti
    classNames={{
    control: (state) =>
      state.isFocused ? 'input-focused' : 'input-normal',
  }}
  />
)

export default HomeTypeDropdown;