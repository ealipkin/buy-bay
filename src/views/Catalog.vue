<template lang="pug">
  .category.page.catalog
    .container.page__breadcrumbs
      Breadcrumbs(:links="breadCrumbs")
    .catalog__wrapper
      .page__header.container
        .page__title Сумки и рюкзаки
        .category__sort
          SortSelect(:options="selectOptions")
      .container.category__inner
        .page__layout
          .page__aside
            CategoryFilter(:filters="filters").category__filters
          .category__items.page__content
            .category__list
              .category__item(v-for="(item, index) in items" :key="index")
                CatalogCardItem(:item="item")
            .category__pagination
              Pagination(:moreCount="50")

    Advantages(:advantagesList="advantagesList").category__advantages

    .section.category__similar-slider
      .section__container
        .section-header
          .section-title Пользователи рекомендуют
        SimilarSlider(:items="similarItems" v-if="similarItems")

    section.section.section--brands
      .section__container
        .section-header
          .section-title Лучшие бренды
          router-link(to="#").section-link Показать еще
        Brands(:brands="brands")

    section.section.section--seo
      SeoTexts(:texts="seoBlockDescription").container

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import CatalogCardItem from '@/components/CatalogCardItem.vue';
import Brands from '@/components/Brands.vue';
import CatalogSlider from '@/components/CatalogSlider.vue';
import SeoTexts from '@/components/SeoTexts.vue';
import TopCategories from '@/components/TopCategories.vue';
import { generateProducts, getRandomNumberBetween } from '@/utils/data';
import Advantages from '@/components/Advantages.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SortSelect from '@/components/SortSelect.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { ADVANTAGES, FILTERS } from '@/utils/constants';
import Pagination from '@/components/Pagination.vue';
import Slick from 'vue-slick';
import SimilarSlider from '@/components/SimilarSlider.vue';
import { BreadcrumbLink } from '@/models/models';

@Component({
  components: {
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
    Slick,
  },
})
export default class Index extends Vue {
  filters = FILTERS;

  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/category', label: 'Мужской гардероб' },
    { href: '/category', label: 'Сумки и рюкзаки' },

    { label: 'Рюкзаки', current: true },
  ];

  selectOptions = [
    { value: 'popular', label: 'По популярности' },
    { value: 'price-asc', label: 'Цена по возрастанию' },
    { value: 'price-desc', label: 'Цена по убыванию' },
  ];

  similarItems = generateProducts(8);

  items = generateProducts(16);

  seoBlockDescription = [
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
  ];

  advantagesList = ADVANTAGES;

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
