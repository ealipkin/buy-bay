<template lang="pug">
  .favourites
    .page.page--aside-tablet.category
      .container.page__breadcrumbs
        Breadcrumbs.favourites__breadcrumbs(:links="Breadcrumbs")
      .category__inner.container
        .page__layout
          .page__aside.favourites__aside
            h1.page__title Избранное
            ProfileNav(:items="profileMenuItems")

          .page__content.category__items
            TabsNav(:tabs="tabs", @change="selectTab").tabs-nav--inner.favourites__tabs
            SortSelect(:options="options").favourites__select
            .category__list
              .category__item(v-for="(item, index) in myFilteredFavourites" :key="index")
                CatalogCardItem(:item="item")
            .category__pagination
              Pagination(:moreCount="50")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import TabsNav from '@/components/TabsNav.vue';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import Select from '@/components/Select.vue';
import Pagination from '@/components/Pagination.vue';
import { BreadcrumbLink } from '@/utils/models';
import { PROFILE_MENU_ITEMS } from '@/utils/constants';

import { generateProducts } from '@/utils/data';
import SortSelect from '@/components/SortSelect.vue';

@Component({
  components: {
    SortSelect,
    Breadcrumbs,
    ProfileNav,
    TabsNav,
    CatalogCardItem,
    Select,
    Pagination,
  },
})
export default class Favourites extends Vue {
  Breadcrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { label: 'Избранное', current: true },
  ];

  myFavourites = generateProducts(30);

  profileMenuItems = PROFILE_MENU_ITEMS;

  selectedTab = 1;

  tabs = [
    {
      id: 1,
      label: 'Избранные товары',
      isActive: true,
      filter: (product) => product.isFavourite,
    },
    {
      id: 2,
      label: 'Магазины',
      filter: (product) => !product.isFavourite,
    },
  ];

  options = [
    {
      value: 'some val1',
      label: 'По цене',
    },
    {
      value: 'some val2',
      label: 'По дату',
    },
    {
      value: 'some val3',
      label: 'По умолчанию',
    },
  ];

  myFilteredFavourites = this.myFavourites.filter((product) => product.isFavourite);

  selectTab(tabId) {
    this.selectedTab = tabId;
    const activeTab = this.tabs.find((tab) => tab.id === tabId) || this.tabs[0];

    this.myFilteredFavourites = this.myFavourites.filter(activeTab.filter);
  }
}
</script>

<style lang="scss" scoped>
  .favourites {
    padding-top: 16px;
    padding-bottom: 10px;
    background-color: #fff;

    @include laptop() {
      background-color: $grey-3;
      padding-bottom: 155px;
    }

    &__breadcrumbs {
      display: none;

      @include tablet() {
        display: flex;
      }
    }

    &__aside {
      display: none;

      @include tablet() {
        display: block;
      }
    }

    &__tabs {
      @include tablet() {
        display: none;
      }
    }

    &__select {
      display: none;

      @include tablet() {
        margin-bottom: 14px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        span {
          margin-right: 20px;
          font-size: 14px;
          color: $grey-2;
        }
      }
    }
  }
</style>
