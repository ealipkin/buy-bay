<template lang="pug">
  div(v-if="pageLoaded" ref="index").index.index--flex
    section(v-if="bigSliderItems").section.section--slider.container
      BigSlider(:items="bigSliderItems" :promo="bigSliderPromo")
      FeaturesSlider.index__features-slider

    .container.index__tabs
      TabsNav(:tabs="tabs" v-on:change="selectTab")

    section(v-show="popularItems").section.section--catalog-slider
      .section-header.section-header--hide-desktop
        .section-title Популярные
        router-link(to="#").section-link Показать еще
      CatalogSlider(
        @init="sliderInit"
        :sliderId="tabsIds.POPULAR"
        :items="popularItems"
        :class="{'tab--visible': selectedTab === tabsIds.POPULAR, 'tab--not-inited': !slidersMap[tabsIds.POPULAR].inited, 'tab--hidden': !slidersMap[tabsIds.POPULAR].updated}"
        ref="sliderPopular"
      ).tab.tab--show.index__catalog-slider

    section.section.section--white.section--categories
      .section__container
        .section-header
          .section-title Топ категории
        TopCategories(:categories="topCategories")

    section(v-show="hotItems").section.section--catalog-slider
      .section-header.section-header--hide-desktop
        .section-title Горящие группы
        router-link(to="#").section-link Показать еще
      CatalogSlider(
        @init="sliderInit"
        :sliderId="tabsIds.HOT"
        :items="hotItems"
        :class="{'tab--visible': selectedTab === tabsIds.HOT, 'tab--not-inited': !slidersMap[tabsIds.HOT].inited, 'tab--hidden': !slidersMap[tabsIds.HOT].updated}"
        ref="sliderHot"
      ).tab.tab--show.index__catalog-slider

    Advantages(:advantagesList="advantagesList")

    section(v-show="bestItems").section.section--catalog-slider
      .section-header.section-header--hide-desktop
        .section-title Бестселлеры
        router-link(to="#").section-link Показать еще
      CatalogSlider(
        @init="sliderInit"
        :sliderId="tabsIds.BEST"
        :items="bestItems"
        :class="{'tab--visible': selectedTab === tabsIds.BEST, 'tab--not-inited': !slidersMap[tabsIds.BEST].inited, 'tab--hidden': !slidersMap[tabsIds.BEST].updated}"
        ref="sliderBest"
      ).tab.tab--show.index__catalog-slider

    section(v-if="brands").section.section--brands
      .section__container
        .section-header
          .section-title Лучшие бренды
          router-link(to="#").section-link Показать еще
        Brands(:brands="brands")

    section(v-if="seo").section.section--seo
      SeoBlock(:block="seo").container.index__seo
  Loader(v-else)

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BigSlider from '@/components/BigSlider.vue';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import Brands from '@/components/Brands.vue';
import Slick from 'vue-slick';
import CatalogSlider from '@/components/CatalogSlider.vue';
import FeaturesSlider from '@/components/FeaturesSlider.vue';
import TopCategories from '@/components/TopCategories.vue';
import TabsNav from '@/components/TabsNav.vue';
import Advantages from '@/components/Advantages.vue';
import { ADVANTAGES } from '@/utils/constants';
import { Action } from 'vuex-class';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { topCategories } from '@/utils/data';
import Loader from '@/components/Loader.vue';
import { BigSliderItem, ISeoBlock } from '@/models/models';
import { IndexPage, IndexPageResponse } from '@/models/responses';
import { BrandItem, Product } from '@/models/order';
import SeoBlock from '@/components/SeoBlock.vue';

enum TABS_IDS {
  POPULAR = 'popular',
  HOT = 'hot',
  BEST = 'best',
}

const PRODUCT_TABS = [
  {
    id: TABS_IDS.POPULAR,
    label: 'Популярные товары',
    isActive: true,
  },
  {
    id: TABS_IDS.HOT,
    label: 'Горящие группы',
  },
  {
    id: TABS_IDS.BEST,
    label: 'Бестселлеры',
  },
];

/* tslint:disable */
@Component({
  components: {
    Loader,
    Advantages,
    TabsNav,
    TopCategories,
    FeaturesSlider,
    SeoBlock,
    CatalogSlider,
    Brands,
    CatalogCardItem,
    Slick,
    BigSlider,
  },
})
export default class Index extends Vue {
  @Action('items/fetchHotItems') fetchHotItems;

  @Action('items/fetchBestItems') fetchBestItems;

  tabsIds = TABS_IDS;

  selectedTab = this.tabsIds.POPULAR;

  slidersMap = {
    [this.tabsIds.POPULAR]: {
      inited: false,
      updated: this.selectedTab === this.tabsIds.POPULAR,
      ref: this.$refs.sliderPopular,
    },
    [this.tabsIds.HOT]: {
      inited: false,
      updated: this.selectedTab === this.tabsIds.HOT,
      ref: this.$refs.sliderHot,
    },
    [this.tabsIds.BEST]: {
      inited: false,
      updated: this.selectedTab === this.tabsIds.BEST,
      ref: this.$refs.sliderBest,
    },
  };

  bigSliderItems: BigSliderItem[] | null = null;

  bigSliderPromo: BigSliderItem[] | null = null;

  popularItems: Product[] | null = null;

  hotItems: Product[] | null = null;

  bestItems: Product[] | null = null;

  seo: ISeoBlock | null = null;

  pageLoaded = false;

  topCategories = topCategories;

  advantagesList = ADVANTAGES;

  brands: BrandItem[] | null = null;

  tabs = PRODUCT_TABS;

  sliderInit(e) {
    const { id } = e;
    this.slidersMap[id].inited = true;
  }

  mounted() {
    createRequest('get', endpoints.index).then((res: IndexPageResponse) => {
      const response: IndexPage = res.data.data;
      this.bigSliderItems = response.b1;
      this.bigSliderPromo = response.b2;
      this.seo = response.seo_block;
      this.brands = response.top_brand;

      this.popularItems = response.popular;
      this.bestItems = response.bestseller;
      this.hotItems = response.hot_groups;

      this.pageLoaded = true;
      return response;
    });
  }

  selectTab(tabId) {
    this.selectedTab = tabId;
  }
}
</script>

<style lang="scss">
  .index {
    @media (max-width: 1295px) {
      .tab {
        display: block;
      }
    }

    .slick-list {
      height: 100%;
      width: 100%;
    }

    @include desktop() {
      .index__catalog-slider {
        position: absolute;
      }

      .tab--visible.index__catalog-slider {
        position: relative;
        transition: none;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .index {
    position: relative;

    &--flex {
      @include desktop() {
        display: flex;
        flex-direction: column;
      }
    }

    &__tabs {
      order: -1;
      width: 100%;
      display: none;
      @include desktop() {
        display: flex;
        margin-top: 49px;
        margin-bottom: 50px;
      }
    }

    &__seo {
      color: #7b8197;
      padding: 16px;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
</style>
