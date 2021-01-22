import { extend } from 'vee-validate';

import {
  required, email, alpha, digits, integer,
} from 'vee-validate/dist/rules';

const PHONE_REGEXP = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ -]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/;
export const PHONE_CODE_LENGTH = 4;

export const addBasicValidations = () => {
  // No message specified.
  extend('email', email);

  extend('alpha', alpha);

  extend('phone', (value) => PHONE_REGEXP.test(value));

  extend('phoneCode', (value) => value.length && value.length === PHONE_CODE_LENGTH);

  extend('digits', digits);

  extend('integer', integer);
  // Override the default message.
  extend('required', required);
};

export const INPUT_MASKS = {
  phone: '+7 ### ###-##-##',
  smsCode: '####'
};


export const INPUT_PLACEHOLDERS = {
  phone: '+7 ___ ___-__-__',
  smsCode: '____'
};


