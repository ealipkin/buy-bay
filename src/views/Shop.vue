<template lang="pug">
  .category
    .container.category__inner
      .category__header
        SortSelect(:options="selectOptions").category__sort
      .category__content
        .category__aside
          CategoryFilter(:filters="filters").category__filters
        .category__items
          .category__list
            .category__item(v-for="(item, index) in items" :key="index")
              CatalogCardItem(:item="item")
          Pagination(:moreCount="50").category__pagination

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
import { generateProducts, getRandomNumberBetween, getShop } from '@/utils/data';
import Advantages from '@/components/Advantages.vue';
import { BreadcrumbLink } from '@/utils/models';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SortSelect from '@/components/SortSelect.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { FILTERS } from '@/utils/constants';
import Pagination from '@/components/Pagination.vue';
import Slick from 'vue-slick';
import { Action } from 'vuex-class';

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
  @Action('app/setSelectedShop') selectShop;

  shop = getShop();

  filters = FILTERS;

  selectOptions = [
    { value: 'popular', label: 'По популярности' },
    { value: 'price-asc', label: 'Цена по возрастанию' },
    { value: 'price-desc', label: 'Цена по убыванию' },
  ];

  items = generateProducts(16);

  seoBlockDescription = [
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
  ];

  created() {
    this.selectShop(this.shop);
  }

  beforeDestroy() {
    this.selectShop(null);
  }
}
</script>

<style lang="scss" scoped>

</style>
