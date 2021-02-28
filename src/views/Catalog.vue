<template lang="pug">
  .category.page.catalog(v-if="pageLoaded")
    template
      .container.page__breadcrumbs
        Breadcrumbs(:links="breadCrumbs")
      .catalog__wrapper
        .page__header.container
          .page__title {{pageTitle}}
          .category__sort
            SortSelect(:options="selectOptions" @change="sortChange" :selectedOption="sort")
        .container.category__inner
          .page__layout
            .page__aside
              .filters-wrapper
                CategoryFilter(:filters="filters" @change="selectFilter" @categoryChange="categoryChange").category__filters
            .page__content
              div(v-if="hasResults").category__items
                .category__list
                  .category__item(v-for="(item, index) in products" :key="index")
                    CatalogCardItem(:item="item")
                .category__pagination
                  Pagination(:paginationInfo="pagination" kindText="товаров" @page="pageChange" @more="showMore")
              div(v-else)
                .search-empty
                  .search-empty__icon
                    include ../assets/icons/search-big.svg
                  .search-empty__title Ничего не удалось найти
                  .search-empty__text Попробуте изменить запрос
              Loader(v-if="productsPending")
      Advantages(:advantagesList="advantagesList").category__advantages

      div(v-if="recommended").section.category__similar-slider
        .section__container
          .section-header
            .section-title Пользователи рекомендуют
          SimilarSlider(:items="recommended")

      section(v-if='brands && brands.length').section.section--brands
        .section__container
          .section-header
            .section-title Лучшие бренды
            router-link(to="#").section-link Показать еще
          Brands(:brands="brands")

      section.section.section--seo
        SeoTexts(:block="seoBlock").container
  Loader(v-else)
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import CatalogCardItem from '@/components/CatalogCardItem.vue';
import Brands from '@/components/Brands.vue';
import CatalogSlider from '@/components/CatalogSlider.vue';
import SeoTexts from '@/components/SeoTexts.vue';
import TopCategories from '@/components/TopCategories.vue';
import Advantages from '@/components/Advantages.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SortSelect from '@/components/SortSelect.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { ADVANTAGES } from '@/utils/constants';
import Pagination from '@/components/Pagination.vue';
import SimilarSlider from '@/components/SimilarSlider.vue';
import { BreadcrumbLink, SeoBlock } from '@/models/models';
import Loader from '@/components/Loader.vue';
import { createRequest } from '@/services/http.service';
import { DEFAULT_PAGINATE_PAGE, endpoints } from '@/config';
import { CatalogPage, CatalogResponse, PaginationInfo } from '@/models/responses';
import { BrandItem, Product } from '@/models/order';
import { IFilter, IFilterItem } from '@/models/filters';
import { SORT_PARAMS } from '@/models/enums';
import {
  addParamsToLocation, paramsObjToString, parseQuery, setActiveFilters,
} from '@/utils/filters';
import router from '@/router';
import { Action } from 'vuex-class';

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
    SimilarSlider,
    Pagination,
    CategoryFilter,
    SortSelect,
    Breadcrumbs,
    Advantages,
    TopCategories,
    SeoTexts,
    CatalogSlider,
    Brands,
    CatalogCardItem,
  },
})
export default class Index extends Vue {
  @Action('app/setSelectedShop') selectShop;

  @Watch('$route') routeChange() {
    console.log('routeChange');
    this.pageLoaded = false;
    this.loadProducts(true);
  }

  filter = {}

  pageLoaded = false;

  productsPending = false;

  sort: SORT_PARAMS = DEFAULT_SORT;

  page: number = DEFAULT_PAGINATE_PAGE;

  isSearch = false;

  isBrand = false;

  selectOptions = SORT_OPTIONS;

  advantagesList = ADVANTAGES;

  catalogPage: CatalogPage | null = null

  get hasResults(): boolean | null {
    return this.catalogPage && this.catalogPage.products && Boolean(this.catalogPage.products.data.length);
  }

  get breadCrumbs(): BreadcrumbLink[] | null {
    return this.catalogPage && this.catalogPage.breadcrumbs;
  }

  get pageTitle(): string | null {
    const search: string = (this.$route.query && this.$route.query.q as string) || '';
    const title: string = (this.catalogPage && this.catalogPage.title) || '';
    return this.isSearch ? `«${search}»` : title;
  }

  get seoBlock(): SeoBlock | null {
    return this.catalogPage && this.catalogPage.seo_block;
  }

  get products(): Product[] | null {
    return this.catalogPage && this.catalogPage.products.data;
  }

  get pagination(): PaginationInfo | null {
    return this.catalogPage && this.catalogPage.products.paginationInfo;
  }

  get brands(): BrandItem[] | null {
    return this.catalogPage && this.catalogPage.topBrand;
  }

  get recommended(): Product[] | null {
    return this.catalogPage && this.catalogPage.recommended;
  }

  get filters(): IFilter[] | null {
    return this.catalogPage && this.catalogPage.filters;
  }

  init() {
    this.isSearch = this.$route.name === 'Search';
    this.isBrand = this.$route.name === 'Brand';
    const selectedFilters = parseQuery(this.$route.query);
    if (selectedFilters) {
      if (selectedFilters.sort) {
        this.sort = String(selectedFilters.sort) as SORT_PARAMS;
      }
      if (selectedFilters.page) {
        this.page = Number(String(selectedFilters.page));
      }
    }
    this.loadProducts(true);
  }

  mounted() {
    this.init();
  }

  setFiltersFromUrl(catalog: CatalogPage) {
    const selectedFilters = parseQuery(this.$route.query);
    setActiveFilters(catalog.filters, selectedFilters);
  }

  loadProducts(isInit?) {
    this.loadProductsRequest()
      .then((res: CatalogResponse) => {
        if (res && res.data) {
          const catalog = res.data.data;
          if (isInit) {
            this.setFiltersFromUrl(catalog);
            this.catalogPage = catalog;
            if (this.isBrand) {
              this.selectShop(catalog);
            }
          } else if (this.catalogPage) {
            this.catalogPage.products = catalog.products;
          }
          this.pageLoaded = true;
          this.productsPending = false;
        }
      });
  }

  async loadProductsRequest(): Promise<CatalogResponse> {
    const categoryId = this.$route.params.id;
    const params = this.collectQueryParams();
    const url = this.isSearch ? endpoints.search.global(params) : this.isBrand ? endpoints.brand(categoryId, params) : endpoints.category(categoryId, params);
    return createRequest('GET', url);
  }

  collectQueryParams() {
    const pageParams = paramsObjToString({
      page: this.page,
      sort: this.sort,
    });
    const filtersParams = paramsObjToString(this.filter);
    const search = this.isSearch ? `q=${this.$route.query.q}&` : '';
    return `${search}${pageParams}${filtersParams}`;
  }

  sortChange(sort: { label: string; value: SORT_PARAMS }) {
    const { value } = sort;
    this.productsPending = true;
    this.sort = value;
    this.loadProducts();
  }

  pageChange(page) {
    this.productsPending = true;
    this.page = page;
    this.loadProducts();
  }

  showMore() {
    this.page += 1;
    this.loadProductsRequest()
      .then((res: CatalogResponse) => {
        if (res && res.data) {
          const newItems = res.data.data.products.data;
          if (this.catalogPage) {
            this.catalogPage.products.data.push(...newItems);
            if (this.pagination) {
              this.catalogPage.products.paginationInfo = {
                ...this.pagination,
                currentPage: this.page,
              };
            }
          }
        }
      });
  }

  selectFilter(filter: { [key: string]: string }) {
    this.filter = filter;
    addParamsToLocation(this.$route, filter);
    this.productsPending = true;
    this.loadProducts();
  }

  categoryChange(item: IFilterItem) {
    if (item.href !== this.$route.path) {
      const params = this.collectQueryParams();
      router.push({ path: `${item.href}?${params}` });
    }
  }

  beforeDestroy() {
    if (this.isBrand) {
      this.selectShop(null);
    }
  }
}
</script>

<style lang="scss" scoped>
  .catalog {
    &__wrapper {
      background: white;
      padding-top: 1px;
      padding-bottom: 1px;

      @include laptop() {
        background: transparent;
      }
    }
  }
</style>
