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
              SortSelect(:options="options").favourites__select

            div(:class="{'hidden': selectedTab !== 'items'}")
              div(v-if="favouritesItems && favouritesItems.length")
                .category__list
                  .category__item(v-for="(item, index) in favouritesItems" :key="index")
                    CatalogCardItem(
                      :item="item"
                      @toggle-fav="toggleFav"
                      @favRemove="removeProduct"
                    ).catalog-card--fav
                div(v-if="productPagination.total > productPagination.perPage").category__pagination
                  Pagination(:paginationInfo="productPagination" @page="productPageChange")
              div(v-else).empty-message В избранном пока нет товаров

            div(:class="{'hidden': selectedTab !== 'shops'}")
              div(v-if="favouritesShops && favouritesShops.length")
                .category__list
                  .category__item.category__item--shop(v-for="(shop, index) in favouritesShops" :key="index")
                    ShopCard(
                      :shop="shop"
                      @toggle-fav="toggleFav"
                      @remove-from-fav="removeShop"
                    )
                div(v-if="shopPagination.total > shopPagination.perPage").category__pagination
                  Pagination(:paginationInfo="shopPagination" kindText="магазинов" @page="shopPageChange")
              div(v-else).empty-message В избранном пока нет товаров
          Loader(v-else)
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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
import { SORT_PARAMS } from '@/models/enums';
import { Product, ProductShop } from '@/models/product';
import { FavBrandsResponse, FavProductsResponse, PaginationInfo } from '@/models/responses';
import $store from '@/store';

const PAGE_TITLE = 'Избранное';

const PAGE_TABS = [
  {
    id: 'items',
    label: 'Избранные товары',
    isActive: true,
  },
  {
    id: 'shops',
    label: 'Избранные бренды',
  },
];

const SORT_OPTIONS = [
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

const DEFAULT_SORT = SORT_PARAMS.POPULAR;

@Component({
  components: {
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

  profileMenuItems = PROFILE_MENU_ITEMS;

  loaded = false;

  selectedTab = 'items';

  page = DEFAULT_PAGINATE_PAGE;

  sort: SORT_PARAMS = DEFAULT_SORT;

  tabs = PAGE_TABS;

  options = SORT_OPTIONS;

  favouritesItems: Product[] | null = null;

  favouritesShops: ProductShop[] | null = null;

  productPagination: PaginationInfo | undefined;

  shopPagination: PaginationInfo | undefined;

  selectTab(tabId) {
    this.selectedTab = tabId;
  }

  async productPageChange(page) {
    this.loaded = true;
    this.page = page;
    this.loadProducts().then(() => {
      this.loaded = false;
    });
  }

  async shopPageChange(page) {
    this.loaded = true;
    this.page = page;
    this.loadBrands().then(() => {
      this.loaded = false;
    });
  }

  created() {
    this.setProfilePage(PAGE_TITLE);
  }

  async mounted() {
    this.loaded = true;
    Promise
      .all([this.loadProducts(), this.loadBrands()])
      .then(() => {
        this.loaded = false;
      });
  }

  async loadProducts() {
    await createRequest('GET', endpoints.favourites.products({
      page: this.page,
      sort: this.sort,
    })).then(this.updateFavouritesProducts);
  }

  async loadBrands() {
    await createRequest('GET', endpoints.favourites.brands({
      page: this.page,
      sort: this.sort,
    })).then(this.updateFavouritesBrands);
  }

  updateFavouritesProducts(res: FavProductsResponse) {
    const { data } = res.data;
    this.favouritesItems = data.data;
    this.productPagination = data.paginationInfo;
  }

  updateFavouritesBrands(res: FavBrandsResponse) {
    const { data } = res.data;
    this.favouritesShops = data.data;
    this.shopPagination = data.paginationInfo;
  }

  toggleFav() {
    // this.loaded = true;
  }

  async removeProduct() {
    await this.loadProducts();
    $store.dispatch('app/updateFavouritesCount');
  }

  async removeShop() {
    await this.loadBrands();
    $store.dispatch('app/updateFavouritesCount');
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
