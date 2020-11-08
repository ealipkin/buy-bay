<template lang="pug">
  .my-orders
    .page.page--aside-tablet
      Breadcrumbs(:links="Breadcrumbs").my-orders__breadcrumbs
      .page__layout
        .page__aside.my-orders__aside
          h1.page__title Мои заказы
          ProfileNav(:items="profileMenuItems")

        .page__content
          TabsNav(:tabs="tabs" @change="selectTab").tabs-nav--inner
          ul.my-orders__list
            OrderItem(v-for="order in myFilteredOrders" :order="order" :key="order.id").my-orders__item
          Pagination(:moreCount="100").my-orders__pagination

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import TabsNav from '@/components/TabsNav.vue';
import OrderItem from '@/components/OrderItem.vue';
import Pagination from '@/components/Pagination.vue';
import { BreadcrumbLink, ORDER_STATUSES } from '@/utils/models';
import { PROFILE_MENU_ITEMS } from '@/utils/constants';

import { generateOrders } from '@/utils/data';

@Component({
  components: {
    Breadcrumbs,
    ProfileNav,
    TabsNav,
    OrderItem,
    Pagination,
  },
})
export default class MyOrders extends Vue {
  Breadcrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { label: 'Мои заказы', current: true },
  ];

  myOrders = generateOrders(30);

  profileMenuItems = PROFILE_MENU_ITEMS;

  selectedTab = 1;

  tabs = [
    {
      id: 1,
      label: 'Активные',
      isActive: true,
      filter: (order) => order.status === ORDER_STATUSES.SEND,
    },
    {
      id: 2,
      label: 'Завершенные',
      filter: (order) => order.status === ORDER_STATUSES.SUCCESS || order.status === ORDER_STATUSES.REJECT,
    },
  ];

  myFilteredOrders = this.myOrders.filter((order) => order.status === ORDER_STATUSES.SEND);

  selectTab(tabId) {
    this.selectedTab = tabId;
    const activeTab = this.tabs.find((tab) => tab.id === tabId) || this.tabs[0];

    this.myFilteredOrders = this.myOrders.filter(activeTab.filter);
  }
}
</script>

<style lang="scss" scoped>
.my-orders {
  @include container();
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
