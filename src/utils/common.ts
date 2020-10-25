export const divideNumberWithSpaces = (number: number): string => String(number).replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
