import { useState } from 'react';
import PropTypes from 'prop-types';
import { validateInput } from '../../utils/Validator';

const InputField = ({ field, handleChange }) => {
  const [error, setError] = useState(false);


  const localHandleChange = (e) => {
    // setError(validateInput(validators, value)); // run validation on change (to do on submit move this to parent)
    handleChange({ name: e.target.name, value: e.target.value }); // pass value back to the parent component
  };

  return (
    <div>
      {field.label && <label htmlFor={field.fieldName}>{field.label}</label>}
      <input
        defaultValue={field.defaultValue}
        id={field.id}
        name={field.fieldName}
        type={field.type}
        value={field.value}
        onChange={localHandleChange} // run the local function when input value changes
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};

InputField.propTypes = {
  field: PropTypes.shape({
    defaultValue: PropTypes.string,
    fieldName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    validators: PropTypes.array,
  }),
  handleChange: PropTypes.func.isRequired,
};

export default InputField;