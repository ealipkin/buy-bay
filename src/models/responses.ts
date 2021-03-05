import {
  BigSliderItem,
  BreadcrumbLink,
  CardItem, ICategoryItem,
  ISearchSuggest, ISeoBlock,
  ProfileCounts,
  ProfileUser,
  UserAddressItem,
} from '@/models/models';
import {
  BrandItem, Order, OrderData, Product, ProductShop,
} from '@/models/order';
import { PAY_STATUSES } from '@/models/enums';
import { IFilter, IFilterItem } from '@/models/filters';

export interface PaginationInfo {
  count: number;
  currentPage: number;
  firstItem: number;
  hasMorePages: boolean;
  hasPages: boolean;
  lastPage: number;
  nextPageUrl: null;
  onFirstPage: boolean;
  perPage: string;
  previousPageUrl: null;
  total: number;
}

export interface UserResponse {
  success: boolean;
  data: {
    status: string;
    data: ProfileUser;
  };
}

export interface FavCountResponse {
  data: number;
}

export interface ProfileCountsResponse {
  data: {
    data: ProfileCounts;
  };
}

export interface FavProductsResponse {
  data: {
    data: {
      data: Product[];
      paginationInfo: PaginationInfo;
    };
    success: boolean;
  };
}

export interface FavBrandsResponse {
  data: {
    data: {
      data: ProductShop[];
      paginationInfo: PaginationInfo;
    };
    success: boolean;
  };
}

export interface IndexPage {
  b1: BigSliderItem[];
  b2: BigSliderItem[];
  top_brand: BrandItem[];

  popular: Product[];
  bestseller: Product[];
  hot_groups: Product[];
  highlights: [];
  top_cat: [];

  seo_block: ISeoBlock;
}

export interface IndexPageResponse {
  data: {
    data: IndexPage;
  };
}

export interface ProfileResponse {
  data: {
    success: boolean;
    data: ProfileUser;
  };
}

export interface GetCodeResponse {
  data: {
    data: {
      resp: string;
      code: number;
      token: string;
    };
    message: string;
    success: boolean;
  };
}

export interface OrderResponse {
  data: {
    data: {
      oid: string;
    };
    message: string;
    success: boolean;
  };
}

export interface OrderPaymentResponse {
  data: {
    data: OrderData;
    message: string;
    success: boolean;
  };
}

export interface ProfileAddressResponse {
  data: {
    data: UserAddressItem[];
    message: string;
    success: boolean;
  };
}

export interface OrderCardsResponse {
  data: {
    data: CardItem[];
    message: string;
    success: boolean;
  };
}

export interface OrderPayResponse {
  data: {
    data: {
      confirmation_url: string;
      status: PAY_STATUSES;
    };
    message: string;
    success: boolean;
  };
}

export interface OrdersResponse {
  data: {
    data: {
      data: OrderData[];
      paginationInfo: PaginationInfo;
    };
    message: string;
    success: boolean;
  };
}

export interface OrderAddAddressResponse {
  data: {
    data: Order;
    message: string;
    success: boolean;
  };
}

export interface CatalogPage {
  link: string;
  title: string;
  breadcrumbs: BreadcrumbLink[];
  products: {
    data: Product[]; paginationInfo: PaginationInfo;
  };
  recommended: Product[];
  seo_block: ISeoBlock;
  filters: IFilter[];
  // filters block
  brands: IFilterItem[];
  delivery: IFilterItem[];
  sale: IFilterItem[];
  options: any[];
  categoryList?: ICategoryItem[];
  topBrand: any[];
  name?: string;
  image?: string;
  rate?: number | string;
  orders?: number;
  isFavourite: boolean;
  description?: string; // needed
  category?: string; // needed
}

export interface CatalogResponse {
  data: {
    data: CatalogPage;
  };
}

export interface SearchSuggestResponse {
  data: {
    data: ISearchSuggest;
  };
}
