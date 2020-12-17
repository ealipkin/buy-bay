<template lang="pug">
  .groups
    .page.page--aside-tablet
      Breadcrumbs.groups__breadcrumbs(:links="Breadcrumbs")
      .page__layout
        .page__aside.groups__aside
          h1.page__title Мои группы
          ProfileNav(:items="profileMenuItems")

        .page__content
          TabsNav.tabs-nav--inner(:tabs="tabs", @change="selectTab")
          ul(:class="{'hidden': selectedTab !== 1}").groups__list
            OrderItem.groups__item(
              v-for="order in activeOrders"
              :order="order"
              :key="order.id"
              :link="'/profile/groups/' + order.id" :isGroup="true"
              buttonText="Пригласить друзей"
            )
          ul(:class="{'hidden': selectedTab !== 2}").groups__list
            OrderItem.groups__item(
              v-for="order in pastOrders"
              :order="order"
              :key="order.id"
              :link="'/profile/orders/' + order.id" :isGroup="true"
              buttonText="Купить одному"
            )
          Pagination.groups__pagination(:moreCount="100" kindText="групп")
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

import { generateOrders } from '@/utils/data';
import { Action } from 'vuex-class';

const PAGE_TITLE = 'Мои группы';

@Component({
  components: {
    Breadcrumbs,
    ProfileNav,
    TabsNav,
    OrderItem,
    Pagination,
  },
})
export default class Groups extends Vue {
  @Action('app/setProfilePage') setProfilePage;

  Breadcrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { label: 'Мои группы', current: true },
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
      label: 'Прошедшие',
    },
  ];

  activeOrders = generateOrders(10);

  pastOrders = generateOrders(10);

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
