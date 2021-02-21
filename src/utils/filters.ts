import { IFilter, IFilterItem } from '@/models/filters';

export const paramsObjToString = (obj) => {
  const entries = Object.entries(obj);

  return entries.reduce(
    (acc, entry) => `${acc}${entry[0]}=${entry[1]}&`, '',
  );
};

export const addParamsToLocation = ($route, paramsString) => {
  /* eslint-disable-next-line */
  history.pushState({}, '', `${$route.path}?${paramsString}`);
};

export const parseQuery = (queryObj) => {
  const obj = {};
  /* eslint-disable-next-line */
  for (const key in queryObj) {
    /* eslint-disable-next-line */
    if (key && queryObj.hasOwnProperty(key)) {
      const value = queryObj[key];
      obj[key] = value.split(',');
    }
  }
  return obj;
};

export const setActiveFilters = (filters: IFilter[], selectedFilters: { [key: string]: string[] }) => {
  const filtersKeys = Object.keys(selectedFilters);
  return filters.forEach((filter: IFilter) => {
    if (filtersKeys.includes(filter.query)) {
      const values = selectedFilters[filter.query];
      filter.items.forEach((item: IFilterItem) => {
        if (values.includes(String(item.id))) {
          item.selected = true;
        }
      });
    }
  });
};
