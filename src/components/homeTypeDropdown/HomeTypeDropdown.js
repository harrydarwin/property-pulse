import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { homeTypeOptions } from '../data';

const animatedComponents = makeAnimated();
const buttonNormal = 'mb-4 input-normal'
const btnFocused = buttonNormal + ' input-focused';

const HomeTypeDropdown = () => (
  <Select
    options={homeTypeOptions}
    closeMenuOnSelect={false}
    components={animatedComponents}
    isMulti
    classNames={{
    control: (state) =>
      state.isFocused ? 'border-red-600' : 'input-normal',
  }}
  />
)

export default HomeTypeDropdown;