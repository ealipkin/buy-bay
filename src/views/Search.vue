<template lang="pug">
  .search
    .container
      Breadcrumbs(:links="breadCrumbs").page__breadcrumbs
      .search__result Результаты поиска «{{searchQuery}}»
    .container.index__tabs
      TabsNav(:tabs="tabs" v-on:change="selectTab")

    section.index__section.index__section--catalog-slider
      .section-header.section-header--hide-desktop
        .index__section-title Популярные
        router-link(to="#").index__link Показать еще
      CatalogSlider(:items="popularItems" :class="{'tab--active': selectedTab === 1}" ref="slickPopular").tab

    section.index__section.index__section--catalog-slider
      .section-header.section-header--hide-desktop
        .index__section-title Горящие группы
        router-link(to="#").index__link Показать еще
      CatalogSlider(:items="hotItems" :class="{'tab--active': selectedTab === 2}" ref="slickHot").tab

    section.index__section.index__section--catalog-slider
      .section-header.section-header--hide-desktop
        .index__section-title Бестселлеры
        router-link(to="#").index__link Показать еще
      CatalogSlider(:items="bestItems" :class="{'tab--active': selectedTab === 3}" ref="slickBest").tab

    section.index__section.index__section--brands
      .index__container
        .section-header
          .index__section-title Лучшие бренды
          router-link(to="#").index__link Показать еще
        Brands(:brands="brands")

    section.index__section.index__section--seo
      SeoTexts(:texts="seoBlockDescription").container.index__seo

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BigSlider from '@/components/BigSlider.vue';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import Brands from '@/components/Brands.vue';
import Slick from 'vue-slick';
import CatalogSlider from '@/components/CatalogSlider.vue';
import SeoTexts from '@/components/SeoTexts.vue';
import FeaturesSlider from '@/components/FeaturesSlider.vue';
import TopCategories from '@/components/TopCategories.vue';
import { generateProducts, getRandomNumberBetween } from '@/utils/data';
import TabsNav from '@/components/TabsNav.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { BreadcrumbLink } from '@/utils/models';

@Component({
  components: {
    Breadcrumbs,
    TabsNav,
    TopCategories,
    FeaturesSlider,
    SeoTexts,
    CatalogSlider,
    Brands,
    CatalogCardItem,
    BigSlider,
    Slick,
  },
})
export default class Index extends Vue {
  searchQuery = '';

  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/product/123', label: 'Мужской гардероб' },
    { href: '/product/123', label: 'Сумки и рюкзаки' },
    { href: '/', label: 'Рюкзаки', current: true },
  ];

  slidersMap = {};

  selectedTab = 1;

  popularItems = generateProducts(30);

  hotItems = generateProducts(30);

  bestItems = generateProducts(30);

  seoBlockDescription = [
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
  ];

  brands = [
    {
      id: 1,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Adidas',
      category: 'Спортивные товары',
      rate: 5,
      items: generateProducts(3),
    },
    {
      id: 2,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Calvin klein',
      category: 'Мужская и женская одежда',
      rate: 4,
      items: generateProducts(3),
    },
    {
      id: 3,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Adidas',
      category: 'Спортивные товары',
      rate: 3,
      items: generateProducts(3),
    },
    {
      id: 4,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Calvin klein',
      category: 'Мужская и женская одежда',
      rate: 2,
      items: generateProducts(3),
    },
  ];

  tabs = [
    {
      id: 1,
      label: 'Популярные товары',
      isActive: true,
    },
    {
      id: 2,
      label: 'Горящие группы',
    },
    {
      id: 3,
      label: 'Бестселлеры',
    },
  ];

  mounted() {
    this.slidersMap = {
      1: { ref: this.$refs.slickPopular, init: false },
      2: { ref: this.$refs.slickHot, init: false },
      3: { ref: this.$refs.slickBest, init: false },
    };
    this.searchQuery = this.$route.query.q as string;
  }

  selectTab(tabId) {
    this.selectedTab = tabId;
    const targetSlider = this.slidersMap[tabId];
    if (!targetSlider.init) {
      this.$nextTick(() => {
        targetSlider.ref.reInit();
      });
      targetSlider.init = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    &__result {
      font-size: 24px;
      font-weight: 600;
      color: #222222;
      margin-bottom: 20px;
      @include laptop() {
        margin-bottom: 42px;
        font-size: 32px;
      }
    }
  }
  .index {
    @include desktop() {
      display: flex;
      flex-direction: column;
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

    &__section {
      background: white;
      padding-bottom: 15px;
      margin-bottom: 15px;
      width: 100%;
      @include desktop() {
        background: transparent;
      }

      &--categories {
        @include desktop() {
          margin-top: 73px;
          padding-bottom: 70px;
        }
      }

      &--seo {
        @include desktop() {
          order: 2;
          margin-top: 31px;
          margin-bottom: 73px;
        }
      }

      &--slider {
        padding-top: 12px;

        @include desktop() {
          padding-top: 40px;
          order: -1;
        }
      }

      &--catalog-slider {
        @include desktop() {
          order: -1;
          margin: 0;
          padding: 0;
        }
      }

      &--offset {
      }

      &--white {
        @include laptop() {
          background: white;
        }
      }

      &-title {
        font-size: 16px;
        font-weight: 600;
        color: #222222;

        @include laptop() {
          font-size: 32px;
        }
      }

      &-header {
        display: flex;
        align-items: center;
        padding: 17px 12px;
        justify-content: space-between;
        max-width: 1170px;
        margin-left: auto;
        margin-right: auto;
        @include desktop() {
          padding: 0;
          padding-top: 41px;
          margin-bottom: 68px;
        }

        &--hide-desktop {
          @include desktop() {
            display: none;
          }
        }
      }
    }

    &__section--brands & {
      @include desktop() {
        &__link {
          display: none;
        }

        &__section-header {
          margin-bottom: 39px;
        }
      }
    }

    &__container {
      @include desktop() {
        @include container();
      }
    }

    &__link {
      font-size: 12px;
      color: #496cff;

      @include laptop() {
        font-size: 14px;
      }

      @include desktop() {
        margin-top: 11px;
        margin-right: 16px;
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
