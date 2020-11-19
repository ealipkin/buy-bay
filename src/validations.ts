import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

export const addBasicValidations = () => {
  // No message specified.
  extend('email', email);

  // Override the default message.
  extend('required', {
    ...required,
    message: 'This field is required'
  });
};
