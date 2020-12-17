<template lang="pug">
  .orders
    .page.page--aside-tablet
      Breadcrumbs(:links="Breadcrumbs").orders__breadcrumbs
      .page__layout
        .page__aside.orders__aside
          h1.page__title Мои заказы
          ProfileNav(:items="profileMenuItems")

        .page__content
          TabsNav(:tabs="tabs" @change="selectTab").tabs-nav--inner
          ul(v-if="selectedTab === 1").orders__list
            OrderItem(
              v-for="order in activeOrders"
              :order="order"
              :key="order.id"
              :link="'/profile/groups/' + order.id"
              buttonText="Пригласить друзей"
            ).orders__item
          ul(v-if="selectedTab === 2").orders__list
            OrderItem(
              v-for="order in endedOrders"
              :order="order"
              :key="order.id"
              :link="'/profile/orders/' + order.id"
              buttonText="Купить одному"
            ).orders__item
          Pagination(:moreCount="100").orders__pagination

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import TabsNav from '@/components/TabsNav.vue';
import OrderItem from '@/components/OrderItem.vue';
import Pagination from '@/components/Pagination.vue';
import { BreadcrumbLink } from '@/utils/models';
import { PROFILE_MENU_ITEMS } from '@/utils/constants';

import { generateFailOrders, generateOrders } from '@/utils/data';
import { Action } from 'vuex-class';

const PAGE_TITLE = 'Мои заказы';

@Component({
  components: {
    Breadcrumbs,
    ProfileNav,
    TabsNav,
    OrderItem,
    Pagination,
  },
})
export default class Orders extends Vue {
  @Action('app/setProfilePage') setProfilePage;

  Breadcrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { label: 'Мои заказы', current: true },
  ];

  profileMenuItems = PROFILE_MENU_ITEMS;

  selectedTab = 1;

  tabs = [
    {
      id: 1,
      label: 'Активные',
      isActive: true,
    },
    {
      id: 2,
      label: 'Завершенные',
    },
  ];

  activeOrders = generateOrders(10);

  endedOrders = generateFailOrders(10);

  selectTab(tabId) {
    this.selectedTab = tabId;
    console.log(this.activeOrders);
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
.orders {
  @include container();
  padding-top: 16px;
  padding-bottom: 10px;
  background-color: #fff;

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
