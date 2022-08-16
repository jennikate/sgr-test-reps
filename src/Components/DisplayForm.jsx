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
  const [formData, setFormData] = useState();

  const addDefaultDataToFormData = (fields) => {
    const defaultFormData = fields
      .filter(field => field.defaultValue)
      .map(field => {
        return {
          [field.fieldId]: {
            fieldId: field.fieldId,
            fieldGroupId: field.fieldGroupId,
            fieldName: field.fieldName,
            value: field.defaultValue,
          },
        };
      });

    // need to convert the above into an object, it's currently creating an array and we want an object
    let finalObj = {};
    for (let i = 0; i < defaultFormData.length; i++) {
      Object.assign(finalObj, defaultFormData[i]);
    }
    
    setFormData(finalObj);
  };


  const handleChange = (value) => {
    // collates all the fields data, which includes identifiers and values onChange
    // handle submit will validate and transform the data for submission
    // this is because different forms have different needs and we leave it to the
    // page to determine what is to submit
    setFormData({ ...formData, [value.fieldId]: { ...value } });
  };

  useEffect(() => {
    if (fields) {
      addDefaultDataToFormData(fields);
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