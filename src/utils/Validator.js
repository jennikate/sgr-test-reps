export class Validators {
  static required(value, message) {
      if (!value || !value.toString().trim().length) {
          return { error: true, message };
      }
      return false;
  }
  // see https://github.com/gkhan205/react-reusable-form-component/blob/master/src/library/utilities/Validator.js for email and number validators
}

export const validateInput = (validators, value) => {
  if (validators && validators.length) {
      for (let i = 0; i < validators.length; i++) {
          const error = validators[i].check(value, validators[i].message);
          if (error) {
              return error;
          }
      }
  }
  return false;
};