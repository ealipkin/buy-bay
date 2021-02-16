<template lang="pug">
  .groups.profile-page
    .page.page--aside-tablet
      .page__layout
        .page__aside.groups__aside
          h1.page__title Мои группы
          ProfileNav(:items="profileMenuItems")

        div(v-if="loaded").page__content
          TabsNav(:tabs="tabs" @change="selectTab").tabs-nav--inner
          div(:class="{'hidden': selectedTab === 2}")
            div(v-if="activeOrders && activeOrders.length")
              ul.groups__list
                OrderItem(
                  v-for="order in activeOrders"
                  :order="order"
                  :key="order.id"
                  :link="'/profile/orders/' + order.order.oid"
                  :hideButton="true"
                ).groups__item
              div(v-if="showActiveOrdersPagination").category__pagination
                Pagination(:paginationInfo="activePagination" @page="activeOrdersPageChange" @more="showMoreActiveOrders")
            div(v-else).empty-message Нет активных заказов

          div(:class="{'hidden': selectedTab === 1}")
            div(v-if="inactiveOrders && inactiveOrders.length")
              ul.groups__list
                OrderItem(
                  v-for="order in inactiveOrders"
                  :order="order"
                  :key="order.id"
                  :link="'/profile/orders/' + order.order.oid"
                  :hideButton="true"
                  buttonText="Купить одному"
                ).groups__item
              div(v-if="showInActiveOrdersPagination").category__pagination
                Pagination(:paginationInfo="activePagination" @page="inActiveOrdersPageChange" @more="showMoreInActiveOrders")
            div(v-else).empty-message Нет завершенных заказов
        Loader(v-else)

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ProfileNav from '@/components/ProfileNav.vue';
import TabsNav from '@/components/TabsNav.vue';
import OrderItem from '@/components/OrderItem.vue';
import Pagination from '@/components/Pagination.vue';
import { PROFILE_MENU_ITEMS } from '@/utils/constants';

import { generateOrders, generateProducts } from '@/utils/data';
import { Action } from 'vuex-class';
import { SORT_PARAMS } from '@/models/enums';
import { PaginationInfo } from '@/models/responses';
import { DEFAULT_PAGINATE_PAGE } from '@/config';
import { OrderData } from '@/models/order';

const PAGE_TITLE = 'Мои группы';
const DEFAULT_SORT = SORT_PARAMS.POPULAR;
const TABS = [
  {
    id: 1,
    label: 'Активные',
    isActive: true,
  },
  {
    id: 2,
    label: 'Прошедшие',
  },
];

@Component({
  components: {
    ProfileNav,
    TabsNav,
    OrderItem,
    Pagination,
  },
})
export default class Groups extends Vue {
  @Action('app/setProfilePage') setProfilePage;

  profileMenuItems = PROFILE_MENU_ITEMS;

  selectedTab = 1;

  activePagination: PaginationInfo | undefined;

  activePage: number = DEFAULT_PAGINATE_PAGE;

  activeSort: SORT_PARAMS = DEFAULT_SORT;

  inActivePage: number = DEFAULT_PAGINATE_PAGE;

  inActiveSort: SORT_PARAMS = DEFAULT_SORT;

  inActivePagination: PaginationInfo | undefined;

  loaded = false

  activeOrders: OrderData[] = [];

  inactiveOrders: OrderData[] = []

  tabs = TABS;

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
  .groups {
    padding-top: 16px;
    @include container();
    padding-bottom: 10px;
    background-color: #fff;

    @include laptop() {
      padding-top: 0;
      background-color: $grey-3;
      padding-bottom: 155px;
    }

    &__aside {
      display: none;

      @include tablet() {
        display: block;
      }
    }

    &__list {
      @include clearList();
      margin-bottom: 92px;
    }

    &__item {
      margin-bottom: 20px;

      @include laptop() {
        margin-bottom: 16px;
      }

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: 0;
      }
    }

    &__pagination {
      display: none;

      @include laptop() {
        display: flex;
      }
    }
  }
</style>
