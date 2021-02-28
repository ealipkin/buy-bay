<template lang="pug">
  .category
    .page__header.container
      SortSelect(:options="selectOptions").category__sort
    .container.category__inner.page__layout
      .page__aside
        CategoryFilter(:filters="filters").category__filters
      .page__content
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
import SeoTexts from '@/components/SeoTexts.vue';
import { generateProducts, getShop } from '@/utils/data';
import SortSelect from '@/components/SortSelect.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { FILTERS } from '@/utils/constants';
import Pagination from '@/components/Pagination.vue';

@Component({
  components: {
    Pagination,
    CategoryFilter,
    SortSelect,
    SeoTexts,
    CatalogCardItem,
  },
})
export default class Index extends Vue {
  loaded = false;

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

  mounted() {
    // brand
  }
}
</script>

<style lang="scss" scoped>

</style>
