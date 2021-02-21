enum FILTER_TYPES {
  CHECKBOX = 'checkbox',
  ACCORDION = 'accordion',
  RADIO = 'radio',
  COLOR = 'color',
}

export interface IFilterItem {
  id: number | string;
  label: string;
  count?: 342;
  selected?: true;
  value?: '1';
  color?: string | number;
}

export interface IFilter {
  label: string;
  searchTerm: string | null | undefined;
  isSearch?: boolean;
  type: FILTER_TYPES;
  items: IFilterItem[];
  filteredItems: IFilterItem[] | null | undefined;
}
