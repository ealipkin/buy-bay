export const divideNumberWithSpaces = (number: number): string => String(number).replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
    };
    const callNow = !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

export const getIfExist = (field: any) => field || '';

export const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

export const getPrice = (price: number | string) => `${divideNumberWithSpaces(Number(price))} ₽`;
