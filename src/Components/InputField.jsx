import { useState } from 'react';
import PropTypes from 'prop-types';
import { validateInput } from './utils/Validator';

const InputField = ({ name, id, value, label, type, validators, parentHandleChange }) => {
  const [error, setError] = useState(false);

  const localHandleChange = (e) => {
    setError(validateInput(validators, value)); // run validation on change (to do on submit move this to parent)
    parentHandleChange({ name: e.target.name, value: e.target.value }); // pass value back to the parent component
  };

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={id}
        type={type}
        value={value.name}
        onChange={localHandleChange} // run the local function when input value changes
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  validators: PropTypes.array,
  parentHandleChange: PropTypes.func.isRequired,
};

// add defaults for non required fields so things don't break
InputField.defaultProps = {
  value: '',
  label: '',
  type: 'text',
  validators: [],
};

export default InputField;