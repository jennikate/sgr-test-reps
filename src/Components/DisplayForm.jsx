import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import InputField from './FormFields/InputField';

const determineFieldType = ({ field, handleChange }) => {
  let res;
  switch (field.type) {
    case 'input': res = <InputField field={field} handleChange={handleChange} />;
      break;
  }
  return res;
};

const DisplayForm = ({ autocomplete, fields, handleSubmit }) => {
  const [formData, setFormData] = useState({});

  // set any default values into formData
  const addExistingValues = (fields) => {
    fields.map((field) => {
      if (field.defaultValue) { setFormData({ ...formData, [field.fieldName]: field.defaultValue }); }
    });
  };

  const handleChange = (value) => {
    setFormData({ ...formData, [value.name]: value.value });
  };

  useEffect(() => {
    if (fields) {
      addExistingValues(fields);
    }
  }, [fields, setFormData]);

  return (
    <form autoComplete={autocomplete}>
      {fields && fields.map((field) => {
        return (
          <div key={field.id}>
            {determineFieldType({ field: field, handleChange: handleChange })}
          </div>
        );
      })}
      <Button
        label="Submit"
        styleClass="button-primary"
        type="submit"
        onClick={(e) => handleSubmit(e, { formData })}
      />
    </form>
  );
};

DisplayForm.propTypes = {
  autocomplete: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ),
  handleSubmit: PropTypes.func.isRequired,
};

DisplayForm.DefaultProps = {
  autocomplete: 'on',
};


export default DisplayForm;