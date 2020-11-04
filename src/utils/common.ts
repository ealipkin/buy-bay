export const divideNumberWithSpaces = (number: number): string => String(number).replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

export const debounce = (fn, time) => {
  let timeout;

  return function () {
    // @ts-ignore
    const functionCall = () => fn.apply(this, ...rest);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
