<template lang="pug">
  .category
    .container
      Breadcrumbs(:links="breadCrumbs").page__breadcrumbs.category__breadcrumbs
    .container.category__inner
      .category__header
        .category__title Сумки и рюкзаки
        SortSelect(:options="selectOptions").category__sort
      .category__content
        .category__aside
          CategoryFilter(:filters="filters").category__filters
        .category__items
          .category__list
            .category__item(v-for="(item, index) in items" :key="index")
              CatalogCardItem(:item="item")
          Pagination(:moreCount="50").category__pagination

    Advantages(:advantagesList="advantagesList").category__advantages

    .section.category__similar-slider
      .section__container
        .section-header
          .section-title Пользователи рекомендуют
        Slick(ref="slick" :options="sliderSettings").similar-slider
          div(v-for="item in similarItems"  :key="item.id").similar-slider__wrapper
            CatalogCardItem(:item="item").catalog-card--similar.similar-slider__slide

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
import { BreadcrumbLink } from '@/utils/models';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SortSelect from '@/components/SortSelect.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { FILTERS } from '@/utils/constants';
import Pagination from '@/components/Pagination.vue';
import Slick from 'vue-slick';

@Component({
  components: {
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
    { href: '/product/123', label: 'Мужской гардероб' },
    { href: '/product/123', label: 'Сумки и рюкзаки' },
    { href: '/', label: 'Рюкзаки', current: true },
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

  sliderSettings = {
    mobileFirst: true,
    arrows: false,
    responsive: [
      {
        breakpoint: '300',
        settings: 'unslick',
      },
      {
        breakpoint: '767',
        settings: {
          dots: true,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: '1296',
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  advantagesList = [
    {
      type: 'cart',
      title: 'Ультра дискаунтер',
      text: 'Мы собрали супер товары из Китая по супер ценам',
    },
    {
      type: 'group',
      title: 'Вместе дешевле',
      text: 'Объединяйтесь с друзьями в группы и покупайте по супер цене',
    },
    {
      type: 'warranty',
      title: 'Гарантия',
      text: 'Мы стоим за вас стеной гарантируем возврат денег и бесплатную доставку',
    },
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

  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  .category {

    &__inner {
      background: white;
      margin-bottom: 16px;
      padding-bottom: 16px;
      @include laptop() {
        padding-bottom: 0;
        margin-bottom: 0;
        background: transparent;
      }
    }

    &__breadcrumbs {
      display: none;
      @include laptop() {
        display: flex;
      }
    }

    &__filters {
    }

    &__advantages {
      @include laptop() {
        display: none;
      }
    }

    &__aside {
      @include laptop() {
        width: 285px;
        margin-right: 16px;
        flex-shrink: 0;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      align-items: center;
    }

    &__title {
      font-weight: 600;
      color: #222222;
      font-size: 16px;
      margin-top: 20px;
      @include laptop() {
        margin-top: 0;
        font-size: 32px;
      }
    }

    &__content {
      @include laptop() {
        display: flex;
      }
    }

    &__items {
      @include laptop() {
        flex: 1;
      }
    }

    &__item {
      width: 48%;
      margin-right: 4%;
      border: solid 1px #e7e7e7;
      border-radius: 4px;
      margin-bottom: 8px;
      @media (max-width: $tablet-max-width) {
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
      @include tablet() {
        width: 32%;
        margin-right: 2%;
        margin-bottom: 16px;

        @media (max-width: $laptop-max-width) {
          &:nth-child(3n) {
            margin-right: 0;
          }
        }

      }
      @include laptop() {
        border: none;
        width: 23.3%;
        margin-right: 16px;
        margin-bottom: 16px;

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

    &__list {
      flex-wrap: wrap;
      display: flex;
    }

    &__pagination {
      display: none;
      margin-top: 24px;
      @include laptop() {
        display: flex;
      }
    }

    &__similar-slider {
      display: none;
      background: transparent;

      .similar-slider {
        margin: 0;
      }

      @include laptop() {
        display: block;
        margin-top: 103px;
        margin-bottom: 50px;
      }

      @include desktop() {
        margin-bottom: 0;
      }
    }

    .section-header {
      @include desktop() {
        margin-bottom: 39px;
      }
    }

    &__sort {
      display: none;

      @include laptop() {
        display: flex;
      }
    }

  }

</style>
