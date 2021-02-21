enum FILTER_TYPES {
  CHECKBOX = 'checkbox',
  ACCORDION = 'accordion',
  RADIO = 'radio',
  COLOR = 'color',
}

export interface IFilterItem {
  id: number | string;
  label: string;
  count?: number;
  selected?: true;
  value?: string | number;
  color?: string | number;
  href: string;
}

export interface IFilter {
  label: string;
  searchTerm: string | null | undefined;
  isSearch?: boolean;
  expand?: boolean;
  query: string;
  type: FILTER_TYPES;
  items: IFilterItem[];
  filteredItems: IFilterItem[] | null | undefined;
}
