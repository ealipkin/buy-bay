<template lang="pug">
  .favourites.profile-page
    .page.page--aside-tablet.category
      .category__inner.container
        .page__layout
          .page__aside.favourites__aside
            h1.page__title Избранное
            ProfileNav(:items="profileMenuItems")

          div(v-if="!loaded").page__content.category__items
            .category__header
              TabsNav(:tabs="tabs", @change="selectTab").tabs-nav--inner.favourites__tabs
              SortSelect(v-show="selectedTab === CATEGORIES.ITEMS" :options="productOptions" @change="productSortChange").favourites__select
              SortSelect(v-show="selectedTab === CATEGORIES.BRAND" :options="brandsOptions" @change="brandsSortChange").favourites__select

            div(:class="{'hidden': selectedTab !== CATEGORIES.ITEMS}")
              div(v-if="favouritesItems && favouritesItems.length")
                .category__list
                  .category__item(v-for="(item, index) in favouritesItems" :key="index")
                    CatalogCardItem(
                      :item="item"
                      @toggle-fav="toggleFav"
                      @favRemove="removeProduct(index)"
                    ).catalog-card--fav
                div(v-if="showProductsPagination").category__pagination
                  Pagination(:paginationInfo="productPagination" @page="productPageChange" @more="showMoreProducts")
              div(v-else).empty-message В избранном пока нет товаров

            div(:class="{'hidden': selectedTab !== CATEGORIES.BRAND}")
              div(v-if="favouritesShops && favouritesShops.length")
                .category__list
                  .category__item.category__item--shop(v-for="(shop, index) in favouritesShops" :key="index")
                    ShopCard(
                      :shop="shop"
                      @toggle-fav="toggleFav"
                      @favRemove="removeShop(id, index)"
                    )
                div(v-if="showBrandsPagination").category__pagination
                  Pagination(:paginationInfo="shopPagination" :kindText="getShopKindText(shopPagination.perPage)" @page="shopPageChange" @more="showMoreBrands")
              div(v-else).empty-message В избранном пока нет брендов
          Loader(v-else)
        SeoBlock(v-if="seo" :block="seo")
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import ProfileNav from '@/components/ProfileNav.vue';
import TabsNav from '@/components/TabsNav.vue';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import Select from '@/components/Select.vue';
import Pagination from '@/components/Pagination.vue';
import { PROFILE_MENU_ITEMS } from '@/utils/constants';
import SortSelect from '@/components/SortSelect.vue';
import ShopCard from '@/components/ShopCard.vue';
import { Action } from 'vuex-class';
import { createRequest } from '@/services/http.service';
import { DEFAULT_PAGINATE_PAGE, endpoints } from '@/config';
import Loader from '@/components/Loader.vue';
import { SERVER_ERRORS, SORT_PARAMS } from '@/models/enums';
import { FavBrandsResponse, FavProductsResponse, PaginationInfo } from '@/models/responses';
import $store from '@/store';
import { Product, ProductShop } from '@/models/order';
import { addParamsToLocation, paramsStringToObject } from '@/utils/filters';
import { declOfNum } from '@/utils/common';
import SeoBlock from '@/components/SeoBlock.vue';
import { ISeoBlock } from '@/models/models';

const PAGE_TITLE = 'Избранное';

enum CATEGORIES {
  ITEMS = 'items',
  BRAND = 'brand'
}

const PAGE_TABS = [
  {
    id: CATEGORIES.ITEMS,
    label: 'Избранные товары',
    isActive: true,
  },
  {
    id: CATEGORIES.BRAND,
    label: 'Избранные бренды',
  },
];

const PRODUCT_SORT_OPTIONS = [
  {
    value: SORT_PARAMS.POPULAR,
    label: 'По популярности',
  },
  {
    value: SORT_PARAMS.PRICE,
    label: 'Сначала дешевле',
  },
  {
    value: SORT_PARAMS.PRICE_DESC,
    label: 'Сначала дороже',
  },
  {
    value: SORT_PARAMS.GROUPS,
    label: 'По количеству групп',
  },
  {
    value: SORT_PARAMS.DATE,
    label: 'Новинки',
  },
  {
    value: SORT_PARAMS.DISCOUNT,
    label: 'По размеру скидки',
  },
];

const BRANDS_SORT_OPTIONS = [
  {
    value: SORT_PARAMS.POPULAR,
    label: 'По популярности',
  },
  {
    value: SORT_PARAMS.RATE,
    label: 'По рейтингу',
  },
  {
    value: SORT_PARAMS.RATE_DESC,
    label: 'По рейтингу по убыванию',
  },
  {
    value: SORT_PARAMS.DATE,
    label: 'Новинки',
  },
  {
    value: SORT_PARAMS.DATE_DESC,
    label: 'По дате по убыванию',
  },
];

const DEFAULT_SORT = SORT_PARAMS.POPULAR;

@Component({
  components: {
    SeoBlock,
    Loader,
    ShopCard,
    SortSelect,
    ProfileNav,
    TabsNav,
    CatalogCardItem,
    Select,
    Pagination,
  },
})
export default class Favourites extends Vue {
  @Action('app/setProfilePage') setProfilePage;

  @Watch('isAuthorized') isAuthorizedChanged(val) {
    if (val) {
      this.$nextTick(() => {
        this.init();
      });
    }
  }

  CATEGORIES = CATEGORIES;

  profileMenuItems = PROFILE_MENU_ITEMS;

  loaded = false;

  selectedTab = CATEGORIES.ITEMS;

  productSort: SORT_PARAMS = DEFAULT_SORT;

  brandSort: SORT_PARAMS = DEFAULT_SORT;

  tabs = PAGE_TABS;

  seo: ISeoBlock | null = null;

  productOptions = PRODUCT_SORT_OPTIONS;

  brandsOptions = BRANDS_SORT_OPTIONS;

  favouritesItems: Product[] = [];

  favouritesShops: ProductShop[] = [];

  productPage: number = DEFAULT_PAGINATE_PAGE;

  productPagination: PaginationInfo | undefined;

  shopPage: number = DEFAULT_PAGINATE_PAGE;

  shopPagination: PaginationInfo | undefined;

  productShowMoreClicked = false;

  brandShowMoreClicked = false;

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  get showProductsPagination() {
    if (!this.productPagination) {
      return false;
    }
    if (this.favouritesItems.length === Number(this.productPagination.total)) {
      return false;
    }
    return Number(this.productPagination.total) > Number(this.productPagination.perPage);
  }

  get showBrandsPagination() {
    this.brandShowMoreClicked = true;
    if (!this.shopPagination) {
      return false;
    }
    if (this.favouritesShops.length === Number(this.shopPagination.total)) {
      return false;
    }
    return Number(this.shopPagination.total) > Number(this.shopPagination.perPage);
  }

  selectTab(tabId) {
    const tabIndex = this.tabs.findIndex((tab) => tab.id === tabId);
    const tab = this.tabs[tabIndex];
    this.tabs.forEach((t) => t.isActive = false);
    tab.isActive = true;
    this.selectedTab = tabId;
    Vue.set(this.tabs, tabIndex, tab);

    addParamsToLocation(this.$route, { tab: tabId });
  }

  async productPageChange(page) {
    this.productShowMoreClicked = false;
    this.loaded = true;
    this.productPage = page;
    this.loadProducts().then(() => {
      this.loaded = false;
    });
  }

  async shopPageChange(page) {
    this.brandShowMoreClicked = false;
    this.loaded = true;
    this.shopPage = page;
    this.loadBrands().then(() => {
      this.loaded = false;
    });
  }

  created() {
    this.setProfilePage(PAGE_TITLE);
  }

  async mounted() {
    const parsedParams: { sort?: SORT_PARAMS; page?: string; tab?: string } = paramsStringToObject(window.location.search);
    if (parsedParams) {
      if (parsedParams.tab) {
        this.selectTab(parsedParams.tab);
      }
      if (parsedParams.sort) {
        if (this.selectedTab === CATEGORIES.ITEMS) {
          this.productSort = parsedParams.sort;
        } else {
          this.brandSort = parsedParams.sort;
        }
      }
      if (parsedParams.page) {
        if (this.selectedTab === CATEGORIES.ITEMS) {
          this.productPage = Number(parsedParams.page);
        } else {
          this.shopPage = Number(parsedParams.page);
        }
      }
    }
    this.loaded = true;
    this.init();
  }

  init() {
    $store.dispatch('app/updateProfileCounts');
    Promise
      .all([this.loadProducts(), this.loadBrands()])
      .then(() => {
        this.loaded = false;
      })
      .catch((err) => {
        if (err.response.data.error === SERVER_ERRORS.UNAUTHORIZED) {
          this.$root.$emit('show-login-modal');
        }
        this.loaded = false;
      });
  }

  async loadProducts() {
    await this.loadProductsRequest().then(this.updateFavouritesProducts);
  }

  async loadProductsRequest(): Promise<FavProductsResponse> {
    return createRequest('GET', endpoints.favourites.products({
      page: this.productPage,
      sort: this.productSort,
    }));
  }

  async loadBrands() {
    await this.loadBrandsRequest().then(this.updateFavouritesBrands);
  }

  async loadBrandsRequest(): Promise<FavBrandsResponse> {
    return createRequest('GET', endpoints.favourites.brands({
      page: this.shopPage,
      sort: this.brandSort,
    }));
  }

  updateFavouritesProducts(res: FavProductsResponse) {
    const { data } = res.data;
    this.favouritesItems = data.data;
    this.productPagination = data.paginationInfo;
    if (!this.seo) {
      this.seo = data.seo_block;
    }
  }

  updateFavouritesBrands(res: FavBrandsResponse) {
    const { data } = res.data;
    this.favouritesShops = data.data;
    this.shopPagination = data.paginationInfo;
  }

  toggleFav() {
    // this.loaded = true;
  }

  async removeProduct(index: number) {
    if (this.productShowMoreClicked) {
      this.updatePagination(this.CATEGORIES.ITEMS, index);
    } else {
      await this.loadProducts();
    }
    $store.dispatch('app/updateFavouritesCount');
  }

  async removeShop(id, index: number) {
    if (this.brandShowMoreClicked && this.productPagination) {
      this.updatePagination(this.CATEGORIES.BRAND, index);
    } else {
      await this.loadBrands();
    }
    $store.dispatch('app/updateFavouritesCount');
  }

  updatePagination(type: CATEGORIES, index: number) {
    const pagination: PaginationInfo | undefined = type === this.CATEGORIES.ITEMS ? this.productPagination : this.shopPagination;
    const items = type === this.CATEGORIES.ITEMS ? this.favouritesItems : this.favouritesShops;
    if (pagination) {
      this.$delete(items, index);
      const total = pagination.total - 1;
      const lastPage = Math.ceil(total / Number(pagination.perPage));
      const currentPage = pagination.currentPage <= lastPage ? pagination.currentPage : lastPage;
      const newPagination = {
        ...pagination,
        total,
        currentPage,
        lastPage,
      };

      if (type === CATEGORIES.ITEMS) {
        this.productPagination = { ...newPagination };
      } else {
        this.shopPagination = { ...newPagination };
      }
    }
  }

  productSortChange(sort: { label: string; value: SORT_PARAMS }) {
    const { value } = sort;
    this.productSort = value;
    this.loadProducts();
  }

  brandsSortChange(sort: { label: string; value: SORT_PARAMS }) {
    const { value } = sort;
    this.brandSort = value;
    this.loadBrands();
  }

  showMoreProducts() {
    this.productShowMoreClicked = true;
    this.productPage += 1;
    this.loadProductsRequest()
      .then((res: FavProductsResponse) => {
        const { data } = res.data;
        this.favouritesItems.push(...data.data);
        if (this.productPagination) {
          this.productPagination = {
            ...this.productPagination,
            currentPage: this.productPage,
          };
        }
      });
  }

  showMoreBrands() {
    this.shopPage += 1;
    this.loadBrandsRequest()
      .then((res: FavBrandsResponse) => {
        const { data } = res.data;
        this.favouritesShops.push(...data.data);
        if (this.shopPagination) {
          this.shopPagination = {
            ...this.shopPagination,
            currentPage: this.shopPage,
          };
        }
      });
  }

  getShopKindText(count) {
    return declOfNum(count, ['магазин', 'магазина', 'магазинов']);
  }

  beforeDestroy() {
    this.setProfilePage(null);
  }
}
</script>

<style lang="scss" scoped>
  .favourites {
    padding-bottom: 10px;
    background-color: #fff;
    padding-top: 16px;

    .shop-card {
      height: 100%;
    }

    @include laptop() {
      padding-top: 0;
      background-color: $grey-3;
      padding-bottom: 155px;
    }

    .category__header {
      @include laptop() {
        margin-bottom: 19px;
      }
    }

    .page__title {
      @include laptop() {
        margin-bottom: 40px;
      }
    }

    &__aside {
      display: none;

      @include tablet() {
        display: block;
      }
    }

    &__select {
      display: none;

      @include tablet() {
        margin-bottom: 14px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        span {
          margin-right: 20px;
          font-size: 14px;
          color: $grey-2;
        }
      }
    }
  }
</style>
