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

  // create formData structure, with any default values
  const addExistingValues = (fields) => {
    let formFields = {};

    fields.map((field) => {
      formFields = { ...formFields, id: field.fieldGroupId, [field.fieldName]: field.defaultValue };
    });
    setFormData([formFields]);
  };

  const handleChange = (value) => {
    console.log('v', value.id)
    setFormData({ ...formData, id: value.fieldGroupId, [value.name]: value.value });
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
          <div key={field.fieldId}>
            {determineFieldType({ field: field, handleChange: handleChange })}
          </div>
        );
      })}
      <Button
        label="Submit"
        styleClass="button-primary"
        type="submit"
        onClick={(e) => handleSubmit(e, formData)}
      />
    </form>
  );
};

DisplayForm.propTypes = {
  autocomplete: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      fieldGroupId: PropTypes.string.isRequired,
      fieldId: PropTypes.string.isRequired,
      fieldName: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ),
  handleSubmit: PropTypes.func.isRequired,
};

DisplayForm.DefaultProps = {
  autocomplete: 'on',
};


export default DisplayForm;