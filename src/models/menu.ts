export interface BrandMenuItem {
  title: string;
  imageUrl: string;
  href: string;
}

export interface ChildMenuItem {
  title: string;
  href: string;
}

export interface MenuChildItem {
  main: ChildMenuItem;
  links: ChildMenuItem[];
}

export interface BaseMenuItem {
  title: string;
  href?: string;
  icon?: string;
  action?: string;
  is_active?: boolean;
  count?: string;
  type?: string;
  hideUnAuth?: boolean;
}

export interface MenuItem extends BaseMenuItem {
  is_general_menu?: boolean;
  brands?: BrandMenuItem[];
  children?: MenuChildItem[];
}
