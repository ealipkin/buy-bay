import { extend } from 'vee-validate';
import { required, email, alpha } from 'vee-validate/dist/rules';

export const addBasicValidations = () => {
  // No message specified.
  extend('email', email);

  extend('alpha', alpha);

  // Override the default message.
  extend('required', {
    ...required,
    message: 'This field is required'
  });
};
