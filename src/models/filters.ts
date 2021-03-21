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
  query?: string;
  value?: string | number;
  color?: string | number;
  colorHex?: string | number;
  href: string;
}

export interface IFilter {
  label: string;
  searchTerm: string | null | undefined;
  isSearch?: boolean;
  expand?: boolean;
  isOpen?: boolean;
  query: string;
  type: FILTER_TYPES;
  items: IFilterItem[];
  filteredItems: IFilterItem[] | null | undefined;
}
