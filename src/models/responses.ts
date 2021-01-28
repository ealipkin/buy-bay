import {
  BigSliderItem, ProfileUser, SeoBlock,
} from '@/models/models';
import { BrandItem, Product, ProductShop } from '@/models/product';

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
  data: {
    success: boolean;
    data: {
      status: string;
      data: ProfileUser;
    };
  };
}

export interface FavCountResponse {
  data: number;
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

  seo_block: SeoBlock;
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
