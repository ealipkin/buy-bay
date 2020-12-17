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
            .category__header
              TabsNav(:tabs="tabs", @change="selectTab").tabs-nav--inner.favourites__tabs
              SortSelect(:options="options").favourites__select
            div(:class="{'hidden': selectedTab !== 'items'}").category__list
              .category__item(v-for="(item, index) in favouritesItems" :key="index")
                CatalogCardItem(:item="item")
              .category__pagination
                Pagination(:moreCount="50")
            div(:class="{'hidden': selectedTab !== 'shops'}").category__list
              .category__item.category__item--shop(v-for="(shop, index) in favouritesShops" :key="index")
                ShopCard(:shop="shop")
              .category__pagination
                Pagination(:moreCount="50" kindText="магазинов")
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

import { generateProducts, generateShops } from '@/utils/data';
import SortSelect from '@/components/SortSelect.vue';
import ShopCard from '@/components/ShopCard.vue';
import { Action } from 'vuex-class';

const PAGE_TITLE = 'Избранное';

@Component({
  components: {
    ShopCard,
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
  @Action('app/setProfilePage') setProfilePage;

  Breadcrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { label: 'Избранное', current: true },
  ];

  profileMenuItems = PROFILE_MENU_ITEMS;

  selectedTab = 'shops';

  tabs = [
    {
      id: 'items',
      label: 'Избранные товары',
    },
    {
      id: 'shops',
      label: 'Магазины',
      isActive: true,
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

  favouritesItems = generateProducts(16);

  favouritesShops = generateShops(16);

  selectTab(tabId) {
    this.selectedTab = tabId;
  }

  created() {
    this.setProfilePage(PAGE_TITLE);
  }

  beforeDestroy() {
    this.setProfilePage(null);
  }
}
</script>

<style lang="scss" scoped>
  .favourites {
    padding-bottom: 10px;
    background-color: #fff;
    padding-top: 16px;

    @include laptop() {
      padding-top: 0;
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
