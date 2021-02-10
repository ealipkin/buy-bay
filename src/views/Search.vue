<template lang="pug">
  .category.page.search
    .search__wrapper
      .container.page__breadcrumbs
        Breadcrumbs(:links="breadCrumbs")
      .container.page__header
        .page__title.search__title «{{searchQuery}}»
        .category__sort
          SortSelect(:options="selectOptions")
      .container.category__inner
        .page__layout
          .page__aside
            CategoryFilter(:filters="filters").category__filters
          .page__content
            div(v-if="searchResults && searchResults.length").search__items
            div(v-else).search__empty
              .search__empty-icon
                include ../assets/icons/search-big.svg
              .search__empty-title Ничего не удалось найти
              .search__empty-text Попробуте изменить запрос

    section.search__section
      .section-header.section-header--offset-2
        .section-title Пользователи рекомендуют
        router-link(to="#").link._hide-desktop Смотреть все
      .container
        SimilarSlider(:items="recommendedItems").similar-slider--scroll

    section.search__section
      .section-header.section-header--offset-2
        .section-title Лучшие бренды
        router-link(to="#").link Показать еще
      .container
        Brands(:brands="brands")

    section.search__section.search__section--seo
      SeoTexts(:texts="seoBlockDescription").container.index__seo

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import Brands from '@/components/Brands.vue';
import SeoTexts from '@/components/SeoTexts.vue';
import { generateProducts, getRandomNumberBetween } from '@/utils/data';
import TabsNav from '@/components/TabsNav.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SimilarSlider from '@/components/SimilarSlider.vue';
import SortSelect from '@/components/SortSelect.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { FILTERS } from '@/utils/constants';
import { BreadcrumbLink } from '@/models/models';
import { Product } from '@/models/product';

const BRANDS = [
  {
    id: 1,
    image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
    brand: 'Adidas',
    category: 'Спортивные товары',
    rate: 5,
    data: generateProducts(3),
  },
  {
    id: 2,
    image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
    brand: 'Calvin klein',
    category: 'Мужская и женская одежда',
    rate: 4,
    data: generateProducts(3),
  },
  {
    id: 3,
    image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
    brand: 'Adidas',
    category: 'Спортивные товары',
    rate: 3,
    data: generateProducts(3),
  },
  {
    id: 4,
    image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
    brand: 'Calvin klein',
    category: 'Мужская и женская одежда',
    rate: 2,
    data: generateProducts(3),
  },
];

const BREADCRUMBS = [
  { href: '/', label: 'Главная' },
  { href: '/product/123', label: 'Мужской гардероб' },
  { href: '/product/123', label: 'Сумки и рюкзаки' },
  { href: '/', label: 'Рюкзаки', current: true },
];

const OPTIONS = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price-asc', label: 'Цена по возрастанию' },
  { value: 'price-desc', label: 'Цена по убыванию' },
];

const SEO = [
  'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
  'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
];

@Component({
  components: {
    CategoryFilter,
    SortSelect,
    SimilarSlider,
    Breadcrumbs,
    TabsNav,
    SeoTexts,
    Brands,
  },
})
export default class Index extends Vue {
  @Watch('$route') routeChange() {
    this.updateQueryTitle();
  }

  filters = FILTERS;

  searchQuery = '';

  breadCrumbs: BreadcrumbLink[] = BREADCRUMBS;

  recommendedItems = generateProducts(30);

  selectOptions = OPTIONS;

  seoBlockDescription = SEO;

  brands = BRANDS;

  searchResults: Product[] | null = null;

  mounted() {
    this.updateQueryTitle();
  }

  updateQueryTitle() {
    this.searchQuery = this.$router.currentRoute.query.q as string;
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

    &__section {
      background: white;
      padding-bottom: 15px;
      margin-bottom: 13px;

      &--seo {
        color: #7b8197;
        margin-bottom: 0;
      }

      @include laptop() {
        background: transparent;
        color: black;

        &--seo {
          margin-bottom: 100px;
        }
      }
    }

    &__wrapper {
      padding-top: 1px;
      padding-bottom: 1px;
      box-sizing: border-box;
      background: white;

      @include laptop() {
        background: transparent;
        margin-bottom: 50px;
      }
    }

    &__empty {
      padding-bottom: 77px;
      background: white;
      border-radius: 6px;

      @include laptop() {
        padding-top: 58px;
        padding-bottom: 114px;
      }

      &-icon {
        margin: 0 auto;
        margin-top: 7px;
        width: 80px;
      }

      &-title {
        font-size: 16px;
        font-weight: bold;
        color: #222222;
        margin-top: 42px;
        text-align: center;

        @include laptop() {
          font-size: 18px;
          margin-top: 27px;
        }
      }

      &-text {
        margin-top: 14px;
        font-size: 12px;
        text-align: center;
        color: #7b8197;

        @include laptop() {
          font-size: 14px;
        }
      }
    }
  }
</style>
