import { IFilter, IFilterItem } from '@/models/filters';

export const paramsObjToString = (obj) => {
  const entries = Object.entries(obj);
  return entries.reduce(
    (acc, entry, index) => `${acc}${entry[0]}=${entry[1]}${index === entries.length - 1 ? '' : '&'}`, '',
  );
};

export const paramsStringToObject = (string) => Object.fromEntries(new URLSearchParams(string));

export const addParamsToLocation = ($route, paramsObj: { [key: string]: any }) => {
  let query = { ...paramsObj };
  const existingSearch = window.location.search;
  if (existingSearch && existingSearch.length) {
    const existedQuery = paramsStringToObject(existingSearch);
    query = {
      ...existedQuery,
      ...paramsObj,
    };
  }
  const filterParams = paramsObjToString(query);
  /* eslint-disable-next-line */
  history.pushState({}, '', `${$route.path}?${filterParams}`);
};

export const parseQuery = (queryObj): { [key: string]: string[] } => {
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
