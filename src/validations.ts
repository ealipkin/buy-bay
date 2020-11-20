import { extend } from 'vee-validate';
import { required, email, alpha, digits, integer } from 'vee-validate/dist/rules';

export const addBasicValidations = () => {
  // No message specified.
  extend('email', email);

  extend('alpha', alpha);

  extend('digits', digits);

  extend('integer', integer);
  // Override the default message.
  extend('required', required);
};
