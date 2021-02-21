<template lang="pug">
  .category.page.catalog(v-if="pageLoaded")
    .container.page__breadcrumbs
      Breadcrumbs(:links="breadCrumbs")
    .catalog__wrapper
      .page__header.container
        .page__title {{pageTitle}}
        .category__sort
          SortSelect(:options="selectOptions" @change="sortChange")
      .container.category__inner
        .page__layout
          .page__aside
            .filters-wrapper
              CategoryFilter(:filters="filters").category__filters
          .category__items.page__content
            .category__list
              .category__item(v-for="(item, index) in products" :key="index")
                CatalogCardItem(:item="item")
            .category__pagination
              Pagination(:paginationInfo="pagination" kindText="товаров" @page="pageChange" @more="showMore")
          Loader(v-if="productsPending")
    Advantages(:advantagesList="advantagesList").category__advantages

    .section.category__similar-slider
      .section__container
        .section-header
          .section-title Пользователи рекомендуют
        SimilarSlider(:items="recommended" v-if="recommended")

    section.section.section--brands
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
import { Component, Vue } from 'vue-property-decorator';

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
import { IFilter } from '@/models/filters';
import { SORT_PARAMS } from '@/models/enums';
import { paramsObjToString } from '@/utils/filters';

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
  pageLoaded = false;

  productsPending = false;

  sort: SORT_PARAMS = DEFAULT_SORT;

  page: number = DEFAULT_PAGINATE_PAGE;

  selectOptions = SORT_OPTIONS;

  advantagesList = ADVANTAGES;

  catalogPage: CatalogPage | null = null

  get breadCrumbs(): BreadcrumbLink[] | null {
    return this.catalogPage && this.catalogPage.breadcrumbs;
  }

  get pageTitle(): string | null {
    return this.catalogPage && this.catalogPage.title;
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

  mounted() {
    this.loadProducts(true);
  }

  loadProducts(isInit?) {
    this.loadProductsRequest()
      .then((res: CatalogResponse) => {
        if (res && res.data) {
          const catalog = res.data.data;
          if (isInit) {
            this.catalogPage = catalog;
          } else if (this.catalogPage) {
            this.catalogPage.products = catalog.products;
          }
          console.log(this.catalogPage);
          this.pageLoaded = true;
          this.productsPending = false;
        }
      });
  }

  async loadProductsRequest(): Promise<CatalogResponse> {
    const categoryId = this.$route.params.id;
    const params = {
      page: this.page,
      sort: this.sort,
    };
    const pageParams = paramsObjToString(params);
    const url = endpoints.category(categoryId, pageParams);
    return createRequest('GET', url);
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
