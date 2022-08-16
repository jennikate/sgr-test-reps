import PropTypes from 'prop-types';

const InputField = ({ error, field, handleChange }) => {

  const localHandleChange = (e) => {
    handleChange({ id: e.target.dataset.groupid, name: e.target.name, value: e.target.value }); // pass value back to the parent component
  };

  return (
    <div>
      {field.label && <label htmlFor={field.fieldName}>{field.label}</label>}
      {error && <p>{error.message}</p>}
      <input
        data-groupid={field.fieldGroupId}
        defaultValue={field.defaultValue}
        id={field.fieldId}
        name={field.fieldName}
        type={field.type}
        value={field.value}
        onChange={localHandleChange} // run the local function when input value changes
      />
    </div>
  );
};

InputField.propTypes = {
  error: PropTypes.string,
  field: PropTypes.shape({
    defaultValue: PropTypes.string,
    fieldId: PropTypes.string.isRequired,
    fieldGroupId: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    validators: PropTypes.array,
  }),
  handleChange: PropTypes.func.isRequired,
};

export default InputField;