<template lang="pug">
  .category.page(v-if="loaded")
    .container.page__breadcrumbs
      Breadcrumbs(:links="breadCrumbs" v-if="breadCrumbs && breadCrumbs.length")
    .page__header.container
      .page__title {{pageTitle}}

    .container.category__inner.page__layout
      .page__aside
        CatalogNav(:items="menuItems").page__catalog-nav
      .category__items.page__content
        .category__list
          .category__item(v-for="(item, index) in products" :key="index")
            CatalogCardItem(:item="item")

        .category__pagination
          Pagination(:paginationInfo="pagination" @page="pageChange" @more="showMore")

    //Advantages(:advantagesList="advantagesList").category__advantages

    section(v-if="seoBlock").section.section--seo
      SeoBlock(:block="seoBlock").container
  Loader(v-else)
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import CatalogCardItem from '@/components/CatalogCardItem.vue';
import TopCategories from '@/components/TopCategories.vue';
import Advantages from '@/components/Advantages.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import CatalogNav from '@/components/CatalogNav.vue';
import { BreadcrumbLink, ICategoryItem, ISeoBlock } from '@/models/models';
import Loader from '@/components/Loader.vue';
import { paramsObjToString, parseQuery } from '@/utils/filters';
import { SORT_PARAMS } from '@/models/enums';
import { DEFAULT_PAGINATE_PAGE, endpoints } from '@/config';
import { CatalogPage, CatalogResponse, PaginationInfo } from '@/models/responses';
import { createRequest } from '@/services/http.service';
import { Product } from '@/models/order';
import Pagination from '@/components/Pagination.vue';
import SeoBlock from '@/components/SeoBlock.vue';

const DEFAULT_SORT = SORT_PARAMS.POPULAR;

@Component({
  components: {
    Pagination,
    Loader,
    CatalogNav,
    Breadcrumbs,
    Advantages,
    TopCategories,
    SeoBlock,
    CatalogCardItem,
  },
})
export default class Category extends Vue {
  @Watch('$route') onRouteChange() {
    this.loaded = false;
    this.page = DEFAULT_PAGINATE_PAGE;
    this.catalogPage = null;
    this.init();
  }

  productsPending = false;

  loaded = false;

  sort: SORT_PARAMS = DEFAULT_SORT;

  page: number = DEFAULT_PAGINATE_PAGE;

  catalogPage: CatalogPage | null = null

  get breadCrumbs(): BreadcrumbLink[] | null {
    return this.catalogPage && this.catalogPage.breadcrumbs;
  }

  get pageTitle(): string | null {
    return this.catalogPage && this.catalogPage.title;
  }

  get seoBlock(): ISeoBlock | null {
    return this.catalogPage && this.catalogPage.seo_block;
  }

  get products(): Product[] | null {
    return this.catalogPage && this.catalogPage.products.data;
  }

  get pagination(): PaginationInfo | null {
    return this.catalogPage && this.catalogPage.products.paginationInfo;
  }

  get menuItems(): ICategoryItem[] | null | undefined {
    return this.catalogPage && this.catalogPage.categoryList;
  }

  mounted() {
    this.init();
  }

  init() {
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
          this.loaded = true;
          this.productsPending = false;
        }
      });
  }

  async loadProductsRequest(): Promise<CatalogResponse> {
    const categoryId = this.$route.params.id;
    const params = this.collectQueryParams();
    const url = endpoints.category(categoryId, params);
    return createRequest('GET', url);
  }

  collectQueryParams() {
    const pageParams = paramsObjToString({
      page: this.page,
      sort: this.sort,
    });
    return `${pageParams}`;
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
</style>
