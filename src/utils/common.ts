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
