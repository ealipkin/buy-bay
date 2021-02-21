export const paramsObjToString = (obj) => {
  const entries = Object.entries(obj);

  return entries.reduce(
    (acc, entry) => `${acc}${entry[0]}=${entry[1]}&`, '',
  );
};
