<template lang="pug">
  .category.page
    .container.page__breadcrumbs
      Breadcrumbs(:links="breadCrumbs")
    .page__header.container
      .page__title Электроника

    .container.category__inner.page__layout
      .page__aside
        CatalogNav(:items="menuItems").page__catalog-nav
      .category__items.page__content
        .category__list
          .category__item(v-for="(item, index) in items" :key="index")
            CatalogCardItem(:item="item")

    Advantages(:advantagesList="advantagesList").category__advantages

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
import { generateProducts } from '@/utils/data';
import Advantages from '@/components/Advantages.vue';
import { BreadcrumbLink, MenuChildItem } from '@/utils/models';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SortSelect from '@/components/SortSelect.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { ADVANTAGES, MENU_CHILD_ITEMS } from '@/utils/constants';
import Pagination from '@/components/Pagination.vue';
import Slick from 'vue-slick';
import CatalogNav from '@/components/CatalogNav.vue';

@Component({
  components: {
    CatalogNav,
    Breadcrumbs,
    Advantages,
    TopCategories,
    SeoTexts,
    CatalogCardItem,
  },
})
export default class Index extends Vue {
  menuItems: MenuChildItem[] = MENU_CHILD_ITEMS;

  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { label: 'Электроника', current: true },
  ];

  items = generateProducts(16);

  seoBlockDescription = [
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
  ];

  advantagesList = ADVANTAGES;
}
</script>

<style lang="scss" scoped>
</style>
