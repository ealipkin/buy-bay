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
  filters.forEach((filter: IFilter) => {
    if (filtersKeys.includes(filter.query)) {
      const values = selectedFilters[filter.query];
      filter.items.forEach((item: IFilterItem) => {
        if (values.includes(String(item.id)) || values.includes(String(item.value))) {
          item.selected = true;
        }
      });
    }
  });
  return filters;
};

export const removeFiltersFromQuery = ($route, item: IFilterItem) => {
  const existingParams = paramsStringToObject(window.location.search);
  const query: string = item.query as string;
  const value: number = item.value as number;
  const existedFilter: string = existingParams && existingParams[query];
  const existedFilters: string[] = (existedFilter && existedFilter.split(',')) as string[];
  const existedIndex = existedFilters.findIndex((i) => i === String(value));
  if (existedIndex !== -1) {
    existedFilters.splice((existedIndex as number), 1);
    existingParams[query] = existedFilters.join(',');
    addParamsToLocation($route, existingParams);
  }
};
